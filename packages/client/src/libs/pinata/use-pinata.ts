import { useCallback, useState } from "react";

let apiSecret: string | undefined;
let apiKey: string | undefined;

const config = ({ key, secret }: { key: string; secret: string }) => {
  apiSecret = secret;
  apiKey = key;
};

const useFetch = (): {
  loading: boolean;
  error: any;
  data: any;
  fetch: (url: string, init?: RequestInit) => Promise<any>;
} => {
  const [state, setState] = useState<{
    loading: boolean;
    error: any;
    data: any;
  }>({
    loading: false,
    error: null,
    data: null,
  });

  const f = useCallback(async (url: string, init?: RequestInit) => {
    setState((s) => ({ ...s, loading: true }));
    try {
      // eslint-disable-next-line
      // @ts-ignore
      const res = await (await fetch(url, init)).json();
      setState((s) => ({ ...s, data: res, loading: false, error: null }));
      return res;
    } catch (e) {
      setState((s) => ({ ...s, loading: false, error: e }));
    }
    return;
  }, []);

  return {
    fetch: f,
    ...state,
  };
};

const usePinata = () => {
  if (!apiKey || !apiSecret)
    throw new Error("You need to config the pinata service!");
  const { fetch, ...fetchValues } = useFetch();

  const [state, setState] = useState<{
    file: null | File;
  }>({
    file: null,
  });

  const add = useCallback(
    async (file: any) => {
      setState((s) => ({ ...s, file }));
      const data = new FormData();
      data.append("file", file);

      try {
        await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
          body: data,
          method: "POST",
          // eslint-disable-next-line
          // @ts-ignore
          headers: {
            // eslint-disable-next-line
            // @ts-ignore
            pinata_api_key: apiKey,
            // eslint-disable-next-line
            // @ts-ignore
            pinata_secret_api_key: apiSecret,
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
    [fetch]
  );

  return { add, ...fetchValues, ...state };
};

export { config, usePinata };
