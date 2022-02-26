import React, { createContext, FC, useContext } from "react";
import { GreeterContract } from "./Greeter.contract";
import { useWeb3 } from "../../utils/use-web3";
import { web3 } from "../web3";

const noop = async (...args: any): Promise<any> => {
  //
};

const GreeterContext = createContext<{
  greet: () => Promise<string>;
  setGreeting: (greeting: string) => Promise<any>;
}>({
  //eslint-disable-next-line
  //@ts-ignore
  greet: noop,
  setGreeting: noop,
});

const useGreeter = () => useContext(GreeterContext);

const withGreeter = (WrappedComponent: any) => {
  const Component = (props: any) => {
    return (
      <GreeterProvider>
        <WrappedComponent {...props} />
      </GreeterProvider>
    );
  };
  Component.displayName = `withGreeter(${WrappedComponent.displayName})`;
  return Component;
};

const GreeterProvider: FC = ({ children }) => {
  const { active, accounts, chain } = useWeb3();

  const greet = async () => {
    return await GreeterContract.methods.greet().call();
  };

  const setGreeting = async (greeting: string) => {
    if (active) {
      return await GreeterContract.methods.setGreeting(greeting).send({
        from: accounts[0],
      });
    }
  };

  return (
    <GreeterContext.Provider value={{ greet, setGreeting }}>
      {children}
    </GreeterContext.Provider>
  );
};

export { GreeterProvider, useGreeter, withGreeter };
