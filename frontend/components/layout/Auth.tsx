import { Button, Divider } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Id } from 'react-toastify';

type AuthProps = {
   children: React.ReactNode;
   type: string;
   title: string;
   heading: string;
   desc: string;
   handleSubmit: (event: React.FormEvent) => Id | undefined;
};

const Auth = ({
   children,
   type,
   title,
   heading,
   desc,
   handleSubmit,
}: AuthProps) => {
   return (
      <>
         <Head>
            <title>{type || 'Auth'} | Evotedapp</title>
         </Head>

         <section className='text-gray-100 bg-gray-900'>
            <div className='h-screen container_fluid col-center'>
               <div className='col-center lg:flex-row lg:space-x-32 lg:center'>
                  <aside className='hidden w-1/2 h-full p-16 tracking-wide bg-gray-800 rounded-xl lg:block bg-opacity-80'>
                     <div className='h-full col-start'>
                        <h2 className='relative text-4xl font-bold text-tetiary before:bg-tetiary before:absolute before:h-1 before:w-28 before:rounded before:-bottom-4'>
                           {heading}
                        </h2>
                        <p className='mt-12'>{desc}</p>
                     </div>
                  </aside>

                  {/* section 2 */}
                  <aside className='lg:w-1/2'>
                     <h3 className='text-xl font-bold tracking-wide lg:text-3xl'>
                        {title}
                     </h3>

                     <form className='mt-8 space-y-8' onSubmit={handleSubmit}>
                        {children}
                     </form>

                     <p className='mt-8 text-xs font-medium text-center sm:text-sm lg:text-base'>
                        {type === 'Login' ? (
                           <span>
                              Don&apos;t have an account?{' '}
                              <Link href='/auth/register'>
                                 <span className='text-primary'>Vote Now</span>
                              </Link>
                           </span>
                        ) : (
                           <span>
                              Already have an account?{' '}
                              <Link href='/auth/login'>
                                 <span className='text-primary'>Login</span>
                              </Link>
                           </span>
                        )}
                     </p>
                  </aside>
               </div>
            </div>
         </section>
      </>
   );
};

export default Auth;
