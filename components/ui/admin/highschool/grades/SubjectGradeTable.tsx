import { PencilIcon } from '@heroicons/react/24/outline'
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Dropdown, DropdownItem } from 'flowbite-react'
import Link from 'next/link'
import { baseUrl } from '@/config'
import { GetListOfSubjectGrade } from '@/app/actions/server.admin'
import { notify } from '@/contexts/ToastProvider'
import { DeleteSubjectGrade } from './SubjectGradeButtons'

const SubjectGradeTable = async ({ slug, token }: { slug: any, token: string }) => {
   const basePath = `${baseUrl}/dashboard/admin/highschool/grades`;
   const { error, success }: any = await new Promise((resolve) => resolve(GetListOfSubjectGrade()));
   if (error) notify({ message: "Their was an error trying to get SubjectvGrade list", variant: "error", timeout: 5000 });
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
                  <span className="sr-only">Actions</span>
               </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
               {descendingData.map((grade: any, i: any) => (
                  <TableRow key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                     <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {++i}
                     </TableCell>
                     <TableCell>{grade.name}</TableCell>
                     <TableCell className='text-cyan-600'>
                        <Dropdown label={`Expand`} inline size={`lg`} className="">
                           <Link href={`${basePath}/${grade.id}/edit`}>
                              <DropdownItem>
                                 <PencilIcon className="w-5" />
                                 <span className="inline-block">Edit</span>
                              </DropdownItem>
                           </Link>
                           <DeleteSubjectGrade token={token} id={grade.id} />
                        </Dropdown>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   )
}

export default SubjectGradeTable