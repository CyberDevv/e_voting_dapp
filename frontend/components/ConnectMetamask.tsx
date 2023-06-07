import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import axios from 'axios';
import { ethers } from 'ethers';
import Image from 'next/image';
import { setCookie } from 'nookies';
import React from 'react';

const ConnectMetamask = () => {
   const [isLoading, setIsLoading] = React.useState<boolean>(false);
   const [userId, setUserId] = React.useState<string>('');
   const [text, setText] = React.useState<string>('Please connect to metamask');

   React.useEffect(() => {
      const userId = localStorage.getItem('userId');
      if (userId) {
         setUserId(userId);
      }
   }, []);

   const handleLogin = async () => {
      setIsLoading(true);

      if (!window?.ethereum) {
         setText('Please install Metamask');
         return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);

      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();

      const {
         data: { data },
      } = await axios.post('/api/auth/nonce', {
         walletAddress,
         userId,
      });

      const signature = await signer.signMessage(data.nonce);

      const { data: verifiedData } = await axios.post('/api/auth/verify', {
         walletAddress,
         signature,
         nonce: data.nonce,
      });

      setIsLoading(false);

      // set verifiedData to localStorage and cookies
      localStorage.setItem('userId', verifiedData.userId);
      setCookie(null, 'authToken', verifiedData.token, {
         maxAge: 30 * 24 * 60 * 60,
         path: '/',
      });
   };

   return (
      <div className='flex flex-col items-center justify-center h-screen'>
         <h1 className='mb-4 text-2xl font-bold'>{text}</h1>
         {text !== 'Please install Metamask' && (
            <LoadingButton
               loading={isLoading}
               startIcon={
                  <Image
                     src='/metamask.svg'
                     className='w-4 lg:mr-2 lg:w-6'
                     width={256}
                     height={240}
                     alt='metamask'
                  />
               }
               variant='outlined'
               className='text-sm text-white normal-case border-gray-400 lg:rounded-lg lg:py-2 lg:px-4 lg:text-base'
               onClick={handleLogin}
            >
               Metamask
            </LoadingButton>
         )}
      </div>
   );
};

export default ConnectMetamask;
