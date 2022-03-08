import { usePromise } from "@hooks";
import { Pinata } from "./pinata";

let apiSecret: string | undefined;
let apiKey: string | undefined;
let pinata: Pinata;

const config = ({ key, secret }: { key: string; secret: string }) => {
  pinata = new Pinata(key, secret);
  apiSecret = secret;
  apiKey = key;
};

const usePinata = () => {
  if (!apiKey || !apiSecret)
    throw new Error("You need to config the pinata service!");

  const [pinFile, pinFileStatus] = usePromise(async (file: any) => {
    return await (await pinata.pinFileToIPFS(file)).json();
  });
  const [pinJson, pinJSONStatus] = usePromise(async (json: any, meta?: any) => {
    return await (await pinata.pinJsonToIPFS(json, meta)).json();
  });

  return { pinJson, pinFile, pinJSONStatus, pinFileStatus };
};

export { config, usePinata };
