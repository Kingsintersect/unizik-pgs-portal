import { z, ZodType } from "zod";

export type SignupFormData = {
    first_name: string,
    last_name: string,
    other_name?: string,
    phone_number: string,
    nationality: string,
    state: string,
    email: string,
    password: string,
    password_confirmation: string,
    faculty_id: number,
    department_id: number,
};
export const SignupSchema: ZodType<SignupFormData> = z
  .object({
    first_name: z.string().min(1, { message: "First name cannot be empty" }),
    last_name: z.string().min(1, { message: "Last  name is required" }),
    other_name: z.string().optional(),
    phone_number: z.string().min(1, { message: "Phone number is required" }),
    nationality: z
      .string()
      .refine((value) => value !== "", { message: "Country must be selected" }),
    state: z
      .string()
      .refine((value) => value !== "", { message: "State must be selected" }),
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z
      .string()
      .min(6, { message: "Should be at least 6 characters long" }),
    password_confirmation: z.string(),

    faculty_id: z.coerce.number({
      message: "Faculty Id must be a valid number",
    }),
    department_id: z.coerce.number({
      message: "Department Id must be a valid number",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
});