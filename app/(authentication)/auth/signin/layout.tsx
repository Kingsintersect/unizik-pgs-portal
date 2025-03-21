import Header from '@/components/Header';
import AppLogo from '@/components/ui/application/AppLogo';
import { Section } from '@/components/ui/application/sections/Section';
import { Metadata, NextPage } from 'next';
import Link from 'next/link';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "UNIZIK-PG-STUDIES - Login Form",
  description: "Login to your dashboard to continue your education",
};

type LayoutProps = {
   children: ReactNode
}

const Layout: NextPage<LayoutProps> = ({ children }: LayoutProps) => {

   return (
      <main className='account'>
         <Header/>
         <div className="account-container">
            <div className="wrapper bg-[#efb5a2]">
               <Section classList='mx-0 p-0 h-screen text-black bg-gray-200' title={''}>
                     <div className="flex h-full">
                     <div className="md:basis-2/3 hidden md:block">
                        <div className="flex items-center h-full justify-center">
                           <AppLogo image_url={'/logo/logo.svg'} classList='' Img_container_style='w-52 h-52' />
                        </div>
                     </div>
                     <div className="w-full sm:basis-3/3 md:basis-1/3 bg-white">
                        <div className="flex flex-col items-center justify-center h-full px-7 sm:px-5 md:px-10">
                           <div className="w-full mb-10 space-y-4 text-left">
                              <h1 className="text-5xl	font-bold text-[#23628d]">
                                 LOGIN
                              </h1>
                              <p className="text-lg text-[#d35401]">Please sign-in to your account for more adventure</p>
                           </div>
                           {children}
                           <div className="w-full text-start mt-10">
                              New on our platform? 
                              <Link href={"/auth/signup"} className="text-orange-500 font-semibold"> Create an account</Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </Section>
            </div>
         </div>
      </main>
   )
}

export default Layout