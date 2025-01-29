"use client";

import Banner from "@/components/ui/student/Banner";
import { CenteredSection } from "@/components/ui/application/sections/Section";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";
import useToken from "@/hook/useToken";
import { VerifyAcceptanceFeePayment } from "@/app/actions/student";
import { baseUrl } from "@/config";
import Loader from "@/components/ui/app/Loader";

const VerifyAcceptance = ({
   params,
   searchParams,
}: {
   params: { slug: string }
   searchParams: { [key: string]: string }
}) => {
   const { transRef, transAmount, currency } = searchParams;
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);
   const { showToast } = useToast();
   const { token } = useToken();

   useEffect(() => {
      async function verifyPayment(access: string, ref: string) {
         setIsLoading(true);
         const { error, success } = await VerifyAcceptanceFeePayment(access, ref);
         if (success) {
            setIsLoading(false);
            showToast({
               description: success.message,
               variant: 'success',
            }, 10000);
            router.push(`${baseUrl}/dashboard/student/tuition`);
            router.refresh();
         }
         if (error) {
            setIsLoading(false);
            console.log('error', error);
            showToast({
               description: 'Something went wrong!',
               variant: 'error',
            }, 10000);
         }
      }
      if (transRef && token) {
         verifyPayment(token, transRef);
      }
   }, [transRef, token, router, showToast])

   return (
      <div className="container flex items-center justify-center min-h-screen text-black">
         <CenteredSection classList='min-h-[450px] w-[50vw] mx-auto p-0' title={''}>
            <Banner />
            <h1 className='text-2xl my-2'>Verifying your payment</h1>

            <div className='flex flex-col items-center justify-center space-y-10'>
               {isLoading && <Loader />}
               {transRef &&
                  (<div className='w-full py-10 px-20 space-y-5'>
                     <div className="flex justify-between items-center">
                        <div className='text-xl font-bold text-orange-900'>Transaction Ref</div>       <div>{transRef}</div>
                     </div>
                     <div className="flex justify-between items-center">
                        <div className='text-xl font-bold text-orange-900'>Transaction Amount</div>    <div>{transAmount && transAmount}</div>
                     </div>
                     <div className="flex justify-between items-center">
                        <div className='text-xl font-bold text-orange-900'>Currency</div>              <div>{currency && currency}</div>
                     </div>
                  </div>)
               }
            </div>
         </CenteredSection>
      </div>
   )
}
export default VerifyAcceptance;