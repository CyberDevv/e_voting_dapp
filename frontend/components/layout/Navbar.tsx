import SearchIcon from '@mui/icons-material/Search';
import { Button, IconButton } from '@mui/material';
import axios from 'axios';
import { ethers } from 'ethers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

declare global {
   interface Window {
      ethereum?: any;
   }
}

const Navbar = () => {
   const [loginState, setLoginState] = React.useState<string>('');
   const [userId, setUserId] = React.useState<string>('');

   React.useEffect(() => {
      const userId = localStorage.getItem('userId');
      if (userId) {
         setUserId(userId);
      }
   }, []);

   const handleLogin = async () => {
      setLoginState('Coneecting to your wallet...');

      if (!window?.ethereum) {
         setLoginState('Please install Metamask');
         return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);

      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();

      setLoginState('Generating nonce...');
      const {
         data: { data },
      } = await axios.post('/api/auth/nonce', {
         walletAddress,
         userId,
      });

      setLoginState('Please sign the nonce...');
      const signature = await signer.signMessage(data.nonce);

      const { data: verifiedData } = await axios.post('/api/auth/wallet', {
         walletAddress,
         signature,
         nonce: data.nonce,
      });

      setLoginState('Login Completed');

      console.log('verifiedData ==>', verifiedData);
   };

   return (
      <nav className='w-full between'>
         <div className='px-4 py-2 bg-gray-800 rounded-md start w-[505px]'>
            <input
               placeholder='Search'
               type='search'
               className='w-full text-gray-200 bg-transparent focus:outline-none'
            />
            <IconButton>
               <SearchIcon />
            </IconButton>
         </div>

         {/* <div>
            <a
               href='#'
               className='inline-block px-4 py-2 mt-4 text-sm font-semibold text-gray-200 bg-gray-800 rounded lg:mt-0 hover:bg-gray-700'
            >
               Login
            </a>
         </div> */}

         <div className='col-center'>
            <Button
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
            </Button>
            <p className='text-xs'>{loginState}</p>
         </div>

         <Link href='/profile'>
            <div className='space-x-2 start'>
               <div className='w-10 h-10 bg-gray-800 rounded-full' />
               <h6>John Doe</h6>
            </div>
         </Link>
      </nav>
   );
};

export default Navbar;
