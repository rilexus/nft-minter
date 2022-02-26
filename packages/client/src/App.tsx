import React, { CSSProperties, useMemo, useState } from "react";
import { ThemeProvider } from "@nightfall-ui/theme";
import { ChainSelect, DropArea, FilePreview } from "@components";
import { PINATA_API_KEY, PINATA_SECRET_API_KEY } from "@env";
import { config, usePinata } from "@libs";
import { Spinner } from "@icons";
import { Button } from "@nightfall-ui/buttons";
import { DialogProvider } from "@nightfall-ui/dialog";

import {
  useGreeter,
  withGreeter,
} from "./providers/GreeterProvider/GreeterProvider";
import { useWeb3 } from "./utils/use-web3";
import { createHmac } from "crypto";
import base64url from "base64url";

config({
  key: PINATA_API_KEY as string,
  secret: PINATA_SECRET_API_KEY as string,
});

const ConnectButton = () => {
  const { activate } = useWeb3();
  return <Button onClick={activate}>Connect</Button>;
};

const baseit = (input: any) => {
  if (typeof input === "string") return base64url.encode(input);
  return base64url.encode(JSON.stringify(input));
};

const useInput = (name: string) => {
  const [value, setValue] = useState("");

  return {
    value,
    onChange: (e: any) => {
      const v = e.target.value;
      setValue(v);
    },
  };
};

const App = withGreeter(function App() {
  const { add, loading, file } = usePinata();
  const input = useInput("greeting");

  const { active, connected } = useWeb3();

  const { greet, setGreeting } = useGreeter();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files) {
      add(files.item(0));
    }
  };
  const call = async () => {
    //eslint-disable-next-line
    //@ts-ignore

    await setGreeting(input.value);
    const greeting = await greet();
    console.log(greeting);
  };

  const [selectedChainId, setChainId] = useState<any>("1337");

  const onSelect = ({ target: { value } }: any) => {
    setChainId(value);
  };

  return (
    <ThemeProvider>
      <DialogProvider>
        <div className="App">
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
          {!loading && file && <FilePreview file={file} />}
          {!loading && !file && (
            <DropArea onDrop={handleDrop} loading={loading} />
          )}
        </div>
      </DialogProvider>
    </ThemeProvider>
  );
});

export { App };
