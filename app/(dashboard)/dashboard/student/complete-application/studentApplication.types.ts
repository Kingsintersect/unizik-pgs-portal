import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ZodType, z } from "zod";

export type CompleteApplicationFormData = {
   // passport: File | null;
   passport?: string;

   hometown: string;
   hometown_address: string;
   dob: string;
   religion: string;
   contact_address: string;
   lga: string;
   gender: string;
   dis: string;
   disability?: string;

   // sponsor's data type
   sponsor_name: string;
   sponsor_relationship: string;
   sponsor_email: string;
   sponsor_contact_address: string;
   sponsor_phone_number: string;

   image_url?: string;
   awaiting_result?: boolean;

   // exam sitting data type
   first_sitting_type?: string;
   first_sitting_year?: string;
   first_sitting_exam_number?: string;
   second_sitting_type?: string;
   second_sitting_year?: string;
   second_sitting_exam_number?: string;

   // other fields
   first_sitting_result_url?: string;
   second_sitting_result_url?: string;


}
// } & {
//    [key: string]: any; // Allow any string as a key
//  };

export const CompleteApplicationFormSchema: ZodType<CompleteApplicationFormData> = z.object({
   // passport: z.instanceof(File).refine(file => file?.size > 0, {
   //    message: "You must upload your passport",
   // }),
   passport: z.string().optional(),

   hometown: z.string().min(1, { message: "Home town cannot be empty" }),
   hometown_address: z.string().min(1, { message: "Home town address cannot be empty" }),
   dob: z.string().min(1, { message: "Choose your date of birth" }),
   religion: z.string().refine((value) => value !== "", { message: "Religion must be selected" }),
   contact_address: z.string().min(1, { message: "Fill in your contant address" }),
   lga: z.string().refine((value) => value !== "", { message: "Your Local Gov. must be selected" }),
   gender: z.string().refine((value) => value !== "", { message: "Your gender must be selected" }),
   dis: z.string(),
   disability: z.string().optional(),

   // sponsor's zod data validation
   sponsor_name: z.string().min(1, { message: "Sponsor full name is required" }),
   sponsor_email: z.string().email({ message: "Please enter a valid email." }),
   sponsor_relationship: z.string().min(1, { message: "Fill in your relationship" }),
   sponsor_contact_address: z.string().min(1, { message: "Sponsor's address  is required" }),
   sponsor_phone_number: z.string().min(1, { message: "Sponsor's phone number is required" }),

   // exam sitting zod data validation
   awaiting_result: z.boolean().default(false),
   first_sitting_type: z.string().optional(),
   first_sitting_year: z.string().optional(),
   first_sitting_exam_number: z.string().optional(),

   second_sitting_type: z.string().optional(),
   second_sitting_year: z.string().optional(),
   second_sitting_exam_number: z.string().optional(),

}).superRefine((data, ctx) => {
   // If `awaiting_result` is false, validate that first sitting fields are filled
   if (!data.awaiting_result) {
      if (!data.first_sitting_type || data.first_sitting_type.trim() === "") {
         ctx.addIssue({
            code: "custom",
            path: ["first_sitting_type"],
            message: "First sitting exam type must be selected if not awaiting result.",
         });
      }

      if (!data.first_sitting_year || data.first_sitting_year.trim() === "") {
         ctx.addIssue({
            code: "custom",
            path: ["first_sitting_year"],
            message: "First sitting exam year must be selected if not awaiting result.",
         });
      }

      if (!data.first_sitting_exam_number || data.first_sitting_exam_number.trim() === "") {
         ctx.addIssue({
            code: "custom",
            path: ["first_sitting_exam_number"],
            message: "First sitting exam number must be selected if not awaiting result.",
         });
      }
   }
});

export interface FormValidationProps {
    register: UseFormRegister<CompleteApplicationFormData>;
    errors: FieldErrors<CompleteApplicationFormData>;
}

export interface CompleteApplicationProps extends FormValidationProps {   
   watch?: (field: string) => any;
   setValue?: (field: string, value: any) => void;
}
export interface ExamSittingProps extends CompleteApplicationProps {
   fileKey: string,
   uploadMethod: (val: any) => any,
   label?: string,
}

export interface OtherPersonalDetailsProps extends FormValidationProps {
}

export interface ExamSittingFormProps extends CompleteApplicationProps {
   firstResultError: boolean
   secondResultError: boolean
}

export interface OtherSponsorDetailsProps extends CompleteApplicationProps {
}