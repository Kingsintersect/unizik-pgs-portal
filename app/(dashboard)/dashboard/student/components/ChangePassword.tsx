"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface ChangePasswordProps {
   isOpen: boolean;
   onClose: () => void;
}

const schema = z
   .object({
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match",
      path: ["confirmPassword"],
   });

type FormData = z.infer<typeof schema>;

const ChangePasswordForm = ({ isOpen, onClose }: ChangePasswordProps) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>({
      resolver: zodResolver(schema),
   });

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
         <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>

            <form onSubmit={handleSubmit(() => onClose())} className="space-y-3">
               <input
                  type="password"
                  {...register("password")}
                  className="w-full p-2 border rounded-md"
                  placeholder="New Password"
               />
               <p className="text-red-500 text-sm">{errors.password?.message}</p>

               <input
                  type="password"
                  {...register("confirmPassword")}
                  className="w-full p-2 border rounded-md"
                  placeholder="Confirm Password"
               />
               <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>

               <div className="flex justify-between">
                  <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={onClose}>
                     Cancel
                  </button>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                     Update Password
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default ChangePasswordForm;
