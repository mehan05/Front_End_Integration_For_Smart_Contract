import { useEffect, useState } from 'react'
import './App.css';
import Contracat_abi from "../../artifacts/contracts/test.sol/TestContract.json";
import {ethers} from "ethers";
import DepoyedAddr from "../../scripts/ContractAddr.json";
function App() {

    const[account,setAccount] = useState("");
    const[msgFromContract,setmsgFromContract]=useState("");
    const[contract,setContract] = useState("");

    const contractAddr = DepoyedAddr.contract_addr;
    const abi = Contracat_abi.abi;
    useEffect(()=>{

      const connectMetamaskAndSetupContract =async()=>{
        try {
          const {ethereum} = window;
          if(!ethereum) 
          {
            alert("Install Metamask.");
            return;
          }
          const accounts = await ethereum.request({
            method:"eth_requestAccounts"
          })
          setAccount(accounts[0]);

          const provider = new ethers.providers.Web3Provider(ethereum);

          const signer =  provider.getSigner();
          const Contract = new ethers.Contract(contractAddr,abi,signer);
          setContract(Contract);
          
        } catch (error) {
          console.log(error);
        }
      }

      connectMetamaskAndSetupContract();
    },[])

    const handleClick = async()=>{
      const transaction = await contract.getMessage();
      setmsgFromContract(transaction);
    }


  return (
    <>
        <h1>Get Hello From Contract.</h1>
        <p >Connected Account:{account}</p>
        <button onClick={handleClick} className='button-hello'>Get Hello</button>

        <h1 >{msgFromContract}</h1>
    </>
  )
}

export default App
