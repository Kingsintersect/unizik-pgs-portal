   import Header from '@/components/Header';
   import AppLogo from '@/components/ui/application/AppLogo';
   import { Section } from '@/components/ui/application/sections/Section';
   import { Metadata, NextPage } from 'next';
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
                        <div className="md:basis-2/6 hidden md:block">
                           <div className="flex items-center h-full justify-center">
                              <AppLogo image_url={'/logo/logo.svg'} classList='' Img_container_style='w-52 h-52' />
                           </div>
                        </div>
                        <div className="w-full sm:basis-3/3 md:basis-4/6 bg-white">
                           <div className="flex flex-col items-center justify-center h-full px-7 sm:px-5 md:px-52">
                              
                              {/* <div className="w-full mb-10 space-y-4 text-left">
                                 <h1 className="text-5xl	font-bold text-[#23628d]">
                                    CREATE AN ACCOUNT
                                 </h1>
                                 <p className="text-lg text-[#d35401]">Please sign-in to your account for more adventure</p>
                              </div> */}
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