"use client";
import { GetAllCourseAssignment } from '@/app/actions/server.admin';
import Search from '@/components/ui/inputs/Search';
import { baseUrl } from '@/config';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react'
import { Button } from "@/components/ui/button"
import { DataTable } from '@/components/ui/datatable/DataTable';
import { course_assignment_columns } from './course_assignment_table.columns';import useToken from '@/hook/useToken';
import { filterData } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from '@/components/ui/card';
import ExportDropdown from '@/components/ExportDropdown';
export const dynamic = "force-dynamic";

const CourseAssignmentPage = () => {
   const [courseAssignments, setCourseAssignments] = useState<any[]>([]);
   const [filter, setFilter] = useState("ALL");
   const [searchQuery, setSearchQuery] = useState("");
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const { token } = useToken();
   const basePath = `${baseUrl}/dashboard/admin/course-management/course-assignment`;
   
   const fetchCourseAssignments: any = async (token: string) => {
      setLoading(true);
      setError(null); 

      try {
         const { success, error } = await GetAllCourseAssignment(token);
         if (success) {
            const sortedData = success.data.sort((a: any, b: any) => b.id - a.id);
            setCourseAssignments(sortedData);
         } else if (error) {
            setError(error.message || "Failed to fetch Departments");
         }
      } catch (err) {
         setError("An unexpected error occurred.");
      } finally {
         setLoading(false);
      }
   }

   useEffect(() => {
      let isMounted = true;
      if (token) {
         fetchCourseAssignments(token).catch(console.error);
         return () => { isMounted = false; };
      }
   }, [token]);

   const filteredData = useMemo(() =>
      filterData(courseAssignments, "status", filter, ["department_name"], searchQuery),
      [filter, searchQuery, courseAssignments]
   );

   return (
      <>
         <Card className="mt-7 p-10">
            <header className="w-full flex items-center justify-between text-orange-500 font-bold">
               <h5 className="text-2xl font-bold tracking-tight text-[#23628d] dark:text-white mb-7">
                  Course Assignments List
               </h5>
               {courseAssignments && courseAssignments.length > 0 && (
                  <ExportDropdown
                     label='Export Course Assignments'
                     data={courseAssignments}
                     columns={
                        [
                           'short_code',
                        ]
                     }
                  />
               )}
            </header>
            <div className="font-normal text-gray-700 dark:text-gray-400 space-y-10 mb-7">
               <div className="grid sm:grid-cols-2 gap-3 md:gap-10">
                  <div className="search">
                     <Search
                        name={'search'}
                        placeholder='Search by name...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-3 rounded w-full"
                     />
                  </div>
                  <div className="search flex justify-end gap-5">
                     <Select
                        onValueChange={(value: string) => setFilter(value)} 
                        defaultValue={filter}
                     >
                        <SelectTrigger className='w-[280px]'>
                           <SelectValue placeholder="SelectFilter Key" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="ALL">All Course Assingments</SelectItem>
                           <SelectItem value="1">Active</SelectItem>
                           <SelectItem value="0">InActive</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>
               <div className="flex flex-col">
                  <div className="">
                     <Link href={`${basePath}/create`} >
                        <Button variant={'secondary'}>
                           <PlusIcon className="h-5 md:ml-4" />
                           Create New Course Assignments
                        </Button>
                     </Link>
                  </div>
               </div>
               <div className="grid grid-cols-1">
                  <DataTable columns={course_assignment_columns} data={filteredData} />
               </div>
            </div>
         </Card>
      </>
   )
}

export default CourseAssignmentPage