import React from 'react';
import Head from 'next/head';

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

         <main className='text-gray-100 bg-gray-900'>{children}</main>
      </>
   );
};

export default Layout;
