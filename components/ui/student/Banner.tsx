import React from 'react'
import AppLogo from '../application/AppLogo'

const Banner = () => {
   return (
      <div className="container flex flex-col">
         <div className="header flex items-center gap-7 px-[10%] h-[180px] bg-gray-200">
            <AppLogo
               image_url={'/logo/logo.svg'}
               logo_text_style='text-orange-800 font-bold text-2xl'
               logo_text={'UNIZIK-PG-COLLEGE-PORTAL'}
               Img_container_style='w-32 h-32'
            />
         </div>
      </div>
   )
}

export default Banner