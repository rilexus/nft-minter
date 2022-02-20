import React, { useState } from "react";
import { ThemeProvider } from "@nightfall-ui/theme";
import { ChainSelect, DropArea, FilePreview } from "@components";
import { pinata_api_key, pinata_secret_api_key } from "@env";
import { config, usePinata } from "@libs";
import { Spinner } from "@icons";
import { Button } from "@nightfall-ui/buttons";

config({ key: pinata_api_key, secret: pinata_secret_api_key });

import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { DialogProvider } from "@nightfall-ui/dialog";

// eslint-disable-next-line
//@ts-ignore
export const [metaMask, hooks] = initializeConnector<MetaMask>(
  (actions: any) => new MetaMask(actions)
);

const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

const ConnectButton = () => {
  const isActive = useIsActive();
  return isActive ? null : (
    <Button onClick={() => metaMask.activate(1337)}>Connect</Button>
  );
};

function App() {
  const { add, loading, file } = usePinata();
  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  console.log({
    chainId,
    accounts,
    error,
    isActivating,
    isActive,
    ENSNames,
    metaMask,
  });

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files) {
      add(files.item(0));
    }
  };

  const [selectedChainId, setChainId] = useState<any>("1337");

  const onSelect = ({ target: { value } }: any) => {
    setChainId(value);
    // eslint-disable-next-line
    // @ts-ignore
    metaMask.activate(value);
  };

  return (
    <ThemeProvider>
      <DialogProvider>
        <div className="App">
          <ChainSelect
            // eslint-disable-next-line
            //@ts-ignore
            value={selectedChainId}
            onChange={onSelect}
          />
          <ConnectButton />
          {loading && <Spinner />}
          {!loading && file && <FilePreview file={file} />}
          {!loading && !file && (
            <DropArea onDrop={handleDrop} loading={loading} />
          )}
        </div>
      </DialogProvider>
    </ThemeProvider>
  );
}

export { App };
