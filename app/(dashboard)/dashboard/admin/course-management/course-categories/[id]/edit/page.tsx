import { GetListOfDepartments, GetListOfFaculties, GetSingleCourse, GetSingleCourseCategory } from '@/app/actions/server.admin';
import UpdateCourseCategory from '@/app/(dashboard)/dashboard/admin/course-management/course-categories/components/UpdateCategoryCourse';
import { StudyLevels, Semesters } from '@/config';
import { verifySession } from '@/lib/server.utils';
import React from 'react'
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import { loginSessionKey } from '@/lib/definitions';
import { GetAllProgram } from '@/app/actions/faculty.api';

export const dynamic = "force-dynamic";

const page = async ({ params }: { params: { id: string } }) => {
   const id = params.id;
   const session = await verifySession(loginSessionKey);

   const [courseCategory, program, faculty, departments]: any = await Promise.all([
      GetSingleCourseCategory(id, session.token),
      GetAllProgram(),
      GetListOfFaculties(),
      GetListOfDepartments(),
   ]);
   const facultyId = courseCategory.success.data.faculty_id; 
   const filteredDepartments = departments.success.data.filter((dept: any) => dept.faculty_id === facultyId);

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
            {/* {breadcrumbItems && <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />} */}
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <UpdateCourseCategory
               courseCategory={courseCategory.success.data}
               faculties={faculty.success.data}
               departments={filteredDepartments}
               // departments={department.success.data}
               studyLevels={studyLevels}
               semesters={semesters}
               token={session.token}
               programs={program.success.data ?? []}
            />
         </div>
      </main>
   )
}

export default page