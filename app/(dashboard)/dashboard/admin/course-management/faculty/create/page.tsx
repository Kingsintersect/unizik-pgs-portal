import CreateFaculty from '@/components/ui/admin/faculty/CreateFaculty';
import { Breadcrumbs } from '@/components/ui/application/BreadCrumbs';
import { verifySession } from '@/lib/dal';

const Page = async ({ params }: { params: { id: string } }) => {
   const id = params.id;
   const session = await verifySession();

   return (
      <main className='space-y-10'>
         <Breadcrumbs
            breadcrumbs={[
               { label: 'dashboard', href: '/dashboard/admin' },
               {
                  label: 'List Faculty',
                  href: `/dashboard/admin/course-management/faculty`,
               },
               {
                  label: 'Create New Faculty',
                  href: `/dashboard/admin/course-management/faculty/create`,
                  active: true,
               },
            ]}
         />
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateFaculty token={session.token} />
         </div>
      </main>
   )
}

export default Page