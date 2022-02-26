// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const ethers = hre.ethers;

const contracts = [
  {
    name: "Greeter",
    args: ["some"],
  },
];

const getContracts = async () => {
  return contracts;
};

async function deploy(contracts) {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  await hre.run("compile");

  const [deployer] = await ethers.getSigners(); //get the account to deploy the contract

  console.log("Deploying contracts with the account:", deployer.address);

  const instances = [];
  for await (const contract of contracts) {
    // We get the contract to deploy
    const Contract = await ethers.getContractFactory(contract.name);
    const instance = await Contract.deploy(...contract.args);
    await instance.deployed();
    console.log(`Deployed: ${contract.name}`);
    console.log(`Address: ${instance.address}`);
    console.log("===================");
    instances.push({
      name: contract.name,
      instance,
      address: instance.address,
    });
  }
  return instances;
}

(async () => {
  const c = await getContracts();
  deploy(c)
    .then(async (contracts) => {
      const greeter = contracts.find(({ name }) => name === "Greeter").instance;
      /*
        can use a different interface for a contract on specific address
      */
      // const greeter = await ethers.getContractAt(
      //   "GreeterInterface",
      //   greeter.address
      // );
      const greeting = await greeter.greet();
      console.log(greeting);

      // await greeter.setValue(42);
      // const value = await greeter.getValue();
      // console.log(value);

      process.exit(0);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
})();
