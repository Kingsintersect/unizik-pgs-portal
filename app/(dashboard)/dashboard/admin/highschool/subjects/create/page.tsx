import { verifySession } from '@/lib/server.utils';
import CreateClassSubject from '../components/CreateClassSubject';
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import { loginSessionKey } from '@/lib/definitions';

export const dynamic = "force-dynamic";
const Page = async () => {
   const session = await verifySession(loginSessionKey);

   const breadcrumbItems = [
      { label: 'dashboard', href: '/dashboard/admin' },
      {
         label: 'List Class Subjects',
         href: `/dashboard/admin/highschool/subjects`,
      },
      {
         label: 'Create New Subjects',
         href: `/dashboard/admin/highschool/subjects/create`,
         active: true,
      },
   ];

   return (
      <main className='space-y-10'>
         <div className="p-6">
            <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateClassSubject token={session.token} />
         </div>
      </main>
   )
}

export default Page