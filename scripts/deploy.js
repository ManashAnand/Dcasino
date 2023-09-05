// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt);
}

 consoleBalances = async(addresses) => {
    let counter = 0;
    for(  const address of addresses){
      // console.log(address);
      console.log(`Address ${counter} balance: `,await getBalance(address))
      counter++;
      }
    
}

async function main() {
  const [owner,from1,from2,from3] = await hre.ethers.getSigners();

  const lottery = await hre.ethers.getContractFactory("Lottery");
  const contract = await lottery.deploy();

  // await contract.deployed();
  console.log("Address of contract ", await contract.getAddress());
  console.log("Balance of contract",await getBalance(await contract.getAddress()));
  const addresses = [owner.address,contract.getAddress(),from1.address,from2.address,from3.address]

  console.log("Before inputing");
  await consoleBalances(addresses);

  const amount = {value: hre.ethers.parseEther("1")};
  await contract.connect(from1).participate(amount);
  await contract.connect(from2).participate(amount);
  await contract.connect(from3).participate(amount);

  console.log("After giving money for lottery");
  await consoleBalances(addresses);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
