import React, {
  createContext,
  FC,
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const hasEthereum = () => {
  // eslint-disable-next-line
  // @ts-ignore
  return !!window.ethereum;
};

const useMounded = (): MutableRefObject<boolean> => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

const useCallbackRef = (callback: (...args: any) => void) => {
  const ref = useRef(callback);

  useEffect(() => {
    if (ref.current !== callback) {
      ref.current = callback;
    }
  }, [callback]);
  return ref;
};

// eslint-disable-next-line
// @ts-ignore
const metamask = window.ethereum;

const Web3Context = createContext<any /* TODO: type this */>(null);
const useWeb3Context = () => useContext(Web3Context);

const Web3Provider: FC<{ getLibrary: () => any }> = ({
  children,
  getLibrary,
}) => {
  return (
    <Web3Context.Provider value={getLibrary()}>{children}</Web3Context.Provider>
  );
};

const useAccounts = () => {
  const isMounted = useMounded();

  const [accounts, setAccounts] = useState<string[]>([]);

  useEffect(() => {
    if (hasEthereum()) {
      metamask
        .request({
          method: "eth_accounts",
        })
        .then((address: string[]) => {
          setAccounts(address);
        });

      const set = (accounts: string[]) => {
        if (isMounted.current) {
          setAccounts(accounts);
        }
      };

      metamask.addListener("accountsChanged", set);

      return () => {
        metamask.removeListener("accountsChanged", set);
      };
    }
  }, [isMounted]);

  return accounts;
};

const useMessage = (callback: (...args: any) => void) => {
  const isMounted = useMounded();
  const callbackRef = useCallbackRef(callback);

  useEffect(() => {
    const call = (...args: any) => {
      callbackRef.current(...args);
    };

    metamask.addListener("chainChanged", call);

    return () => {
      metamask.removeListener("chainChanged", call);
    };
  }, [isMounted, callbackRef]);
};

const useConnection = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const onConnect = () => {
      setConnected(true);
    };
    const onDisconnect = () => {
      setConnected(false);
    };

    metamask.addListener("connect", onConnect);
    metamask.addListener("disconnect", onDisconnect);

    return () => {
      metamask.removeListener("connect", onConnect);
      metamask.removeListener("disconnect", onDisconnect);
    };
  }, []);
  return connected;
};

const useChain = () => {
  const isMounted = useMounded();
  const [chain, setChain] = useState<number | null>(null);

  useEffect(() => {
    const set = (chain: string) => {
      if (isMounted.current && !!chain) {
        setChain(parseInt(chain));
      }
    };

    const timeout = setTimeout(() => {
      //TODO: fix this. remove timeout
      const id = metamask.chainId;
      setChain(id);
    }, 500);

    metamask.addListener("chainChanged", set);

    return () => {
      clearTimeout(timeout);
      metamask.removeListener("chainChanged", set);
    };
  }, [isMounted]);

  return chain;
};

const useActive = () => {
  const accounts = useAccounts();
  return accounts.length > 0;
};

const useWeb3 = () => {
  const active = useActive();
  const accounts = useAccounts();
  const chain = useChain();
  const connected = useConnection();

  useMessage((...args: any) => {
    console.log("Got message: ", ...args);
  });

  const activate = useCallback(() => {
    if (hasEthereum()) {
      metamask?.request({ method: "eth_requestAccounts" });
    }
  }, []);

  return {
    connected,
    chain,
    activate,
    active,
    accounts,
  };
};

export {
  useActive,
  useAccounts,
  useWeb3,
  useMessage,
  useWeb3Context,
  Web3Provider,
  useConnection,
};
