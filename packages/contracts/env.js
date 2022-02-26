require("dotenv").config({ path: "../../.env" });

const getENV = () => {
  return Object.entries(process.env).reduce((e, [key, value]) => {
    if (key.startsWith("ENV_")) {
      const k = key.split("ENV_")[1];
      return {
        ...e,
        [k]: value,
      };
    }
    return e;
  }, {});
};
const env = getENV();

console.log("ENV:");
console.log(env);

module.exports = env;
