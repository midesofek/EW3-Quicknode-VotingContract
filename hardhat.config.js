require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const QUICKNODE_API = process.env.QUICKNODE_URL;
const PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  solidity: "0.8.17",

  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },

  networks: {
    goerli: {
      url: QUICKNODE_API,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
  },
};
