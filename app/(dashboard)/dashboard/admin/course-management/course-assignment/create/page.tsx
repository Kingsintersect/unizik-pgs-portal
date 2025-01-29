import { GetListOfCourseCategories, GetListOfCourses } from '@/app/actions/server.admin';
import CreateCourseAssignment from '@/components/ui/admin/courseAssignment/CreateCourseAssignment';
import { Breadcrumbs } from '@/components/ui/application/BreadCrumbs'
import { baseUrl } from '@/config';
import { verifySession } from '@/lib/dal';
import { notFound } from 'next/navigation';
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
   const basePath = `${baseUrl}/dashboard/admin/course-management/course-assignment`;
   const id = params.id;
   const session = await verifySession();

   const [courses, courseCategory]: any = await Promise.all([
      GetListOfCourses(session.token),
      GetListOfCourseCategories(session.token),
   ]);
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
                  href: `/dashboard/admin/course-management/course-assignment`,
               },
               {
                  label: 'Create New Course',
                  href: `/dashboard/admin/course-management/course-assignment/create`,
                  active: true,
               },
            ]}
         />
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateCourseAssignment basePath={basePath} courses={courses.success.data} courseCategory={courseCategory.success.data} token={session.token} />
         </div>
      </main>
   )
}

export default page