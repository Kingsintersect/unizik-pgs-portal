import React, { ReactNode } from 'react'

const PageWrapper = ({ children }: { children: ReactNode }) => {
   return (
      <div className='flex flex-col pt-2 px-4 space-y-2 bg-zinc-100 flex-grow pb-10'>
         {children}
      </div>
   )
}

export default PageWrapper