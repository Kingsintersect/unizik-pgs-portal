import { GetListOfDepartments, GetListOfFaculties, GetSingleCourse, GetSingleCourseCategory } from '@/app/actions/server.admin';
import UpdateCourseCategory from '@/app/(dashboard)/dashboard/admin/course-management/course-categories/components/UpdateCategoryCourse';
import { StudyLevels, Semesters } from '@/config';
import { verifySession } from '@/lib/server.utils';
import React from 'react'
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import { loginSessionKey } from '@/lib/definitions';


const page = async ({ params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string | string[] } }) => {
   const { facultyId, departmentId } = searchParams;
   const id = params.id;
   const session = await verifySession(loginSessionKey);

   const [courseCategory, faculty, department]: any = await Promise.all([
      GetSingleCourseCategory(id, session.token),
      GetListOfFaculties(),
      GetListOfDepartments(),
   ]);

   const studyLevels = StudyLevels;
   const semesters = Semesters;

   const breadcrumbItems = [
      { label: 'dashboard', href: '/dashboard/admin' },
      {
         label: 'List Courses',
         href: `/dashboard/admin/course-management/course-categories`,
      },
      {
         label: 'Edit Course',
         href: `/dashboard/admin/course-management/course-categories/${id}/edit`,
         active: true,
      },
   ];

   return (
      <main className='space-y-10'>
         <div className="p-6">
            <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <UpdateCourseCategory
               courseCategory={courseCategory.success.data}
               faculty={faculty.success.data}
               department={department.success.data}
               studyLevels={studyLevels}
               semesters={semesters}
               token={session.token}
            />
         </div>
      </main>
   )
}

export default page