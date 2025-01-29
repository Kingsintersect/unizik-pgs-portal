import { baseUrl } from '@/config';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Dropdown, DropdownItem } from 'flowbite-react';
import Link from 'next/link';
import React from 'react'
import { GetListOfStates } from '@/app/actions/server.admin';
import { notify } from '@/contexts/ToastProvider';
import { DeleteState } from './StateButtons';

const StateTable = async ({ slug, token }: { slug: any, token: string }) => {
   const basePath = `${baseUrl}/dashboard/admin/region/states`;
   const { error, success }: any = await new Promise((resolve) => resolve(GetListOfStates(token)));
   if (error) notify({ message: "Their was an error trying to get Department list", variant: "error", timeout: 5000 });
   const ascendingData = [...success.data].sort((a, b) => a.id - b.id);
   const descendingData = [...success.data].sort((a, b) => b.id - a.id);

   return (
      <div className="overflow-x-auto">
         <Table hoverable>
            <TableHead>
               <TableHeadCell>Id</TableHeadCell>
               <TableHeadCell>Name</TableHeadCell>
               <TableHeadCell className='text-cyan-600'>
                  Actions
                  <span className="sr-only">Actions</span>
               </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
               {descendingData.map((state: any, i: any) => (
                  <TableRow key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                     <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {++i}
                     </TableCell>
                     <TableCell>{state.name}</TableCell>
                     <TableCell className='text-cyan-600'>
                        <Dropdown label={`Expand`} inline size={`lg`} className="">
                           <Link href={`${basePath}/${state.id}/edit?parent=${state.parent}`}>
                              <DropdownItem>
                                 <PencilIcon className="w-5" />
                                 <span className="inline-block">Edit</span>
                              </DropdownItem>
                           </Link>
                           <DeleteState token={token} id={state.id} />
                        </Dropdown>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   )
}

export default StateTable