'use client';
import { useForm } from 'react-hook-form';
import { Signup } from '@/app/actions/auth';
import {cn}from '@/lib/utils';
import { useRouter } from 'next/navigation';
import useToken from '@/hook/useToken';
import { baseUrl } from '@/config';
import { notify } from '@/contexts/ToastProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputFormField } from '@/components/ui/inputs/FormFields';
import { AdminLoginFormData, AdminLoginSchema } from '../auth.types';
import { useUser } from '@/contexts/UserContext';


export default function AdminLoginPage() {
    const router = useRouter();
    const { setUser } = useUser();
    const { saveToken } = useToken();
    const {
          register,
          handleSubmit,
          formState: { errors, isSubmitting, isValid },
          setError,
       } = useForm<AdminLoginFormData>({ resolver: zodResolver(AdminLoginSchema), });

    const onSubmit = async (data: any, event: any) => {
        event.preventDefault();

        const { error, success } = await Signup(data);
        if (error) {
            console.log('error', error)
            notify({ message: 'Login Failed Try again.', variant: "error", timeout: 5000 });
            return;
        }
        if (success) {
            saveToken(success.access_token);
            setUser(success.user);
            notify({ message: 'Login Successful.', variant: "success", timeout: 5000 })
            router.push(`${baseUrl}/dashboard/admin/role-assignment`)
            router.refresh();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn(`block w-full space-y-4 md:space-y-6 text-left`)}>
            <div className="grid grid-cols-1 gap-5">
                <InputFormField<AdminLoginFormData>
                    type="email"
                    id={'email'}
                    label="Email Address"
                    name="email"
                    register={register}
                    error={errors.email}
                />
                <InputFormField<AdminLoginFormData>
                    type="password"
                    id={'password'}
                    label="Password"
                    name="password"
                    register={register}
                    error={errors.password}
                />
            </div>

            <button
                type="submit"
                disabled={!isValid}
                className="mt-4 w-full bg-[#23628d] text-white px-4 py-2 rounded hover:bg-[#702003] flex gap-3 justify-center items-center disabled:bg-gray-600  disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Processing..." : " Sign in"}
            </button>
        </form>
    );
}
