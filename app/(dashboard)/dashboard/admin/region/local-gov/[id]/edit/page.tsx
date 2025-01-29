import { GetListOfStates, GetSingleLocalGov } from '@/app/actions/server.admin';
import UpdateLocalGov from '@/components/ui/admin/localgov/UpdateLocalGov';
import { Breadcrumbs } from '@/components/ui/application/BreadCrumbs'
import { verifySession } from '@/lib/dal';
import React from 'react'

const page = async ({ params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string } }) => {
   const id = params.id;
   const { parent } = searchParams;
   const session = await verifySession();
   const [state, localGov]: any = await Promise.all([
      GetListOfStates(session.token),
      GetSingleLocalGov(id, parent, session.token),
   ]);

   return (
      <main className='space-y-10'>
         <Breadcrumbs
            breadcrumbs={[
               { label: 'dashboard', href: '/dashboard/admin' },
               {
                  label: 'List Local Gov',
                  href: `/dashboard/admin/region/local-gov`,
               },
               {
                  label: 'Update Local Gov',
                  href: `/dashboard/admin/region/local-gov/${id}/edit`,
                  active: true,
               },
            ]}
         />
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <UpdateLocalGov parent={parent} state={state.success.data} token={session.token} localGov={localGov.success.data} />
         </div>
      </main>
   )
}

export default page