'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { studentSignin } from '@/app/actions/auth';
import cn from '@/lib/cn';
import { useRouter } from 'next/navigation';
import useToken from '@/hook/useToken';
import { useAppContext } from '@/contexts/AppContext';
import { baseUrl } from '@/config';
import { notify } from '@/contexts/ToastProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputFormField } from '@/components/ui/inputs/FormFields';
import { StudentLoginFormData, StudentLoginSchema } from '../auth.types';


export default function StudentLoginPage() {
    const router = useRouter();
    const { setStudent } = useAppContext()
    const { saveToken } = useToken();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        setError,
    } = useForm<StudentLoginFormData>({ resolver: zodResolver(StudentLoginSchema), });

    const onSubmit: SubmitHandler<StudentLoginFormData> = async (data, event: any) => {
        event.preventDefault();

        const { error, success } = await studentSignin(data);
        if (error) {
            console.log('error', error)
            notify({ message: 'Login Failed Try again.', variant: "error", timeout: 5000 });
            return;
        }
        if (success) {
            saveToken(success.access_token);
            setStudent(success.user);
            notify({ message: 'Login Successful.', variant: "success", timeout: 5000 });
            router.push(`${baseUrl}/dashboard/student/complete-application`);
            router.refresh();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn(`block w-full space-y-4 md:space-y-6 text-left`)}>
            <div className="grid grid-cols-1 gap-5">
                <InputFormField<StudentLoginFormData>
                    type="text"
                    id={'reference'}
                    label="Refrence number"
                    name="reference"
                    register={register}
                    error={errors.reference}
                />
                <InputFormField<StudentLoginFormData>
                    type="password"
                    id={'password'}
                    label="Enter strong password"
                    name="password"
                    register={register}
                    error={errors.password}
                />
            </div>

            <button
                type="submit"
                disabled={!isValid}
                className="mt-4 w-full bg-[#9a3412] text-white px-4 py-2 rounded hover:bg-[#702003] flex gap-3 justify-center items-center disabled:bg-gray-600  disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Processing..." : " Sign in"}
            </button>
        </form>
    );
}
