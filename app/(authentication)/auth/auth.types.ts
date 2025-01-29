import { z, ZodType } from "zod";

// STUDENTS
export type StudentLoginFormData = {
    reference: string,
    password: string,
};
export const StudentLoginSchema: ZodType<StudentLoginFormData> = z
    .object({
        reference: z
            .string({ message: "Refrence Number is required" })
            .min(1, "Refrence Number should is required"),
        password: z.string().min(6, "Password should be at least 6 characters"),
    })



// ADMIN
export type AdminLoginFormData = {
   email: string,
   password: string,
};

export const AdminLoginSchema: ZodType<AdminLoginFormData> = z.object({
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z.string().min(6, { message: 'Password should be at least 6 characters long' }),
})