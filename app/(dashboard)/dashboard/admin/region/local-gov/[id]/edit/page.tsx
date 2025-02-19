import { GetListOfStates, GetSingleLocalGov } from '@/app/actions/server.admin';
import { verifySession } from '@/lib/server.utils';
import React from 'react'
import UpdateLocalGov from '../../components/UpdateLocalGov';
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import { loginSessionKey } from '@/lib/definitions';

export const dynamic = "force-dynamic";

const page = async ({ params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string } }) => {
   const id = params.id;
   const { parent } = searchParams;
   const session = await verifySession(loginSessionKey);
   const [state, localGov]: any = await Promise.all([
      GetListOfStates(session.token),
      GetSingleLocalGov(id, parent, session.token),
   ]);

   const breadcrumbItems = [
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
   ];

   return (
      <main className='space-y-10'>
         <div className="p-6">
            <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <UpdateLocalGov parent={parent} state={state.success.data} token={session.token} localGov={localGov.success.data} />
         </div>
      </main>
   )
}

export default page