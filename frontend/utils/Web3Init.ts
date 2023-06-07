import axios from 'axios';
import React from 'react';
import Web3 from 'web3';

export async function web3Init(
   setContractAddress: React.Dispatch<React.SetStateAction<string>>,
   setAbi: React.Dispatch<React.SetStateAction<never[]>>,
   abi: never[],
   contractAddress: string
) {
   const web3 = new Web3(window.ethereum);

   // Request access to the user's Ethereum account
   await window.ethereum.enable();

   // Get the user's Ethereum address
   const accounts = await web3.eth.getAccounts();
   const userAddress = accounts[0];

   // get contract address and abi from backend
   const response = await axios
      .get('/api/contract?name=Voting')
      .then((res) => {
         const contractAddress = res.data.contractAddress;
         const abi = res.data.contractAbi;

         setContractAddress(contractAddress);
         setAbi(abi);

         return { contractAddress, abi };
      })
      .catch((err) => {
         console.log(err);
      });

   // Get the contract instance
   const contract = new web3.eth.Contract(
      response?.abi,
      response?.contractAddress
   );

   // Get the current nonce for the user's Ethereum address
   const nonce = await web3.eth.getTransactionCount(userAddress);
   return { userAddress, nonce, contract, web3 };
}
