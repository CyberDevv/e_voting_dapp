import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import { useRouter } from 'next/router';

const Navbar = () => {
   return (
      <nav className='min-w-[272px] bg-gray-800 h-screen p-10'>
         <span className='text-2xl font-semibold tracking-tight'>
            Evotingdapp
         </span>

         <ul className='mt-20 space-y-8'>
            <Navlink label='Dashboard' icon={<DashboardTwoToneIcon />} />
            <Navlink label='Vote' icon={<HowToVoteIcon />} />
         </ul>
      </nav>
   );
};

type NavlinkProps = {
   label: string;
   icon: JSX.Element;
};

const Navlink = ({ label, icon }: NavlinkProps) => {
   const router = useRouter();

   return (
      <li>
         <Link href={label === 'Dashboard' ? '/' : '/' + label.toLowerCase()}>
            <Button
               startIcon={icon}
               className={`w-full px-6 py-3 text-base tracking-wider rounded-md normal-case px start ${
                  router.pathname === '/' + label.toLowerCase() ||
                  (router.pathname === '/' && label === 'Dashboard')
                     ? 'bg-gray-700 text-gray-100'
                     : 'bg-gray-800 text-gray-200'
               }`}
            >
               {label}
            </Button>
         </Link>
      </li>
   );
};

export default Navbar;
