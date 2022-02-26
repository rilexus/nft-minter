const PINATA_API_KEY: string = process.env.PINATA_API_KEY as string;
const PINATA_SECRET_API_KEY: string = process.env
  .PINATA_SECRET_API_KEY as string;

const INFURA_PROJECT_KEY = process.env.INFURA_PROJECT_KEY;
const INFURA_PROJECT_SECRET = process.env.INFURA_PROJECT_SECRET;

const RINKEBY_CONTRACT_ADDRESS = process.env.RINKEBY_CONTRACT_ADDRESS;

const RINKEBY_URL = process.env.RINKEBY_URL;

export {
  RINKEBY_URL,
  RINKEBY_CONTRACT_ADDRESS,
  PINATA_API_KEY,
  PINATA_SECRET_API_KEY,
  INFURA_PROJECT_KEY,
  INFURA_PROJECT_SECRET,
};