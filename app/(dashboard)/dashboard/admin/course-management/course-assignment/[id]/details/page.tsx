import { GetCoursesAssignedToACategory, GetListOfCourseCategories, GetListOfCourses } from '@/app/actions/server.admin';
import { baseUrl } from '@/config';
import { verifySession } from '@/lib/server.utils';
import React from 'react';
import UpdateCourseAssignment from '../../components/UpdateCourseAssignment';
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import { loginSessionKey } from '@/lib/definitions';
import NotFound from '../not-found';

export const dynamic = "force-dynamic";
    
const page = async ({ params }: { params: { id: string } }) => {
   const basePath = `${baseUrl}/dashboard/admin/course-management/course-assignment`;
   const id = params.id;
   const session = await verifySession(loginSessionKey);

   const [courses, courseCategory, courseAssingnments]: any = await Promise.all([
      GetListOfCourses(session.token),
      GetListOfCourseCategories(session.token),
      GetCoursesAssignedToACategory(id, session.token),
   ]);

   const breadcrumbItems = [
      { href: "/dashboard/admin", label: "Dashboard" },
      { href: "/dashboard/admin/course-management/course-assignment", label: "Course Assignments" },
      { href: `/dashboard/admin/course-management/course-assignment/${id}/edit`, label: "Edit Course Assignment" },
   ];

   if (!courseAssingnments.success) {
      return <NotFound />
   }

   return (
      <main className='space-y-10'>
         <div className="p-6">
            {/* {breadcrumbItems && <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />} */}
        </div>
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