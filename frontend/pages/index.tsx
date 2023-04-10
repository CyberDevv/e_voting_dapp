import Layout from '@/components/layout';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Divider, IconButton } from '@mui/material';

export default function Home() {
   return (
      <Layout title='Home'>
         <section className='h-full pt-10'>
            <h4 className='text-3xl font-bold tracking-wide text-gray-200'>
               Hello, Jane
            </h4>
            <p className='mt-4 text-base text-gray-400'>
               Welcome to the voting portal, make sure you vote the right
               candidate.
            </p>

            <div className='mt-10 space-y-10'>
               <div className='grid grid-cols-2 gap-x-10'>
                  {/* Activity */}
                  <ActivityComp />

                  {/* Live Results */}
                  <ResultsComp />
               </div>

               {/* monitor */}
               <MonitorComp />
            </div>
         </section>
      </Layout>
   );
}

const ActivityComp = () => {
   return (
      <div className='p-5 bg-gray-800 rounded-md'>
         <h4 className='text-lg font-bold tracking-wider text-gray-200'>
            Activity
         </h4>

         <div className='mt-5'>
            <div className='start space-x-10'>
               <p className='start space-x-2 text-sm text-gray-200'>
                  <span className='h-3 w-3 block bg-primary rounded-full' />
                  <span>Ongoing</span>
               </p>
               <p className='start space-x-2 text-sm text-gray-200'>
                  <span className='h-3 w-3 block bg-secondary rounded-full' />
                  <span>Pending</span>
               </p>
               <p className='start space-x-2 text-sm text-gray-200'>
                  <span className='h-3 w-3 block bg-tetiary rounded-full' />
                  <span>Concluded</span>
               </p>
            </div>

            <div className='mt-10 space-y-8'>
               <p className='grid grid-cols-2 gap-x-8'>
                  <span className='between space-x-8'>
                     <span className='text-lg text-gray-200 truncate'>
                        President
                     </span>
                     <span className='h-3 w-3 block bg-primary rounded-full' />
                  </span>
                  <span className='text-base text-gray-200 text-right'>
                     27th April, 20023
                  </span>
               </p>
               <p className='grid grid-cols-2 gap-x-8'>
                  <span className='between space-x-8'>
                     <span className='text-lg text-gray-200 truncate'>
                        Secretary
                     </span>
                     <span className='h-3 w-3 block bg-secondary rounded-full' />
                  </span>
                  <span className='text-base text-gray-200 text-right'>
                     Pending
                  </span>
               </p>
               <p className='grid grid-cols-2 gap-x-8'>
                  <span className='between space-x-8'>
                     <span className='text-lg text-gray-200 truncate'>
                        Director of Sports
                     </span>
                     <span className='h-3 w-3 block bg-secondary rounded-full' />
                  </span>
                  <span className='text-base text-gray-200 text-right'>
                     Pending
                  </span>
               </p>
               <p className='grid grid-cols-2 gap-x-8'>
                  <span className='between space-x-8'>
                     <span className='text-lg text-gray-200 truncate'>
                        Vice Precident
                     </span>
                     <span className='h-3 w-3 block bg-tetiary rounded-full' />
                  </span>
                  <span className='text-base text-gray-200 text-right'>
                     Concluded
                  </span>
               </p>
            </div>
         </div>
      </div>
   );
};

const ResultsComp = () => {
   return (
      <div className='p-5 bg-gray-800 rounded-md'>
         <h4 className='text-lg font-bold tracking-wider text-gray-200'>
            Live Results
         </h4>
      </div>
   );
};

const MonitorComp = () => {
   return (
      <div className='p-5 bg-gray-800 rounded-md'>
         <h4 className='text-lg font-bold tracking-wider text-gray-200'>
            Monitor Candidates
         </h4>
      </div>
   );
};
