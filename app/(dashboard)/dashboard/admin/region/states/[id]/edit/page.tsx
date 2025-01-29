import { GetListOfCountries, GetSingleState } from '@/app/actions/server.admin';
import UpdateState from '@/components/ui/admin/state/UpdateState';
import { Breadcrumbs } from '@/components/ui/application/BreadCrumbs'
import { verifySession } from '@/lib/dal';
import React from 'react'

const page = async ({ params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string } }) => {
   const id = params.id;
   const { parent } = searchParams;
   const session = await verifySession();
   const [country, state]: any = await Promise.all([
      GetListOfCountries(),
      GetSingleState(id, session.token),
   ]);
   return (
      <main className='space-y-10'>
         <Breadcrumbs
            breadcrumbs={[
               { label: 'dashboard', href: '/dashboard/admin' },
               {
                  label: 'List States',
                  href: `/dashboard/admin/region/states`,
               },
               {
                  label: 'Update country',
                  href: `/dashboard/admin/region/states/${id}/edit`,
                  active: true,
               },
            ]}
         />
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <UpdateState parent={parent} country={country.success} token={session.token} state={state.success.data} />
         </div>
      </main>
   )
}

export default page