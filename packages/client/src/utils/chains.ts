import { INFURA_PROJECT_KEY } from "@env";

const CHAINS: {
  [id: string]: {
    urls: string[];
    name: string;
  };
} = {
  // 1: {
  //   urls: [
  //     INFURA_PROJECT_KEY
  //       ? `https://mainnet.infura.io/v3/${INFURA_PROJECT_KEY}`
  //       : undefined,
  //   ].filter((url) => url !== undefined) as string[],
  //   name: "Mainnet",
  // },
  3: {
    urls: [
      INFURA_PROJECT_KEY
        ? `https://ropsten.infura.io/v3/${INFURA_PROJECT_KEY}`
        : undefined,
    ].filter((url) => url !== undefined) as string[],
    name: "Ropsten",
  },
  4: {
    urls: [
      INFURA_PROJECT_KEY
        ? `https://rinkeby.infura.io/v3/${INFURA_PROJECT_KEY}`
        : undefined,
    ].filter((url) => url !== undefined) as string[],
    name: "Rinkeby",
  },
  1337: {
    urls: ["http://localhost:8545"],
    name: "Localhost",
  },
};

const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{
  [chainId: number]: string[];
}>((accumulator, chainId) => {
  // eslint-disable-next-line
  //@ts-ignore
  const validURLs: string[] = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});

export { CHAINS, URLS };
