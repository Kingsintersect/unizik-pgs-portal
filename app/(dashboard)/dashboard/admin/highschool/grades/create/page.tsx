import CreateSubjectGrade from '@/components/ui/admin/highschool/grades/CreateSubjectGrade';
import { Breadcrumbs } from '@/components/ui/application/BreadCrumbs'
import { verifySession } from '@/lib/dal';
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
   const id = params.id;
   const session = await verifySession();

   return (
      <main className='space-y-10'>
         <Breadcrumbs
            breadcrumbs={[
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
            ]}
         />
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateSubjectGrade token={session.token} />
         </div>
      </main>
   )
}

export default page