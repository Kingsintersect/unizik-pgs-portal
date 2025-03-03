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

// SIGN UP
export const SIGNUPformSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    profileLink: z.string().url("Invalid URL").optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
