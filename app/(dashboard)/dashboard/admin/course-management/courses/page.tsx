import Search from '@/components/ui/inputs/Search';
import { baseUrl } from '@/config';
import { verifySession } from '@/lib/server.utils';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DataTable } from '@/components/ui/datatable/DataTable';
import { courses_columns } from './courses_table.columns';
import { GetListOfCourses } from '@/app/actions/server.admin';
import { loginSessionKey } from '@/lib/definitions';

export const dynamic = "force-dynamic";

const page = async () => {
   const session = await verifySession(loginSessionKey);
   const basePath = `${baseUrl}/dashboard/admin/course-management/courses`;

   let descendingData: any[]
   
   const { error, success }: any = await new Promise((resolve) => resolve(GetListOfCourses(session.token)));
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
               <Search name={'search'}  placeholder='Search for a department' />
            </div>
            <div className="search flex justify-end">
               <Select>
                  <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
               </Select>
            </div>
         </div>
         <Card className="mt-7">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-7">
               List Of Courses
            </h5>
            <CardHeader>
               <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-7">List Of Courses</CardTitle>
            </CardHeader>
            <CardContent className="font-normal text-gray-700 dark:text-gray-400 space-y-10 mb-7">
               <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                     <span>Show</span>
                     <Select>
                        <SelectTrigger className="w-[180px]">
                           <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="10">10</SelectItem>
                           <SelectItem value="20">20</SelectItem>
                           <SelectItem value="30">30</SelectItem>
                           <SelectItem value="40">40</SelectItem>
                           <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                     </Select>
                     <span>entries</span>
                  </div>
                  <div className="">
                     <Link href={`${basePath}/create`} >
                        <Button>
                           <PlusIcon className="h-5 md:ml-4" />
                           Create New Course
                        </Button>
                     </Link>
                  </div>
               </div>
               <div className="">
                  <DataTable columns={courses_columns} data={descendingData} />
               </div>
            </CardContent>
            
         </Card>
      </>
   )
}

export default page