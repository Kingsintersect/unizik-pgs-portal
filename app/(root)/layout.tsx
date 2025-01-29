import Header from '@/components/Header'
import React, { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
   return (
      <main className='root'>
         <div className="root-container">
            <div className="wrapper">
               <Header/>
               {children}
            </div>
         </div>
      </main>
   )
}

export default Layout