require("dotenv").config({ path: "../../.env" });

const PINATA_API_KEY = process.env.ENV_PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.ENV_PINATA_SECRET_API_KEY;

const INFURA_PROJECT_KEY = process.env.ENV_INFURA_PROJECT_KEY;
const INFURA_PROJECT_SECRET = process.env.ENV_INFURA_PROJECT_SECRET;

const RINKEBY_CONTRACT_ADDRESS = process.env.ENV_RINKEBY_CONTRACT_ADDRESS;

const RINKEBY_PRIVATE_KEY = process.env.ENV_RINKEBY_PRIVATE_KEY;

const RINKEBY_URL = process.env.ENV_RINKEBY_URL;

module.exports = {
  // --------- ADDRESSES ---------
  RINKEBY_URL,
  RINKEBY_CONTRACT_ADDRESS,
  // --------- KEYS ---------
  RINKEBY_PRIVATE_KEY,
  // --------- AUTH ---------
  PINATA_API_KEY,
  PINATA_SECRET_API_KEY,
  INFURA_PROJECT_KEY,
  INFURA_PROJECT_SECRET,
};
