"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface StudentInfoProps {
   student: { first_name: string; email: string; phone: string };
}

const schema = z.object({
   first_name: z.string().min(2, "Name must be at least 2 characters"),
   email: z.string().email("Invalid email"),
   phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type FormData = z.infer<typeof schema>;

const EditInfoForm = ({ student }: StudentInfoProps) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>({
      defaultValues: student,
      resolver: zodResolver(schema),
   });

   const onSubmit = (data: FormData) => {
      console.log("Updated Info:", data);
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         <input
            type="text"
            {...register("first_name")}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Full Name"
         />
         <p className="text-red-500 text-sm">{errors.first_name?.message}</p>

         <input
            type="email"
            {...register("email")}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Email"
         />
         <p className="text-red-500 text-sm">{errors.email?.message}</p>

         <input
            type="tel"
            {...register("phone")}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Phone Number"
         />
         <p className="text-red-500 text-sm">{errors.phone?.message}</p>

         <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
            Save Changes
         </button>
      </form>
   );
};

export default EditInfoForm;
