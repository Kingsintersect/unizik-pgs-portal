import CreateCourse from '@/components/ui/admin/courses/CreateCourse'
import { Breadcrumbs } from '@/components/ui/application/BreadCrumbs'
import { verifySession } from '@/lib/dal';
import { notFound } from 'next/navigation';
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
   const id = params.id;
   const session = await verifySession();

   // if (!success) {
   //    notFound();
   // }

   return (
      <main className='space-y-10'>
         <Breadcrumbs
            breadcrumbs={[
               { label: 'dashboard', href: '/dashboard/admin' },
               {
                  label: 'List Courses',
                  href: `/dashboard/admin/course-management/courses`,
               },
               {
                  label: 'Create New Course',
                  href: `/dashboard/admin/course-management/courses/create`,
                  active: true,
               },
            ]}
         />
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateCourse token={session.token} />
         </div>
      </main>
   )
}

export default page