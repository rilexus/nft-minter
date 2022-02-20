const pinata_api_key: string = process.env.PINATA_API_KEY as string;
const pinata_secret_api_key: string = process.env
  .PINATA_SECRET_API_KEY as string;

const INFURA_PROJECT_KEY = process.env.INFURA_PROJECT_KEY;
const INFURA_PROJECT_SECRET = process.env.INFURA_PROJECT_SECRET;

export {
  pinata_api_key,
  pinata_secret_api_key,
  INFURA_PROJECT_KEY,
  INFURA_PROJECT_SECRET,
};
