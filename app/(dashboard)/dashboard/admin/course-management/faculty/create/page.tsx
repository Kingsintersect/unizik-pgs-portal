import { verifySession } from '@/lib/server.utils';
import CreateFaculty from '../components/CreateFaculty';
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import { loginSessionKey } from '@/lib/definitions';

export const dynamic = "force-dynamic";

const Page = async ({ params }: { params: { id: string } }) => {
   const id = params.id;
   const session = await verifySession(loginSessionKey);

   const breadcrumbItems = [
      {label: 'dashboard', href: '/dashboard/admin' },
      {
         label: 'List Faculty',
         href: `/dashboard/admin/course-management/faculty`,
      },
      {
         label: 'Create New Faculty',
         href: `/dashboard/admin/course-management/faculty/create`,
         active: true,
      },
   ];

   return (
      <main className='space-y-10'>
         <div className="p-6">
            <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateFaculty token={session.token} />
         </div>
      </main>
   )
}

export default Page