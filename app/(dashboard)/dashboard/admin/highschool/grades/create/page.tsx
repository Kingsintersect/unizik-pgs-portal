import { verifySession } from '@/lib/server.utils';
import React from 'react'
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import CreateSubjectGrade from '../components/CreateSubjectGrade';
import { loginSessionKey } from '@/lib/definitions';


const page = async ({ params }: { params: { id: string } }) => {
   const id = params.id;
   const session = await verifySession(loginSessionKey);
   
   const breadcrumbItems = [
      { label: 'dashboard', href: '/dashboard/admin' },
      {
         label: 'List Subject Grades',
         href: `/dashboard/admin/highschool/grades`,
      },
      {
         label: 'Create New Subject Grade',
         href: `/dashboard/admin/highschool/grades/create`,
         active: true,
      },
   ];

   return (
      <main className='space-y-10'>
         <div className="p-6">
            <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateSubjectGrade token={session.token} />
         </div>
      </main>
   )
}

export default page