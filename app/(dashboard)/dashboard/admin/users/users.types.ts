import { z, ZodType } from "zod";

interface User {
   id: number;
   name: string;
   email: string;
   role: string;
   program: string;
   first_name: string;
   last_name: string;
}

export type UpdateUserRoleFormData = {
//   email: string;
  role: string;
//   user_id: number;
};

export const UpdateUserRoleSchema: ZodType<UpdateUserRoleFormData> = z.object({
//   email: z.string().email({ message: "Please enter a valid email." }),
  role: z.string().min(3, "Role must not be empty"),
//   user_id: z.number({ required_error: "Select Faculty" }),
});

export const UserRoles = [
  { label: "ADMIN", value: "ADMIN" },
  { label: "STUDENT", value: "STUDENT" },
  { label: "TEACHER", value: "TEACHER" },
  { label: "MANAGER", value: "MANAGER" },
];
export enum Roles {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  MANAGER = "MANAGER",
}