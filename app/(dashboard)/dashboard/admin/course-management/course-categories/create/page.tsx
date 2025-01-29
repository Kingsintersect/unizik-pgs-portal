import { GetListOfDepartments, GetListOfFaculties } from '@/app/actions/server.admin';
import CreateCourseCategories from '@/components/ui/admin/courseCategories/CreateCategoryCourse';
import { Breadcrumbs } from '@/components/ui/application/BreadCrumbs'
import { Semesters, StudyLevels } from '@/config';
import { verifySession } from '@/lib/dal';
import { notFound } from 'next/navigation';
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
   const id = params.id;
   const session = await verifySession();

   const [faculty]: any = await Promise.all([
      GetListOfFaculties(),
   ]);
   const studyLevels = StudyLevels;
   const semesters = Semesters;

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
                  href: `/dashboard/admin/course-management/course-categories`,
               },
               {
                  label: 'Create New Course',
                  href: `/dashboard/admin/course-management/course-categories/create`,
                  active: true,
               },
            ]}
         />
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateCourseCategories faculty={faculty.success.data} studyLevels={studyLevels} semesters={semesters} token={session.token} />
         </div>
      </main>
   )
}

export default page