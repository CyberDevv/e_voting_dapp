import Layout from '@/components/layout';
import React from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Link from 'next/link';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import {
   DataGrid,
   GridActionsCellItem,
   GridColDef,
   GridRowsProp,
} from '@mui/x-data-grid';

const View = () => {
   const router = useRouter();

   // datagrid columns
   const columns: GridColDef[] = [
      {
         field: 'name',
         headerName: 'candidate',
         minWidth: 150,
         flex: 1,
         headerClassName: '',
      },
      { field: 'department', headerName: 'Department', minWidth: 150 },
      { field: 'noOfVotes', headerName: 'No of Votes', minWidth: 150 },
      {
         field: 'actions',
         headerName: '',
         minWidth: 150,
         type: 'actions',
         getActions: (params) => [
            <GridActionsCellItem
               key={params.id}
               icon={<RemoveRedEyeIcon />}
               label='view'
               onClick={() => router.push(`/vote/details`)}
            />,
         ],
      },
   ];

   return (
      <Layout title='View Election'>
         <section className='mt-10'>
            <div className='space-x-8 between'>
               <h2 className='text-3xl font-bold tracking-wide'>Election 1</h2>

               <div className='space-x-4 end'>
                  <Button className='px-4 py-2 text-sm font-semibold text-gray-100 normal-case bg-red-500 rounded-md'>
                     Delete
                  </Button>

                  <Link href={`/elections/create?id=${44}&edit=true`}>
                     <Button className='px-4 py-2 text-sm font-semibold text-gray-100 normal-case rounded-md bg-primary'>
                        Edit
                     </Button>
                  </Link>
               </div>
            </div>

            <div className='grid grid-cols-3 gap-8 mt-8'>
               <Card
                  label='Start Date'
                  value='Oct 6, 2023, 10:00 AM'
                  icon={<CalendarMonthIcon className='w-12 h-12' />}
               />
               <Card
                  label='End Date'
                  value='Oct 6, 2023, 4:00 PM'
                  icon={<CalendarMonthIcon className='w-12 h-12' />}
               />
               <Card
                  label='Candidates'
                  value='6'
                  icon={<GroupsIcon className='w-12 h-12' />}
               />
            </div>

            <div className= "mt-10">
               <h4 className='text-lg font-bold tracking-wide'>Results</h4>
               
               <DataGrid
                  rows={rows}
                  columns={columns}
                  autoHeight
                  density='comfortable'
                  disableColumnMenu
                  disableColumnFilter
                  disableColumnSelector
                  disableRowSelectionOnClick
                  hideFooter
                  rowSelection={false}
                  className='mt-4'
                  editMode='row'
                  sx={{
                     '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: 'rgb(31 41 55 )',
                        fontWeight: '700',
                        fontSize: '1rem',
                     },
                     '& .MuiDataGrid-row': {},
                  }}
               />
            </div>
         </section>
      </Layout>
   );
};

export default View;

type CardProps = {
   label: string;
   value: string;
   icon: React.ReactNode;
};

const Card = ({ label, value, icon }: CardProps) => {
   return (
      <div className='px-6 py-8 space-x-4 bg-gray-800 rounded-lg start'>
         {icon}

         <div className='space-y-4'>
            <h5 className='text-lg font-medium tracking-wide'>{label}</h5>
            <p className='text-gray-200'>{value}</p>
         </div>
      </div>
   );
};

const rows: GridRowsProp = [
   {
      id: 1,
      name: 'Election 1',
      department: 'Computer Science',
      noOfVotes: 112,
      actions: '',
   },
   {
      id: 2,
      name: 'Election 1',
      department: 'Computer Science',
      noOfVotes: 112,
      actions: '',
   },
   {
      id: 3,
      name: 'Election 1',
      department: 'Computer Science',
      noOfVotes: 112,
      actions: '',
   },
   {
      id: 4,
      name: 'Election 1',
      department: 'Computer Science',
      noOfVotes: 112,
      actions: '',
   },
   {
      id: 5,
      name: 'Election 1',
      department: 'Computer Science',
      noOfVotes: 112,
      actions: '',
   },
];
