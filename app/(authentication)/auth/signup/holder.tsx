"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  profileLink: z.string().url("Invalid URL").optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

const steps = ["Account", "Personal", "Billing"];

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Form Submitted", data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl grid grid-cols-2">
        <div className="flex flex-col items-center">
          <Image src="/avatar.svg" width={250} height={250} alt="User Avatar" />
          <h1 className="text-xl font-semibold mt-4">MATERIO</h1>
        </div>
        <div className="px-6">
          <div className="flex items-center space-x-4 mb-6">
            {steps.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    step >= index ? "bg-orange-500" : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </div>
                <span className={`text-sm ${step >= index ? "text-gray-900" : "text-gray-400"}`}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                {...register("username")}
                placeholder="Username"
                className="border p-2 rounded w-full"
              />
              <input
                {...register("email")}
                placeholder="Email"
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="border p-2 rounded w-full"
              />
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
                className="border p-2 rounded w-full"
              />
            </div>
            <input
              {...register("profileLink")}
              placeholder="Profile Link"
              className="border p-2 rounded w-full"
            />
            
            <div className="flex justify-between">
              <button
                type="button"
                disabled={step === 0}
                onClick={() => setStep(step - 1)}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                ← Previous
              </button>
              <button
                type={step === steps.length - 1 ? "submit" : "button"}
                onClick={() => step < steps.length - 1 && setStep(step + 1)}
                className="bg-orange-500 px-4 py-2 text-white rounded"
              >
                {step === steps.length - 1 ? "Submit" : "Next →"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
