import { GetSingleCourse } from '@/app/actions/server.admin';
import UpdateCourse from '@/components/ui/admin/courses/UpdateCourse';
import { Breadcrumbs } from '@/components/ui/application/BreadCrumbs';
import { CreditLoads } from '@/config';
import { verifySession } from '@/lib/dal';
import { notFound } from 'next/navigation';
import React from 'react'

const page = async ({ params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string } }) => {
   const id = params.id;
   const { parent } = searchParams;
   const session = await verifySession();
   const [course]: any = await Promise.all([
      GetSingleCourse(id, session.token),
   ]);

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
                  label: 'Edit Course',
                  href: `/dashboard/admin/course-management/courses/${id}/edit`,
                  active: true,
               },
            ]}
         />
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <UpdateCourse course={course.success.data} token={session.token} />
         </div>
      </main>
   )
}

export default page