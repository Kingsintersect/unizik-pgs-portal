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
import { Roles } from '@/app/(dashboard)/dashboard/admin/users/users.types';

export default function AdminLoginPage() {
    const router = useRouter();
    const { setUser } = useAppContext()
    const { saveToken } = useToken();
    const {
          register,
          handleSubmit,
          formState: { errors, isSubmitting, isValid },
       } = useForm<AdminLoginFormData>({ resolver: zodResolver(AdminLoginSchema), });

    const onSubmit = async (data: any, event: any) => {
        event.preventDefault();

        const { error, success } = await Signin(data);
        if (error) {
            console.log('error', error)
            notify({ message: 'Login Failed Try again.', variant: "error", timeout: 5000 });
            return;
        }
        if (success) {
            saveToken(success.access_token);
            setUser(success.user);
            notify({ message: 'Login Successful.', variant: "success", timeout: 5000 })
            // if (success.user.role === Roles.ADMIN) router.push(`${baseUrl}/dashboard/admin`)
            // if (success.user.role === Roles.STUDENT) router.push(`${baseUrl}/dashboard/student`)
            router.push("/auth/signin");
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
                className="mt-4 w-full bg-[#23628d] text-white px-4 py-2 rounded hover:bg-[#c04012] flex gap-3 justify-center items-center disabled:bg-gray-600  disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Processing..." : " Sign in"}
            </button>
        </form>
    );
}
