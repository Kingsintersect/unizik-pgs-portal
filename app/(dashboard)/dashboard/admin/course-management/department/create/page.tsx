import { GetListOfFaculties } from '@/app/actions/server.admin';
import CreateDeparment from '@/components/ui/admin/department/CreateDeparment';
import { Breadcrumbs } from '@/components/ui/application/BreadCrumbs';
import { verifySession } from '@/lib/dal';

const Page = async ({ params }: { params: { id: string } }) => {
   const id = params.id;
   const session = await verifySession();
   const { error, success }: any = await new Promise((resolve) => resolve(GetListOfFaculties()));

   return (
      <main className='space-y-10'>
         <Breadcrumbs
            breadcrumbs={[
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
            ]}
         />
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateDeparment faculty={success.data} token={session.token} />
         </div>
      </main>
   )
}

export default Page