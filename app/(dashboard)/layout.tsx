import Header from "@/components/ui/dashboard/Header"
import HeaderMobile from "@/components/ui/dashboard/HeaderMobile"
import MarginWidthWrapper from "@/components/ui/dashboard/MarginWidthWrapper"
import PageWrapper from "@/components/ui/dashboard/PageWrapper"
import SideNav from "@/components/ui/dashboard/SideNav"
import { ADMIN_SIDENAV_ITEMS, STUDENT_SIDENAV_ITEMS } from "@/config"
import { Metadata } from "next"
import { Roles } from "./dashboard/admin/users/users.types"
import { loginSessionKey } from "@/lib/definitions"
import { verifySession } from "@/lib/server.utils"

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "UNIZIK-PG-STUDIES - Dashboard",
  description: "Dashboard Overview",
};

const layout = async ({ children }: { children: React.ReactNode }) => {
   const session = await verifySession(loginSessionKey);
   const MobileMenuItems: any[] = session?.role === Roles.ADMIN ? ADMIN_SIDENAV_ITEMS : STUDENT_SIDENAV_ITEMS;
   
   return (
         <div className='bg-white'>
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