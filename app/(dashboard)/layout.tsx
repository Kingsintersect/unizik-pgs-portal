import GetUser from "@/components/ui/application/GetUser"
import Header from "@/components/ui/dashboard/Header"
import HeaderMobile from "@/components/ui/dashboard/HeaderMobile"
import MarginWidthWrapper from "@/components/ui/dashboard/MarginWidthWrapper"
import PageWrapper from "@/components/ui/dashboard/PageWrapper"
import SideNav from "@/components/ui/dashboard/SideNav"
import { ADMIN_SIDENAV_ITEMS, STUDENT_SIDENAV_ITEMS } from "@/config"
import { getSession } from "@/lib/session"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "ESUT - Dashboard",
  description: "Dashboard Overview",
};

const layout = async ({ children }: { children: React.ReactNode }) => {
   const session = await getSession("session");
   if (!session) {
      console.log('not logged in daashboard layout')
      redirect("/auth/student");
      return;
   }
   const MobileMenuItems: any[] = session?.role === "admin" ? ADMIN_SIDENAV_ITEMS : STUDENT_SIDENAV_ITEMS;

   /**
    * REMOVE THE NEXT LINE AND UNCOMMENT THE ABOVE LINES OF CODE
    */
   // const MobileMenuItems: any[] = ADMIN_SIDENAV_ITEMS ;
   return (
      <div className='bg-white'>
         <Suspense fallback={<div></div>}><GetUser /></Suspense>
         <div className="flex">
            <SideNav MenuData={MobileMenuItems} />
            <main className='flex-1'>
               <MarginWidthWrapper>
                  <Header />
                  <HeaderMobile MenuData={MobileMenuItems} />
                  <PageWrapper>{children}</PageWrapper>
               </MarginWidthWrapper>
            </main>
         </div>
      </div>
   )
}

export default layout