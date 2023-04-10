import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

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

         <div>
            <a
               href='#'
               className='inline-block px-4 py-2 mt-4 text-sm font-semibold text-gray-200 bg-gray-800 rounded lg:mt-0 hover:bg-gray-700'
            >
               Login
            </a>
         </div>
      </nav>
   );
};

export default Navbar;
