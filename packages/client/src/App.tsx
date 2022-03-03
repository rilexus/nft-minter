import React, { useState } from "react";
import { ThemeProvider } from "@nightfall-ui/theme";
import { ChainSelect, DropArea, PageCenter } from "@components";
import { PINATA_API_KEY, PINATA_SECRET_API_KEY } from "@env";
import { config, usePinata } from "@libs";
import { Spinner } from "@icons";
import { Button } from "@nightfall-ui/buttons";
import {
  DialogBackgroundTransition,
  DialogProvider,
} from "@nightfall-ui/dialog";
import { useWeb3 } from "./utils/use-web3";
import { useInput } from "@hooks";
import { MinterProvider } from "./providers/MinterProvider";
import { Input, TextArea } from "@nightfall-ui/inputs";
import { useForm } from "react-hook-form";

config({
  key: PINATA_API_KEY as string,
  secret: PINATA_SECRET_API_KEY as string,
});

const ConnectButton = () => {
  const { activate } = useWeb3();
  return <Button onClick={activate}>Connect</Button>;
};

const App = function App() {
  const { add, loading, file } = usePinata();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const input = useInput("greeting");

  console.log(errors);

  const { active, connected } = useWeb3();

  const handleDrop = (e: any) => {
    const dt = e.dataTransfer;
    const files = dt?.files;
    if (files) {
      add(files.item(0));
    }
  };
  const call = async () => {
    //
  };

  const [selectedChainId, setChainId] = useState<any>("1337");

  const onSelect = ({ target: { value } }: any) => {
    setChainId(value);
  };

  const onSubmit = () => {
    //
  };

  return (
    <ThemeProvider>
      <DialogProvider>
        <DialogBackgroundTransition>
          <MinterProvider>
            <PageCenter>
              <div>
                <Button onClick={call}>Call</Button>
                <input
                  type="text"
                  {...input}
                  style={{
                    color: "black",
                  }}
                />
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
                      variant={"outlined"}
                      placeholder={"Name"}
                      {...register("name", { required: true, maxLength: 200 })}
                    />
                  </div>
                  <div>
                    <TextArea
                      placeholder={"Description"}
                      {...register("description", {
                        required: true,
                        maxLength: 1000,
                      })}
                    />
                  </div>
                  <div>
                    {!loading && !file && (
                      <DropArea
                        {...register("files", {
                          required: true,
                        })}
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
