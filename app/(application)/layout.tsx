import Header from '@/components/Header';
import { AdmissionProvider } from '@/contexts/AdmissionContext'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "ESUT - Purchase Admission Form",
  description: "Fill the form below to purchace admission form",
};

const Layout = ({ children }: { children: ReactNode }) => {
   return (
      <AdmissionProvider>
         <main className='account'>
            <div className="account-container">
               <div className="wrapper bg-[#efb5a2]">
                  <Header/>
                  {children}
               </div>
            </div>
         </main>
      </AdmissionProvider>
   )
}

export default Layout