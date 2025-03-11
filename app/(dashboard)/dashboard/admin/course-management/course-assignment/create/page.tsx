import { GetListOfCourseCategories, GetListOfCourses } from '@/app/actions/server.admin';
import { baseUrl } from '@/config';
import { verifySession } from '@/lib/server.utils';
import { notFound } from 'next/navigation';
import React from 'react'
import CreateCourseAssignment from '../components/CreateCourseAssignment';
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import { loginSessionKey } from '@/lib/definitions';

export const dynamic = "force-dynamic";

const page = async () => {
   const basePath = `${baseUrl}/dashboard/admin/course-management/course-assignment`;
   const session = await verifySession(loginSessionKey);

   const [courses, courseCategory]: any = await Promise.all([
      GetListOfCourses(session.token),
      GetListOfCourseCategories(session.token),
   ]);
   // if (!success) {
   //    notFound();
   // }

   const breadcrumbItems = [
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
   ];

   return (
      <main className='space-y-10'>
         <div className="p-6">
            {/* {breadcrumbItems && <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />} */}
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateCourseAssignment basePath={basePath} courses={courses.success.data ?? []} courseCategory={courseCategory.success.data?? []} token={session.token} />
         </div>
      </main>
   )
}

export default page