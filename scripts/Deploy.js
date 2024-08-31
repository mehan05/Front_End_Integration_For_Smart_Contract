const hre  = require("hardhat");
const fs = require("fs");
const path = require("path");
async function deployFunc(){
    const contract = await hre.ethers.getContractFactory("TestContract");
    const deploy = await contract.deploy();
    await deploy.waitForDeployment();
    console.log(await deploy.getAddress());
    const CONTRACT_ADDR = await deploy.getAddress();
    const filePath = path.join(__dirname,"ContractAddr.json");
    fs.writeFileSync(filePath,JSON.stringify({contract_addr:CONTRACT_ADDR}))

}

deployFunc().catch((err)=>{
    console.log(err);
    process.exitCode=1;
})