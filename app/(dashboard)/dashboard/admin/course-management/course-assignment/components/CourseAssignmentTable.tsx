"use client";
import React from 'react'
import Link from 'next/link';

const CourseAssignmentTable = ({ basePath, slug, data }: { basePath: string, slug: any, data: any[] }) => {

   return (
      <div className="overflow-x-auto">
         {/* <Table hoverable>
            <TableHead>
               <TableHeadCell>Id</TableHeadCell>
               <TableHeadCell>Short Code</TableHeadCell>
               <TableHeadCell className='text-cyan-600'>
                  Actions
                  <span className="sr-only">View Details</span>
               </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
               {data.map((courseCategory: any, i: any) => (
                  <TableRow key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                     <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {++i}
                     </TableCell>
                     <TableCell>{courseCategory.short_code}</TableCell>
                     <TableCell className='text-cyan-600'>
                        <Link href={`${basePath}/${courseCategory.id}/details`}>
                           <div className="text-lg font-semibold text-cyan-500">View Details</div>
                        </Link>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table> */}
      </div>
   )
}

export default CourseAssignmentTable