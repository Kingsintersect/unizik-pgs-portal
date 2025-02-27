import Search from '@/components/ui/inputs/Search'
import { baseUrl } from '@/config'
import { PlusIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import SelectMenu from '@/components/SelectMenu';
import CustomCard from '@/components/CustomCard';
import Link from 'next/link'
import React, { Suspense } from 'react'
import { contry_columns } from './contry_table.columns'
import { DataTable } from '@/components/ui/datatable/DataTable'
import { GetListOfCountries } from '@/app/actions/server.admin'


const page = async () => {
   const basePath = `${baseUrl}/dashboard/admin/region/countries`;
   let descendingData: any[];
   
   const { error, success }: any = await new Promise((resolve) => resolve(GetListOfCountries()));

   if (success) {
      const ascendingData = [...success.data].sort((a, b) => a.id - b.id);
      descendingData = [...success.data].sort((a, b) => b.id - a.id);
   } else {
      descendingData = [];
   }

   return (
      <>
         <div className="grid sm:grid-cols-2 gap-3 md:gap-10">
            <div className="search">
               <Search name={'search'} placeholder='Search for a department' />
            </div>
            <div className="search flex justify-end">
               <SelectMenu
                  placeholder='Theme'
                  menu={[
                     { title: 'namae', value: "namae" },
                  ]}
               />
            </div>
         </div>
         <CustomCard
            className='mt-7'
            title="Countries"
            description="List Of Countries"
            titleClassName='text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-7'
            contentClassName='font-normal text-gray-700 dark:text-gray-400 space-y-10 mb-7'
         >
            <div className="flex items-center justify-between">
               <div className="flex gap-2 items-center">
                  <span>Show</span>
                  <SelectMenu
                     placeholder='Numbers of entries'
                     menu={[
                        { title: '10', value: "10" },
                        { title: '20', value: "20" },
                        { title: '30', value: "30" },
                     ]}
                  />
                  <span>entries</span>
               </div>
               <div className="">
                  <Link href={`${basePath}/create`} >
                     <Button>
                        <PlusIcon className="h-5 md:ml-4" />
                        Create New Course Category
                     </Button>
                  </Link>
               </div>
            </div>
            <div className="">
               <DataTable columns={contry_columns} data={descendingData} />
            </div>
         </CustomCard>
      </>
   )
}

export default page