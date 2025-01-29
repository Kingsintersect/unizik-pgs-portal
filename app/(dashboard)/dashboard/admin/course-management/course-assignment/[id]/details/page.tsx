import { GetCoursesAssignedToACategory, GetListOfCourseCategories, GetListOfCourses } from '@/app/actions/server.admin';
import UpdateCourseAssignment from '@/components/ui/admin/courseAssignment/UpdateCourseAssignment';
import { Breadcrumbs } from '@/components/ui/application/BreadCrumbs';
import { baseUrl } from '@/config';
import { verifySession } from '@/lib/dal';
import { notFound } from 'next/navigation';
import React from 'react';

const page = async ({ params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string } }) => {
   const basePath = `${baseUrl}/dashboard/admin/course-management/course-assignment`;
   const { facultyId, departmentId } = searchParams;
   const id = params.id;
   const session = await verifySession();

   const [courses, courseCategory, courseAssingnments]: any = await Promise.all([
      GetListOfCourses(session.token),
      GetListOfCourseCategories(session.token),
      GetCoursesAssignedToACategory(id, session.token),
   ]);

   return (
      <main className='space-y-10'>
         <Breadcrumbs
            breadcrumbs={[
               { label: 'dashboard', href: '/dashboard/admin' },
               {
                  label: 'List Course Assignments',
                  href: `/dashboard/admin/course-management/course-assignment`,
               },
               {
                  label: 'Edit Course Assignment',
                  href: `/dashboard/admin/course-management/course-assignment/${id}/edit`,
                  active: true,
               },
            ]}
         />
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <UpdateCourseAssignment
               basePath={basePath}
               courses={courses.success.data}
               courseCategory={courseCategory.success.data}
               courseAssingnments={courseAssingnments.success.data}
               selectedCategoryId={id}
               token={session.token}
            />
         </div>
      </main>
   )
}

export default page