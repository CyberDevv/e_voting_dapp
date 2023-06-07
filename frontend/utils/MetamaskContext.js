import React, { createContext, useState, useEffect } from 'react';

const MetamaskContext = createContext();

const MetamaskProvider = ({ children }) => {
   const [isConnected, setIsConnected] = useState(false);
   const [temp, setTemp] = useState(0);

   let interval = setInterval(() => {
      setTemp(temp + 1);
   }, 1000);

   useEffect(() => {
      const checkMetaMaskConnection = async () => {
         if (window.ethereum && window.ethereum.isMetaMask) {
            try {
               // Requesting access to user accounts
               const accounts = await window.ethereum.request({
                  method: 'eth_accounts',
               });

               if (accounts.length === 0) {
                  // No active accounts found
                  setIsConnected(false);
               } else {
                  // MetaMask is connected and active
                  clearInterval(interval);
                  setIsConnected(true);
               }
            } catch (error) {
               // Error occurred or user denied access
               setIsConnected(false);
            }
         } else {
            // MetaMask extension is not available
            setIsConnected(false);
         }
      };

      checkMetaMaskConnection();
   }, [temp]);

   return (
      <MetamaskContext.Provider value={isConnected}>
         {children}
      </MetamaskContext.Provider>
   );
};

export { MetamaskContext, MetamaskProvider };
