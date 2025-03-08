import { GetListOfFaculties } from '@/app/actions/server.admin';
import CreateCourseCategories from '@/app/(dashboard)/dashboard/admin/course-management/course-categories/components/CreateCategoryCourse';
import { Semesters, StudyLevels } from '@/config';
import { verifySession } from '@/lib/server.utils';
import React from 'react';
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import { loginSessionKey } from '@/lib/definitions';
import { GetAllProgram } from '@/app/actions/faculty.api';

export const dynamic = "force-dynamic";

const page = async ({ params }: { params: { id: string } }) => {
   const id = params.id;
   const session = await verifySession(loginSessionKey);

   const [program, faculty]: any = await Promise.all([
      GetAllProgram(),
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
            {/* {breadcrumbItems && <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />} */}
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateCourseCategories
               faculties={faculty.success.data ?? []}
               studyLevels={studyLevels ?? []}
               semesters={semesters ?? []}
               token={session.token}
               programs={program.success.data ?? []}
            />
         </div>
      </main>
   )
}

export default page