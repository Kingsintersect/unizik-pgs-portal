import { GetListOfDepartments, GetListOfFaculties, GetSingleCourse, GetSingleCourseCategory } from '@/app/actions/server.admin';
import UpdateCourseCategory from '@/components/ui/admin/courseCategories/UpdateCategoryCourse';
import { Breadcrumbs } from '@/components/ui/application/BreadCrumbs';
import { StudyLevels, Semesters } from '@/config';
import { verifySession } from '@/lib/dal';
import { notFound } from 'next/navigation';
import React from 'react'

const page = async ({ params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string } }) => {
   const { facultyId, departmentId } = searchParams;
   const id = params.id;
   const session = await verifySession();

   const [courseCategory, faculty, department]: any = await Promise.all([
      GetSingleCourseCategory(id, session.token),
      GetListOfFaculties(),
      GetListOfDepartments(),
   ]);

   const studyLevels = StudyLevels;
   const semesters = Semesters;

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
                  label: 'Edit Course',
                  href: `/dashboard/admin/course-management/course-categories/${id}/edit`,
                  active: true,
               },
            ]}
         />
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