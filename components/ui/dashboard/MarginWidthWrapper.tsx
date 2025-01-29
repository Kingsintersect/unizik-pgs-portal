import React, { ReactNode } from 'react'

const MarginWidthWrapper = ({ children }: { children: ReactNode }) => {
   return (
      <div className='flex flex-col md:ml-64 sm:border-r sm:border-zinc-700 min-h-screen'>
         {children}
      </div>
   )
}

export default MarginWidthWrapper