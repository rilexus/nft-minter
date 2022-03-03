import React, { createContext, FC, useContext } from "react";
import { web3 } from "../web3";
import { Minter__factory } from "@minter/contracts";

const MinterContract = new web3.eth.Contract(
  //eslint-disable-next-line
  //@ts-ignore
  Minter__factory.abi,
  "" // TODO: add address
);

const MinterContext = createContext({});

const useMinter = () => useContext(MinterContext);

const MinterProvider: FC = ({ children }) => {
  return <MinterContext.Provider value={{}}>{children}</MinterContext.Provider>;
};

export { MinterProvider, useMinter };
