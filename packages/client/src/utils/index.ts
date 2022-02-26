const isImageType = (type: string | undefined): boolean => {
  if (!type) return false;
  return (type as string).startsWith("image");
};

import Web3 from "web3";

const requestAccounts = async () => {
  // eslint-disable-next-line
  //@ts-ignore
  if (window.ethereum) {
    // eslint-disable-next-line
    //@ts-ignore
    await window.ethereum.request({ method: "eth_requestAccounts" });
    // eslint-disable-next-line
    //@ts-ignore
    window.web3 = new Web3(window.ethereum);
    return true;
  }
};

export { isImageType, requestAccounts };
