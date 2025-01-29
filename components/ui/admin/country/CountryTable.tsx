import { baseUrl } from '@/config';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Dropdown, DropdownItem } from 'flowbite-react';
import Link from 'next/link';
import React from 'react'
import { DeleteCourse } from '../courses/CourseButtons';
import { GetListOfCountries } from '@/app/actions/server.admin';
import { notify } from '@/contexts/ToastProvider';
import { DeleteCountry } from './CountryButtons';

const CountryTable = async ({ slug, token }: { slug: any, token: string }) => {
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
      <div className="overflow-x-auto">
         <Table hoverable>
            <TableHead>
               <TableHeadCell>Id</TableHeadCell>
               <TableHeadCell>Name</TableHeadCell>
               <TableHeadCell className='text-cyan-600'>
                  Actions
                  <span className="sr-only">Edit</span>
               </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
               {descendingData.map((country: any, i: any) => (
                  <TableRow key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                     <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {++i}
                     </TableCell>
                     <TableCell>{country.name}</TableCell>
                     <TableCell className='text-cyan-600'>
                        <Dropdown label={`Expand`} inline size={`lg`} className="">
                           <Link href={`${basePath}/${country.id}/edit`}>
                              <DropdownItem>
                                 <PencilIcon className="w-5" />
                                 <span className="inline-block">Edit</span>
                              </DropdownItem>
                           </Link>
                           <DeleteCountry token={token} id={country.id} />
                        </Dropdown>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   )
}

export default CountryTable