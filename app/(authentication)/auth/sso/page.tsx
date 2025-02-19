'use client';
import { useForm } from 'react-hook-form';
import { Signin } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import useToken from '@/hook/useToken';
import { useAppContext } from '@/contexts/AppContext';
import { baseUrl } from '@/config';
import { notify } from '@/contexts/ToastProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputFormField } from '@/components/ui/inputs/FormFields';
import { AdminLoginFormData, AdminLoginSchema } from '../auth.types';
import { cn } from '@/lib/utils';
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
    const router = useRouter();
    const { setUser } = useAppContext()
    const { saveToken } = useToken();
    const {
          register,
          handleSubmit,
          formState: { errors, isSubmitting, isValid },
       } = useForm<AdminLoginFormData>({ resolver: zodResolver(AdminLoginSchema), });

    const onSubmit = async (data: any, e:any) => {
        e?.preventDefault();

        const result = await signIn("credentials", {
            redirect: false, // Set to false so we can manually handle redirection
            email: data.email,
            password: data.password,
            callbackUrl: "https://random-subdomain.ngrok-free.app/dashboard/student",
        });

        if (result?.error) {
            alert("Login failed: " + result.error);
            return;
        }

        // Redirect to Moodle after login
        router.push(`/auth/sso/redirect`);
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
                className="mt-4 w-full bg-[#23628d] text-white px-4 py-2 rounded hover:bg-[#c04012] flex gap-3 justify-center items-center disabled:bg-gray-600  disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Processing..." : " Sign in"}
            </button>
        </form>
    );
}
// ngrok http 3000
