   import Header from '@/components/Header';
   import AppLogo from '@/components/ui/application/AppLogo';
   import { Section } from '@/components/ui/application/sections/Section';
   import { Metadata, NextPage } from 'next';
import Link from 'next/link';
   import React, { ReactNode } from 'react'

   export const metadata: Metadata = {
   title: "UNIZIK-PG-STUDIES - Signup | Register Form",
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
                        <div className="md:basis-2/6 hidden md:block bg-gradient-to-br from-[#efb5a2]  from-10% to-[#23628d]  to-90%">
                           <div className="flex items-center h-full justify-center">
                              <AppLogo image_url={'/logo/logo.svg'} classList='' Img_container_style='w-52 h-52' />
                           </div>
                        </div>
                        <div className="w-full sm:basis-3/3 md:basis-4/6 bg-white">
                           <div className="flex flex-col items-center justify-center h-full px-7 sm:px-10 md:px-20 lg:px-32">
                              <div className="w-full text-start mb-10 font-bold text-xl space-x-3 text-[#23628d]">
                                 <span>Have an account ?</span>
                                 <Link href={"/auth/signin"} className="text-orange-500 font-semibold"> Please signin</Link>
                              </div>
                              {children}
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