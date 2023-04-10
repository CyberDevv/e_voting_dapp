import Layout from '@/components/layout';
import React from 'react';
import Person3OutlinedIcon from '@mui/icons-material/Person3Outlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

const Candidate_details = () => {
   return (
      <Layout title='Candidate Details'>
         <section className='pt-10'>
            <div className='uppercase tracking-wider font-bold col-center space-y-6'>
               <h1 className='text-4xl'>Vote John Doe</h1>
               <span className='text-xl  text-gray-200'>For</span>
               <h2 className='text-3xl'>President</h2>
            </div>

            <div className='mt-14'>
               <div className='start space-x-4'>
                  <div className='h-48 w-48 rounded-full bg-gray-800' />

                  <div className='space-y-4'>
                     <h3 className='text-2xl font-bold text-gray-200'>
                        <Person3OutlinedIcon className='mr-2 text-gray-400' />
                        John Doe
                     </h3>
                     <p className=' text-lg text-gray-200'>
                        <SchoolOutlinedIcon className='mr-2 text-gray-400' />
                        Software Development
                     </p>
                     <p className='italic tracking-wider'>
                        <q>Vote for me and I will be your voice</q>
                     </p>
                  </div>
               </div>
            </div>

            <div className='mt-10'>
               <h3 className='text-2xl font-bold text-gray-200 tracking-wider'>
                  Campaign Promise
               </h3>

               <p className='text-xl leading-loose mt-4 text-gray-300'>
                  My name is Kitan Babs and i am running for President student
                  council. This Election present us with a clear choice. It is a
                  choice between continuing things the way they have been done
                  or electing a new leader who can bring fresh ideas and
                  pespectives. I believe my experience and personality will help
                  me offer new ideas and Above all i believe my most important
                  Job would be to listen to you and to communicate with you
                  regularly. I will lead with your best interest in mind and
                  welcome more ideas that would make our university better. I
                  know voting for someone requires a lot of trust but am willing
                  to work hard to earn your trust. Thank You.
               </p>
            </div>
         </section>
      </Layout>
   );
};

export default Candidate_details;
