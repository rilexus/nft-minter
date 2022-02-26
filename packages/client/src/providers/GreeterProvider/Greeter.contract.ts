import { web3 } from "../web3";
import { RINKEBY_CONTRACT_ADDRESS } from "@env";
import { Greeter__factory } from "@nft-minter/contracts";

const greeterContractAddress = RINKEBY_CONTRACT_ADDRESS;

const GreeterContract = new web3.eth.Contract(
  //eslint-disable-next-line
  //@ts-ignore
  Greeter__factory.abi,
  greeterContractAddress
);

export { GreeterContract };
