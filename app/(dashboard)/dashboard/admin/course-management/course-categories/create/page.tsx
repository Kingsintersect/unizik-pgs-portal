import { GetListOfFaculties } from '@/app/actions/server.admin';
import CreateCourseCategories from '@/app/(dashboard)/dashboard/admin/course-management/course-categories/components/CreateCategoryCourse';
import { Semesters, StudyLevels } from '@/config';
import { verifySession } from '@/lib/server.utils';
import { notFound } from 'next/navigation';
import React from 'react'
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import { loginSessionKey } from '@/lib/definitions';


const page = async ({ params }: { params: { id: string } }) => {
   const id = params.id;
   const session = await verifySession(loginSessionKey);

   const [faculty]: any = await Promise.all([
      GetListOfFaculties(),
   ]);
   const studyLevels = StudyLevels;
   const semesters = Semesters;

   // if (!success) {
   //    notFound();
   // }
   const breadcrumbItems = [
      { label: 'dashboard', href: '/dashboard/admin' },
      {
         label: 'List Courses',
         href: `/dashboard/admin/course-management/course-categories`,
      },
      {
         label: 'Create New Course',
         href: `/dashboard/admin/course-management/course-categories/create`,
         active: true,
      },
   ];

   return (
      <main className='space-y-10'>
         <div className="p-6">
            <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateCourseCategories faculty={faculty.success.data} studyLevels={studyLevels} semesters={semesters} token={session.token} />
         </div>
      </main>
   )
}

export default page