"use client";

import { Signup } from "@/app/actions/auth";
import { GetAllProgram } from "@/app/actions/faculty.api";
import { GetAllActiveFacultiesWithDepartments } from "@/app/actions/server.admin";
import { Gender, Nationality, State } from "@/config";
import { notify } from "@/contexts/ToastProvider";
import { extractErrorMessages } from "@/lib/utils/errorsHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FieldName, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const SignupSchema = z
  .object({
    first_name: z.string().min(1, { message: "Required" }),
    last_name: z.string().min(1, { message: "Required" }),
    username: z.string().min(1, { message: "Required" }),
    phone: z.string().min(1, { message: "Required" }),
    gender: z.string().refine((value) => value !== "", {
      message: "Your gender must be selected",
    }),
    dob: z.string().min(1, { message: "Required" }),
    country: z
      .string()
      .refine((value) => value !== "", { message: "Required" }),
    state: z
      .string()
          .refine((value) => value !== "", { message: "Required" }),    
    hometown_address: z.string().min(1, { message: "Required" }),
    residential_address: z.string().min(1, { message: "Required" }),
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z
      .string()
      .min(6, { message: "Should be at least 6 characters long" }),
    password_confirmation: z.string(),

    faculty_id: z.coerce.number({
      message: "Faculty Id must be a valid number",
    }),
    // department_id: z.coerce.number({
    //   message: "Department Id must be a valid number",
    // }),
    department_id: z.string().min(1, { message: "Required" }),
    program: z.string().min(1, { message: "Required" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type SignupFormData = z.infer<typeof SignupSchema>;
export interface Program {
  id: number;
  label: string;
  value: string;
}

const programLabels: Record<string, string> = {
  MASTERS: "Masters Degree",
  PHD: "Doctorate Degree",
  PGDE: "Post Graduate Diploma",
};

const steps = [
    {
        id: 1,
        label: "Personal Info",
        fields: ["first_name", "last_name", "phone", "gender", "national", "state", "hometown_address", "residential_address", "dob"],
    },
    {
        id: 2,
        label: "Account Credentials",
        fields: ["program", "faculty_id", "department_id"],
    },
    {
        id: 3,
        label: "Application Data",
        fields: ["email", "username", "password", "password_confirmation"],
    },
];



export default function useSignInMultiStepViewModel() {
    const [currentStep, setCurrentStep] = useState(1);
    const [previousStep, setPreviousStep] = useState(1);
    const delta = currentStep - previousStep;
    const getInitialX = () => (delta >= 1 ? "50%" : "-50%");
    const [departmentFaculty, setDepartmentFaculty] = useState<any[]>([]);
    const [programme, setprogramme] = useState<any[]>([]);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        trigger,
        control,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormData>({
        resolver: zodResolver(SignupSchema),
        mode: "onBlur",
    });

    const NewGender = useMemo(() => Gender, []);
    const NewNationality = useMemo(() => Nationality, []);
    const NewState = useMemo(() => State, []);

    useEffect(() => {
        const loadData = async () => {
            const { error, success }: any = await GetAllActiveFacultiesWithDepartments();
            if (success) setDepartmentFaculty(success.data);
        };

        loadData();
    }, []);

const onSubmit = useCallback<SubmitHandler<SignupFormData>>(async (data: any) => {
    const { error, success } = await Signup(data);
    if (error) {
        const errorMessages = extractErrorMessages(error);
        errorMessages.forEach((msg) => {
            notify({ message: msg, variant: "error", timeout: 5000 });
        });
        return;
    }
    if (success) {
        notify({ message: 'Successfully Created Account', variant: "success", timeout: 5000 });
        reset();
        setCurrentStep(1);
        router.push("/auth/signin");
    }
}, [reset, setCurrentStep, router]);

    const handleDepartmentSelect = useCallback((facultyId: number, departmentId: number) => {
        setValue("faculty_id", facultyId);
    }, [setValue]);

    const nextStep = useCallback(async () => {
        const fields = steps[currentStep - 1].fields;
        const isFieldsValid = await trigger(fields as FieldName<SignupFormData>[], { shouldFocus: true });

        if (!isFieldsValid) return;
        if (currentStep < steps.length) {
            setPreviousStep(currentStep);
            setCurrentStep((prev) => Math.min(prev + 1, steps.length));
        }

        if (currentStep === steps.length) {
            await handleSubmit(onSubmit)();
        }
    }, [currentStep, trigger, handleSubmit, onSubmit, setPreviousStep, setCurrentStep]);

    const prevStep = useCallback(() => {
        if (currentStep > 1) {
            setPreviousStep(currentStep);
            setCurrentStep((step) => Math.max(step - 1, 1));
        }
    }, [currentStep, setPreviousStep, setCurrentStep]);




    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const res = await GetAllProgram();
                if (res?.success && res.success.data) {
                    const program: Program[] = Object.entries(res.success.data).map(([id, value]) => ({
                        id: Number(id),
                        label: programLabels[String(value)] || "Unknown Program", // Ensure value is a string
                        value: String(value),
                    }));
                    setprogramme(program);
                }
            } catch (error) {
                console.error("Error fetching programs:", error);
            }
        };

        fetchPrograms();
    }, []);

    return useMemo(() => ({
        currentStep,
        setCurrentStep,
        nextStep,
        prevStep,
        NewGender,
        NewNationality,
        NewState,
        register,
        handleSubmit,
        onSubmit,
        watch,
        reset,
        errors,
        isSubmitting,
        control,
        setValue,
        departmentFaculty,
        programme,
        handleDepartmentSelect,
        delta,
        steps,
    }), [
        currentStep,
        setCurrentStep,
        nextStep,
        prevStep,
        NewGender,
        NewNationality,
        NewState,
        register,
        handleSubmit,
        onSubmit,
        watch,
        reset,
        errors,
        isSubmitting,
        control,
        setValue,
        departmentFaculty,
        programme,
        handleDepartmentSelect,
        delta,
    ]); 
}
