import { GetListOfFaculties } from '@/app/actions/server.admin';
import CreateDeparment from '@/app/(dashboard)/dashboard/admin/course-management/department/components/CreateDeparment';
import { verifySession } from '@/lib/server.utils';
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import { loginSessionKey } from '@/lib/definitions';

export const dynamic = "force-dynamic";

const Page = async () => {
   const session = await verifySession(loginSessionKey);
   const { error, success }: any = await new Promise((resolve) => resolve(GetListOfFaculties()));

   const breadcrumbItems = [
      { label: 'dashboard', href: '/dashboard/admin' },
      {
         label: 'List Department',
         href: `/dashboard/admin/course-management/department`,
      },
      {
         label: 'Create New Department',
         href: `/dashboard/admin/course-management/department/create`,
         active: true,
      },
   ];

   return (
      <main className='space-y-10'>
         <div className="p-6">
            {/* {breadcrumbItems && <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />} */}
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateDeparment faculties={success.data} token={session.token} />
         </div>
      </main>
   )
}

export default Page