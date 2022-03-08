import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@nightfall-ui/theme";
import { ChainSelect, DropArea, PageCenter } from "@components";
import { IPFS_GATEWAY, PINATA_API_KEY, PINATA_SECRET_API_KEY } from "@env";
import { config, usePinata } from "@libs";
import { Spinner } from "@icons";
import { Button } from "@nightfall-ui/buttons";
import {
  DialogBackgroundTransition,
  DialogProvider,
} from "@nightfall-ui/dialog";
import { useWeb3 } from "./utils/use-web3";
import { MinterProvider } from "./providers/MinterProvider";
import { Input, TextArea } from "@nightfall-ui/inputs";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { usePromise } from "@hooks";

config({
  key: PINATA_API_KEY as string,
  secret: PINATA_SECRET_API_KEY as string,
});

const ConnectButton = () => {
  const { activate } = useWeb3();
  return <Button onClick={activate}>Connect</Button>;
};

const IPFS_GATEWAY_URI = IPFS_GATEWAY;

const useNFT = (): [
  (...args: any) => any,
  {
    loading: boolean;
    data: any;
    error: any;
  }
] => {
  const { pinFile, pinJson } = usePinata();

  const [create, rest] = usePromise(
    async (data: { name: string; description: string; file: File }) => {
      const { file, name, description } = data;

      // 1. upload file to IPFS
      const {
        // if isDuplicate is true, pinJson throws an error: upload json in any way
        data: { isDuplicate, ...imageData },
        error,
      } = await pinFile(file);
      if (!error) {
        // const { IpfsHash, PinSize, Timestamp } = data;
        const id = uuid();
        // random id as the name of the json. this will be displayed in the pinata dashboard
        // spread file info to pinata metadata so it
        const metadata = { name: `${id}.json`, ...imageData };

        const json = {
          // 2. create json object with IpfsHash of the file, name, description, image url
          ...imageData,
          name,
          createdAt: imageData.Timestamp,
          description,
          image: `${IPFS_GATEWAY_URI}/${imageData.IpfsHash}`,
        };
        // 3. upload json to IPFS
        const { data } = await pinJson(json, metadata);
        // return IpfsHash of the json
        return data.IpfsHash;
        //
      }
    }
  );

  return [create, rest];
};

const App = function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [create, { loading, error, data }] = useNFT();

  const { active, connected } = useWeb3();

  const [selectedChainId, setChainId] = useState<any>("1337");

  const onSelect = ({ target: { value } }: any) => {
    setChainId(value);
  };

  const onSubmit = async (e: any) => {
    const { files, name, description } = e;
    await create({ file: files[0], name, description });
  };

  const filesRegister = register("files", {
    required: "A file is required.",
  });

  return (
    <ThemeProvider>
      <DialogProvider>
        <DialogBackgroundTransition>
          <MinterProvider>
            <PageCenter>
              <div>
                <ChainSelect
                  // eslint-disable-next-line
                  //@ts-ignore
                  value={selectedChainId}
                  onChange={onSelect}
                />
                {!active && <ConnectButton />}
                {loading && <Spinner />}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <Input
                      invalid={!!errors["name"]}
                      variant={"outlined"}
                      placeholder={"Name"}
                      {...register("name", {
                        required: "Name is required.",
                        maxLength: 200,
                      })}
                    />
                  </div>
                  <div>
                    <TextArea
                      invalid={!!errors["description"]}
                      placeholder={"Description"}
                      {...register("description", {
                        required: "Description is required.",
                        maxLength: 1000,
                      })}
                    />
                  </div>
                  <div>
                    {!loading && !data && (
                      <DropArea
                        accept={".jpg,.png,.jpeg,.txt"}
                        {...filesRegister}
                        style={{
                          width: "188px",
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <Button size={"large"} type={"submit"}>
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </PageCenter>
          </MinterProvider>
        </DialogBackgroundTransition>
      </DialogProvider>
    </ThemeProvider>
  );
};

export { App };
