import React, { FC, forwardRef, useState } from "react";
import { ThemeProvider } from "@nightfall-ui/theme";
import { ChainSelect, PageCenter } from "@components";
import { PINATA_API_KEY, PINATA_SECRET_API_KEY } from "@env";
import { config } from "@libs";
import { Button } from "@nightfall-ui/buttons";
import {
  DialogBackgroundTransition,
  DialogProvider,
} from "@nightfall-ui/dialog";
import { useWeb3 } from "./utils/use-web3";
import { MinterProvider } from "./providers/MinterProvider";
import { NftForm } from "@components/NFTForm/NFTForm";
import { Title1 } from "@nightfall-ui/typography";
import { Flex, Grid } from "@nightfall-ui/layout";
import { useCSSProperties } from "@nightfall-ui/hooks";

config({
  key: PINATA_API_KEY as string,
  secret: PINATA_SECRET_API_KEY as string,
});

const ConnectButton = forwardRef(function ConnectButton(props, ref: any) {
  const { activate } = useWeb3();

  return (
    <Button ref={ref} onClick={activate}>
      Connect
    </Button>
  );
});

const Header: FC = ({ children }) => {
  const style = useCSSProperties(
    {
      padding: "1rem 0 3rem 0",
    },
    []
  );
  return <header style={style}>{children}</header>;
};

const App = function App() {
  const { active, connected } = useWeb3();

  const [selectedChainId, setChainId] = useState<any>("1337");

  const onSelect = ({ target: { value } }: any) => {
    setChainId(value);
  };

  return (
    <ThemeProvider>
      <DialogProvider>
        <DialogBackgroundTransition>
          <MinterProvider>
            <Header>
              <PageCenter>
                <Flex justify={"left"}>
                  <ChainSelect
                    // eslint-disable-next-line
                    //@ts-ignore
                    value={selectedChainId}
                    onChange={onSelect}
                  />

                  {!active && <ConnectButton />}
                </Flex>
              </PageCenter>
            </Header>
            <PageCenter>
              <div>
                <Grid>
                  <Grid.Item small={0} medium={3} />
                  <Grid.Item small={12} medium={6}>
                    <div>
                      <Title1 type={"primary"} weight={"bold"} as={"h1"}>
                        Create NFT
                      </Title1>
                      <NftForm />
                    </div>
                  </Grid.Item>
                  <Grid.Item small={0} medium={3} />
                </Grid>
              </div>
            </PageCenter>
          </MinterProvider>
        </DialogBackgroundTransition>
      </DialogProvider>
    </ThemeProvider>
  );
};

export { App };
