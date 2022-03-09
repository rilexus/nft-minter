import { usePinata } from "@libs";
import { usePromise } from "@hooks";
import { v4 as uuid } from "uuid";
import { IPFS_GATEWAY } from "@env";

const IPFS_GATEWAY_URI = IPFS_GATEWAY;

const useNFT = (): [
  (...args: any) => any,
  {
    loading: boolean;
    data: any;
    error: any;
  }
] => {
  const { pinFile, pinJson } = usePinata();

  const [create, rest] = usePromise(
    async (data: { name: string; description: string; file: File }) => {
      const { file, name, description } = data;

      // 1. upload file to IPFS
      const {
        // if isDuplicate is true, pinJson throws an error: upload json in any way
        data: { isDuplicate, ...imageData },
        error,
      } = await pinFile(file);
      if (!error) {
        // const { IpfsHash, PinSize, Timestamp } = data;
        const id = uuid();
        // random id as the name of the json. this will be displayed in the pinata dashboard
        // spread file info to pinata metadata so it
        const metadata = { name: `${id}.json`, ...imageData };

        const json = {
          // 2. create json object with IpfsHash of the file, name, description, image url
          ...imageData,
          name,
          createdAt: imageData.Timestamp,
          description,
          image: `${IPFS_GATEWAY_URI}/${imageData.IpfsHash}`,
        };
        // 3. upload json to IPFS
        const { data } = await pinJson(json, metadata);
        // return IpfsHash of the json
        return data.IpfsHash;
        //
      }
    }
  );

  return [create, rest];
};

export { useNFT };
