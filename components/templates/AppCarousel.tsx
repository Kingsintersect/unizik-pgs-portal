"use client";
import cn from '@/lib/cn'
import { Button, Carousel } from 'flowbite-react'
import Link from 'next/link';
import React from 'react'
import { HiOutlineArrowRight } from "react-icons/hi";

const AppCarousel = ({ classList }: { classList?: string }) => {
   return (
      <div className={cn(`relative`, classList)}>
         <Carousel className='h-screen rounded-none' slide={false} leftControl="-" rightControl="-">
            <div className="relative h-full bg-gray-400 dark:bg-gray-700 dark:text-white bg-[url('/bg/classroom3.jpg')] bg-cover">
               <div className="absolute bottom-0 top-0 right-0 left-0 bg-black/80">
                  <div className="h-full flex flex-row justify-start items-center px-10">
                     <div className="basis-full md:basis-2/3 px-7 space-y-8">
                        <h1 className="w-full text-gray-400 text-center text-4xl md:text-left md:text-7xl">ESUT student portal</h1>
                        <p className="font-light text-xl tracking-widest leading-loose text-center md:text-lg md:text-left md:w-1/2 text-white">Giving you the best experience as you study.
                           Beautifully designed, expertly crafted components and templates, built by the makers of Tailwind CSS. The perfect starting point for your next project.
                        </p>
                        <div className="flex items-center justify-start gap-16">
                           <Link href="/auth/student">
                              <Button className='bg-orange-800'>Login to continue</Button>
                           </Link>
                           <Link href="/admission/application" className="animate-bounce">
                              <Button className='hover:bg-orange-800 flex items-center gap-10' >
                                 <div className="">Apply for admission</div>
                                 <HiOutlineArrowRight className="h-5 w-5 ml-5 text-orange-600" />
                              </Button>
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* <img src="/bg/classroom3.jpg" alt="..." />
            <img src="/bg/student5.jpg" alt="..." /> */}
         </Carousel>
      </div>
   )
}

export default AppCarousel