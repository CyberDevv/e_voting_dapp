import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
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
         
         <Link href= "/profile">
            <div className= "space-x-2 start">
               <div className='w-10 h-10 bg-gray-800 rounded-full' />
               <h6>John Doe</h6>
            </div>
         </Link>
      </nav>
   );
};

export default Navbar;
