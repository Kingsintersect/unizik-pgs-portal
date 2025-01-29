import { PencilIcon } from '@heroicons/react/24/outline'
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Dropdown, DropdownItem } from 'flowbite-react'
import Link from 'next/link'
import { baseUrl } from '@/config'
import { GetListOfClassSubjects } from '@/app/actions/server.admin'
import { notify } from '@/contexts/ToastProvider'
import { DeleteClassSubject } from './ClassSubjectsButtons'

const SubjectTable = async ({ slug, token }: { slug: any, token: string }) => {
   const basePath = `${baseUrl}/dashboard/admin/highschool/subjects`;
   const { error, success }: any = await new Promise((resolve) => resolve(GetListOfClassSubjects()));
   if (error) notify({ message: "Their was an error trying to get Subject list", variant: "error", timeout: 5000 });
   const ascendingData = [...success].sort((a, b) => a.id - b.id);
   const descendingData = [...success].sort((a, b) => b.id - a.id);

   return (
      <div className="overflow-x-auto">
         <Table hoverable>
            <TableHead>
               <TableHeadCell>Id</TableHeadCell>
               <TableHeadCell>Title</TableHeadCell>
               <TableHeadCell className='text-cyan-600'>
                  Actions
                  <span className="sr-only">Edit</span>
               </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
               {descendingData.map((subject: any, i: any) => (
                  <TableRow key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                     <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {++i}
                     </TableCell>
                     <TableCell>{subject.name}</TableCell>
                     <TableCell className='text-cyan-600'>
                        <Dropdown label={`Expand`} inline size={`lg`} className="">
                           <Link href={`${basePath}/${subject.id}/edit`}>
                              <DropdownItem>
                                 <PencilIcon className="w-5" />
                                 <span className="inline-block">Edit</span>
                              </DropdownItem>
                           </Link>
                           <DeleteClassSubject token={token} id={subject.id} />
                        </Dropdown>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   )
}

export default SubjectTable