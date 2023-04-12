import Layout from '@/components/layout';
import { Button } from '@mui/material';
import {
   DataGrid,
   GridActionsCellItem,
   GridColDef,
   GridRowsProp,
} from '@mui/x-data-grid';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ElectionOverview = () => {
   const router = useRouter();

   // datagrid columns
   const columns: GridColDef[] = [
      {
         field: 'name',
         headerName: 'Election Tile',
         minWidth: 150,
         flex: 1,
         headerClassName: '',
      },
      { field: 'startDate', headerName: 'Start Date', minWidth: 150 },
      { field: 'endDate', headerName: 'End Date', minWidth: 150 },
      { field: 'status', headerName: 'Status', minWidth: 150 },
      { field: 'candidates', headerName: 'Candidates', minWidth: 150 },
      {
         field: 'actions',
         headerName: '',
         minWidth: 150,
         type: 'actions',
         getActions: (params) => [
            <GridActionsCellItem
               key={params.id}
               icon={<BorderColorIcon />}
               label='view'
               onClick={() =>
                  router.push(`/elections/create?id=${params.id}&edit=true`)
               }
            />,
            <GridActionsCellItem
               key={params.id}
               icon={<RemoveRedEyeIcon />}
               label='view'
               onClick={() =>
                  router.push(`/elections/${params.id}`)
               }
            />,
            <GridActionsCellItem
               key={params.id}
               icon={<DeleteIcon />}
               label='view'
               onClick={() => console.log(params.id)}
            />,
         ],
      },
   ];

   return (
      <Layout title='Election Overview'>
         <section className='pt-10'>
            <div className='between'>
               <h4 className='text-lg font-bold tracking-wide'>
                  List of Elections
               </h4>

               <Link href='/elections/create'>
                  <Button className='px-4 py-2 text-sm font-semibold text-gray-100 normal-case rounded-md bg-primary'>
                     Create Election
                  </Button>
               </Link>
            </div>

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
         </section>
      </Layout>
   );
};

export default ElectionOverview;

const rows: GridRowsProp = [
   {
      id: 1,
      name: 'Election 1',
      startDate: '2021-01-01',
      endDate: '2021-01-01',
      status: 'open',
      candidates: 6,
      actions: '',
   },
   {
      id: 2,
      name: 'Election 1',
      startDate: '2021-01-01',
      endDate: '2021-01-01',
      status: 'open',
      candidates: 6,
      actions: '',
   },
   {
      id: 3,
      name: 'Election 1',
      startDate: '2021-01-01',
      endDate: '2021-01-01',
      status: 'open',
      candidates: 6,
      actions: '',
   },
   {
      id: 4,
      name: 'Election 1',
      startDate: '2021-01-01',
      endDate: '2021-01-01',
      status: 'open',
      candidates: 6,
      actions: '',
   },
   {
      id: 5,
      name: 'Election 1',
      startDate: '2021-01-01',
      endDate: '2021-01-01',
      status: 'open',
      candidates: 6,
      actions: '',
   },
];
