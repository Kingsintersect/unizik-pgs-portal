import Search from '@/components/ui/inputs/Search';
import { baseUrl } from '@/config';
import { verifySession } from '@/lib/server.utils';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense } from 'react'
import { Button } from "@/components/ui/button"
import SelectMenu from '@/components/SelectMenu';
import CustomCard from '@/components/CustomCard';
import { DataTable } from '@/components/ui/datatable/DataTable';
import { course_category_columns } from './course_category_table.columns';
import { GetListOfCourseCategories } from '@/app/actions/server.admin';
import { loginSessionKey } from '@/lib/definitions';


const page = async () => {
   const session = await verifySession(loginSessionKey);
   const basePath = `${baseUrl}/dashboard/admin/course-management/course-categories`;

   let descendingData: any[];
   
   const { error, success }: any = await new Promise((resolve) => resolve(GetListOfCourseCategories(session.token)));

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
            title="Course Categories"
            description="List of course categories"
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
               <DataTable columns={course_category_columns} data={descendingData} />
            </div>
         </CustomCard>
      </>
   )
}

export default page