import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { MetamaskContext } from '@/utils/MetamaskContext';
import ConnectMetamask from '../ConnectMetamask';

type LayoutProps = {
   children: React.ReactNode;
   title: string;
   requireMetaMask?: boolean;
};

const Layout = ({ children, title, requireMetaMask }: LayoutProps) => {
   const isConnected = React.useContext(MetamaskContext);
   return (
      <>
         <Head>
            <title>{title} | Evotingdapp</title>
         </Head>

         <main className='text-gray-100 bg-gray-900 start-start'>
            <Sidebar />

            <div className='w-full p-10 ml-[272px] min-h-screen'>
               <Navbar />
               <section>
                  {!isConnected && requireMetaMask ? (
                     <ConnectMetamask />
                  ) : (
                     children
                  )}
               </section>
            </div>
         </main>
      </>
   );
};

export default Layout;
