import { z } from "zod";

export const SignupSchema = z
  .object({
    first_name: z.string().min(1, { message: "First name cannot be empty" }),
    last_name: z.string().min(1, { message: "Last  name is required" }),
    username: z.string().min(1, { message: "Username is required" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    gender: z.string().refine((value) => value !== "", {
      message: "Your gender must be selected",
    }),
    dob: z.string().min(1, { message: "Choose your date of birth" }),
    country: z
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
    // department_id: z.coerce.number({
    //   message: "Department Id must be a valid number",
    // }),
    department_id: z.string().min(1, { message: "Department is required" }),
    program: z.string().min(1, { message: "Programme is required" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type SignupFormData = z.infer<typeof SignupSchema>;
