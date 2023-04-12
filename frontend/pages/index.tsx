import Layout from '@/components/layout';

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
            <div className='space-x-10 start'>
               <p className='space-x-2 text-sm text-gray-200 start'>
                  <span className='block w-3 h-3 rounded-full bg-primary' />
                  <span>Ongoing</span>
               </p>
               <p className='space-x-2 text-sm text-gray-200 start'>
                  <span className='block w-3 h-3 rounded-full bg-secondary' />
                  <span>Pending</span>
               </p>
               <p className='space-x-2 text-sm text-gray-200 start'>
                  <span className='block w-3 h-3 rounded-full bg-tetiary' />
                  <span>Concluded</span>
               </p>
            </div>

            <div className='mt-10 space-y-8'>
               <p className='grid grid-cols-2 gap-x-8'>
                  <span className='space-x-8 between'>
                     <span className='text-lg text-gray-200 truncate'>
                        President
                     </span>
                     <span className='block w-3 h-3 rounded-full bg-primary' />
                  </span>
                  <span className='text-base text-right text-gray-200'>
                     27th April, 20023
                  </span>
               </p>
               <p className='grid grid-cols-2 gap-x-8'>
                  <span className='space-x-8 between'>
                     <span className='text-lg text-gray-200 truncate'>
                        Secretary
                     </span>
                     <span className='block w-3 h-3 rounded-full bg-secondary' />
                  </span>
                  <span className='text-base text-right text-gray-200'>
                     Pending
                  </span>
               </p>
               <p className='grid grid-cols-2 gap-x-8'>
                  <span className='space-x-8 between'>
                     <span className='text-lg text-gray-200 truncate'>
                        Director of Sports
                     </span>
                     <span className='block w-3 h-3 rounded-full bg-secondary' />
                  </span>
                  <span className='text-base text-right text-gray-200'>
                     Pending
                  </span>
               </p>
               <p className='grid grid-cols-2 gap-x-8'>
                  <span className='space-x-8 between'>
                     <span className='text-lg text-gray-200 truncate'>
                        Vice Precident
                     </span>
                     <span className='block w-3 h-3 rounded-full bg-tetiary' />
                  </span>
                  <span className='text-base text-right text-gray-200'>
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
