import CreateClassSubject from '@/components/ui/admin/highschool/CreateClassSubject';
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
                  label: 'List Class Subjects',
                  href: `/dashboard/admin/highschool/subjects`,
               },
               {
                  label: 'Create New Subjects',
                  href: `/dashboard/admin/highschool/subjects/create`,
                  active: true,
               },
            ]}
         />
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateClassSubject token={session.token} />
         </div>
      </main>
   )
}

export default Page