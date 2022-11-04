//Import hardhat-ethers
const { ethers, run, network } = require("hardhat");
require("dotenv").config();

// create the Async function
async function main() {
  //Get contractFactory
  const blockVotesFactory = await ethers.getContractFactory("BlockVotes");
  console.log("Deploying. Please wait.....");

  //deploy contract on hardhat
  const blockVotes = await blockVotesFactory.deploy();
  console.log(`Deployed at ${blockVotes.address}`);

  //Auto-verifying the Contract on Etherscan
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log("Awaiting Transaction Confirmation......");
    await blockVotes.deployTransaction.wait(6);
    await verify(blockVotes.address, []);
  }
}

async function verify(contractAddress, args) {
  console.log("Verifying contract.....");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already Verified")) {
      console.log("Already Verified");
    } else {
      console.log(e);
    }
  }
}

// call the function
main().then(() =>
  process.exit(0).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);
