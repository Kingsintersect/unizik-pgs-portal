'use client';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { singleSignOn } from '@/app/actions/signing';
import TextInput from '../inputs/Inputs';
import { notify } from '@/contexts/ToastProvider';

export default function SSOForm() {
   const methods = useForm();
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();
   const searchParams = useSearchParams();

   const client_id = searchParams.get('client_id');
   const redirect_uri = searchParams.get('redirect_uri');
   const response_type = searchParams.get('response_type');
   const state = searchParams.get('state');

   const onSubmit = async (data: any, event: any) => {
      setIsLoading(true);
      event.preventDefault();
      data['client_id'] = client_id;
      data['redirect_uri'] = redirect_uri;
      data['response_type'] = response_type;
      data['state'] = state;
      const { success, error } = await singleSignOn(data);

      if (success) {
         setIsLoading(false);
         notify({ message: 'Signon Successful.', variant: "success", timeout: 5000 })
         // console.log(res.redirect_to)
         // router.push(res.redirect_to);
            // router.refresh();
      }
      if (error) {
         setIsLoading(false);
         notify({ message: 'Incorect Credentials', variant: "error", timeout: 5000 });
      }
   };

   return (
      <FormProvider {...methods}>
         <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 md:space-y-10 text-left">
            <div className="grid grid-cols-1 gap-5 mb-7">
               <TextInput label={'Registration Number'} name={'reg_number'} type={'text'} />
               {/* <TextInput label={'Registration Number'} name={'reg_number'} type={'text'} /> */}
               {/* <TextInput classList='' type='password' name='password' label='Password' /> */}
            </div>

            <button type="submit" className="flex gap-5 w-full justify-center items-center bg-[#9a3412] px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#702003] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#702003]">
               Sign in
               <ArrowRightIcon className={`ml-auto h-5 w-5 text-gray-50 ${isLoading ? 'animate-ping' : ''}`} />
            </button>
         </form>
      </FormProvider>
   );
}
