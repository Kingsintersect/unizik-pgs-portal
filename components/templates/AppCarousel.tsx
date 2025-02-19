"use client";
import {cn}from '@/lib/utils'
import React from 'react'
import { Button } from "@/components/ui/button"
import CarouselSlider from '../CarouselSlider';
import Link from 'next/link';

const AppCarousel = ({ classList }: { classList?: string }) => {
   return (
      <div className={cn(`relative`, classList)}>
         <CarouselSlider className='h-screen rounded-none' options={{ slidesToScroll: 1, slidesToShow: 1, loop: true, }} menu={[]}>
            <div className="relative h-full bg-gray-400 dark:bg-gray-700 dark:text-white bg-[url('/bg/slide-a.jpg')] bg-cover">
               <div className="absolute bottom-0 top-0 right-0 left-0 bg-black/30">
                  <div className="h-full flex flex-row justify-start items-center">
                     <div className="basis-full md:basis-2/4 pl-10 py-7 space-y-8 bg-black/40">
                        <h1 className="w-full text-blue-500 font-bold text-center text-4xl md:text-left md:text-5xl">UNIZIK POST GRADUATE STUDIES</h1>
                        <p className="font-light text-xl tracking-widest leading-loose text-center md:text-lg md:text-left md:w-1/2 text-white">Giving you the best experience as you study.<br/> Beautifully designed</p>
                        <div className="flex items-center justify-start gap-16">
                           <Link href='/auth/signin'>
                              <Button
                                 className='bg-orange-900 font-light hover:bg-orange-800 rounded-none py-5'
                              >
                                 <span className='text-3xl'>Login to continue</span>
                              </Button>
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </CarouselSlider>
      </div>
   )
}

export default AppCarousel