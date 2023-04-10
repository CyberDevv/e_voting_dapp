import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

type LayoutProps = {
   children: React.ReactNode;
   title: string;
};

const Layout = ({ children, title }: LayoutProps) => {
   return (
      <>
         <Head>
            <title>{title} | Evotingdapp</title>
         </Head>

         <main className='text-gray-100 bg-gray-900 start-start'>
            <Sidebar />

            <div className='w-full p-10'>
               <Navbar />
               {children}
            </div>
         </main>
      </>
   );
};

export default Layout;
