"use client";

import Banner from '@/components/ui/student/Banner'
import { CenteredSection } from '@/components/ui/application/sections/Section'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { verifyApplicationPurchase } from '@/app/actions/student'
import { notify } from '@/contexts/ToastProvider'
import Loader from '@/components/ui/app/Loader'
import Button from '@/components/ui/application/Button'
import { baseUrl } from '@/config'

const VerifyApplicationPayment = ({
   params,
   searchParams,
}: {
   params: { slug: string }
   searchParams: { [key: string]: string }
}) => {
   const { transRef } = searchParams;
   const router = useRouter();
   const [refrenceNumber, setRefrenceNumber] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [error, seterror] = useState("");
   const [copied, setCopied] = useState(false);
   const [isClient, setIsClient] = useState(false);

   useEffect(() => {
      async function verifyPayment() {
         setIsLoading(true);
         const { error, success } = await verifyApplicationPurchase(transRef);
         if (success) {
            setIsLoading(false);
            setRefrenceNumber(transRef);
            notify({ message: success.message, variant: "success", timeout: 5000 })
         }
         if (error) {
            setIsLoading(false);
            console.log('error', error)
            notify({ message: "Something went wrong", variant: "error", timeout: 5000 });
         }
      }
      setIsClient(true);
      verifyPayment();
   }, [transRef, router])

   const handleCopy = () => {
      if (isClient) {
         navigator.clipboard.writeText(refrenceNumber);
         setCopied(true);
         setTimeout(() => {
            setCopied(false)
         }, 5000)
      }
   }
   const handleRedirect = () => {
     router.push(`${baseUrl}/auth/student`);
            router.refresh();
   }

   return (
      <div className="container flex items-center justify-center min-h-screen text-black">
         <CenteredSection classList='min-h-[450px] w-[50vw] mx-auto p-0' title={''}>
            <Banner />
            <h1 className='text-2xl my-2'>Verifying your payment</h1>

            <div className='flex flex-col items-center justify-center space-y-10'>
               {isLoading && <Loader />}
               {error && <div className='text-red-400'>{error}</div>}
               {refrenceNumber &&
                  (<>
                     <h3 className="text-orange-600 text-lg -mb-7 mt-5 py-1 px-7 rounded-full border">{refrenceNumber}</h3>
                     <Button onClick={handleCopy} variant={'primaryGradiant'} className='py-1 rounded-full'>{copied ? "copied" : "click to copy"}</Button>
                     <div className="w-[60%] mx-auto">
                        <Button onClick={handleRedirect} variant={'successOutline'} size={'full'}>continue</Button>
                     </div>
                  </>)
               }
            </div>
         </CenteredSection>
      </div>
   )
}

export default VerifyApplicationPayment