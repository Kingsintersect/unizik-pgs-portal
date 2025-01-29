"use client";
import cn from "@/lib/cn";
import { Label, Select } from "flowbite-react";
import { ReactNode, useRef } from "react";
import Image from 'next/image';
import { FieldError, Path, useFormContext, UseFormRegister } from "react-hook-form";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Spinner from "../application/Spinner";

// const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

// Define a generic type for FormData
export type FormDataType<T extends string | number | boolean = string> = {
   [key: string]: T; // Allows dynamic keys with a specified type for values
};

// Define the ValidFieldNames type based on the keys of FormData
export type ValidFieldNamesType<T> = Path<T>;

// export type FormData = FormDataType<string | number>; // Specify the type of values (string or number)
// export type ValidFieldNames = ValidFieldNamesType<FormData>; // Generates valid field names


export const FormFieldSet = ({ legend, classList, children }: { legend: string, classList: string, children: ReactNode }) => {
   return (
      <fieldset className={cn(`w-full border border-solid border-gray-300 rounded-md px-4 py-7`, classList)}>
         <legend className="text-2xl text-orange-400">{legend}</legend>
         {children}
      </fieldset>
   )
}


// FormFieldProps updated to use dynamic types
export type FormInputFieldProps<T extends FormDataType> = {
   type: string;
   name: ValidFieldNamesType<T>;
   label: string,
   id: string;
   register: UseFormRegister<T>;
   error: FieldError | undefined;
   placeholder?: string;
   valueAsNumber?: boolean;
   classList?: string;
   validationRules?: object;
   value?: string | number;
};
// INPUT FIELD DEFINITION
export const InputFormField = <T extends Record<string, any>>({
   type,
   placeholder,
   name,
   id,
   label,
   register,
   error,
   valueAsNumber,
   classList = "",
   validationRules = {},
   value,
}: FormInputFieldProps<T>) => (
   <div className={cn(`relative z-0 w-full`, classList)}>
      <input
         type={type}
         id={id}
         placeholder={""}
         {...register(name, { ...validationRules, valueAsNumber })}
         value={value && value}
         className={`block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-cyan-500 focus:outline-none focus:ring-0 peer ${ error ? "border-red-500" : ""}`}
      />
      {(type !== "hidden") &&
         <label htmlFor={name} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{label}</label>
      }
      {error && <span className="error-message text-red-400 text-xs">{error.message}</span>}
   </div>
);

// RADIO BUTTON FIELD DEFINITION
export type RadioButtonFieldProps<T extends FormDataType> = {
   classList?: string;
   label: string;
   name: ValidFieldNamesType<T>;
   register: UseFormRegister<T>;
   error: FieldError | undefined;
   value?: string | number;
   defaultChecked?: boolean;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   valueAsNumber?: boolean;
   validationRules?: object;
}

export const RadiobuttonFormField = <T extends Record<string, any>>({
   classList,
   label,
   name,
   register,
   error,
   value,
   defaultChecked = false,
   onChange,
   valueAsNumber,
   validationRules = {},
}: RadioButtonFieldProps<T>) => {
   return (
      <div className="flex items-center mb-4 gap-2">
         <input
            id={`option-${value}`}
            type="radio"
            value={value}
            {...register(name, { ...validationRules, valueAsNumber })}
            className="peer/checkbox1 w-7 h-7 border-gray-300 focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-600 dark:focus:bg-orange-600 dark:bg-gray-700 dark:border-gray-600"
            defaultChecked={defaultChecked}
            onChange={onChange}
         />
         <label
            htmlFor={`option-${value}`}
            className="peer-checked/checkbox1:text-orange-500 peer-checked/checkbox1:font-bold block ms-2 text-lg font-normal text-gray-900 dark:text-gray-300"
         >
            {label}
         </label>
         {error && <span className="error-message text-red-400 text-xs">{error.message}</span>}
      </div>
   );
};


// CheckBox FIELD DEFINITION
export type CheckBoxFieldProps<T extends FormDataType> = {
   classList?: string;
   label: ReactNode;
   name: ValidFieldNamesType<T>;
   register: UseFormRegister<T>;
   error: FieldError | undefined;
   value?: string | number;
   defaultChecked?: boolean;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   // valueAsNumber?: boolean;
   validationRules?: object;
}

export const CheckBoxFormField = <T extends Record<string, any>>({
   classList,
   label,
   name,
   register,
   error,
   value,
   defaultChecked = false,
   onChange,
   // valueAsNumber,
   validationRules = {},
}: CheckBoxFieldProps<T>) => {
   return (
      <div className="flex items-center mb-4 gap-2">
         <input
            id={`boxcheck-${value}`}
            type="checkbox"
            value={value}
            {...register(name, { ...validationRules })}
            className="peer/checkbox1 w-7 h-7 border-gray-300 focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-600 dark:focus:bg-orange-600 dark:bg-gray-700 dark:border-gray-600"
            defaultChecked={defaultChecked}
            onChange={onChange}
         />
         <label
            htmlFor={`boxcheck-${value}`}
            className="peer-checked/checkbox1:text-orange-500 peer-checked/checkbox1:font-bold block ms-2 text-xl font-normal text-gray-900 dark:text-gray-300"
         >
            {label}
         </label>
         {error && <span className="error-message text-red-400 text-xs">{error.message}</span>}
      </div>
   );
};

// SELECT MENU FIELD DEFINITION
export type SelectFormFieldProps<T extends FormDataType> = {
   id: string;
   name: ValidFieldNamesType<T>;
   register: UseFormRegister<T>;
   error: FieldError | undefined;
   label?: string;
   data?: any;
   children?: ReactNode;
   classList?: string;
   valueAsNumber?: boolean;
   validationRules?: object,
   selected?: any,
   handleChange?: any;
   defaultValue?: any;
};
export const SelectFormField = <T extends Record<string, any>>({
   name,
   id,
   label,
   children,
   register,
   error,
   data,
   classList,
   valueAsNumber,
   validationRules,
   selected,
   handleChange,
   defaultValue,
}: SelectFormFieldProps<T>) => (
   <div className={cn(`w-full `, classList)}>
      <div className="mb-2 block">
         {/* <Label htmlFor={id} value={label || "Select An Option"} /> */}
         {label && <Label htmlFor={id} value={label} />}
      </div>
      <Select
         id={id}
         // {...selected && selected}
         {...register(name, { ...validationRules, valueAsNumber })}
         value={selected}
         defaultValue={defaultValue}
         onChange={handleChange}
      >
         {data && data.map((item: any, i: any) => (
            <option key={i} value={item.value}>{item.label}</option>
         ))}
         {children && children}
      </Select>
      {error && <span className="error-message text-xs text-red-400">{error.message}</span>}
   </div>
)

// TEXTAREA FIRM FIELD
export type TextareaFieldProps<T extends FormDataType> = {
   placeholder: string;
   name: ValidFieldNamesType<T>;
   id: string;
   register: UseFormRegister<T>;
   error: FieldError | undefined;
   rows?: number;
   cols?: number;
   defaultValue?: any;
   valueAsNumber?: boolean;
   className?: string;
   validationRules?: object;
};
export const TextareaFormField = <T extends Record<string, any>>({
   id,
   placeholder,
   rows,
   cols,
   name,
   register,
   error,
   valueAsNumber,
   className,
   validationRules,
}: TextareaFieldProps<T>) => (
   <div>
      <div className="col-span-full">
         <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-400">{name}</label>
         <div className="mt-2">
            <textarea
               id={id}
               placeholder={placeholder}
               {...register(name, { ...validationRules, valueAsNumber })}
               name={name}
               rows={rows}
               cols={cols}
               className={cn(`px-5 py-3 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`, className)}></textarea>
         </div>
      </div>
      {error && <span className="error-message text-red-400 text-xs">{error.message}</span>}
   </div>
);

// FILE INPUT FIELD DEFINITION
export type FileInputFormProps<T extends FormDataType> = {
   title: string;
   name: ValidFieldNamesType<T>;
   id: string;
   register: UseFormRegister<T>;
   error: FieldError | undefined;
   label?: string,
   customError?: string;
   pictureRef?: string,
   uploadableTypes?: string,
   isLoading?: boolean,
   className?: string;
   validationRules?: object;
   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export const FileInputFormField = <T extends Record<string, any>>({
   title,
   name,
   id,
   register,
   error,
   customError,
   pictureRef,
   uploadableTypes,
   label,
   isLoading,
   className,
   validationRules,
   onChange
}: FileInputFormProps<T>) => {
   const buttonRef = useRef<HTMLLabelElement>(null);
   const inputRef = useRef<HTMLInputElement>(null);

   const handleClick = () => {
      if (inputRef.current) {
         inputRef.current.click(); // Trigger the file input click
      }
   };

   return (
      <div className={cn(`col-span-full`, className)}>
         <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">{title}</label>
         <div className="mt-2 flex min-h-[300px] justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
               {pictureRef ?
                  <>
                     <Image
                        src={pictureRef}
                        alt="Passport photograph"
                        width={200}
                        height={200}
                        className="mx-auto"
                     />
                  </>
                  : <PhotoIcon color="#dccece" width={80} className='mx-auto' />
               }
               <div className="mt-4 flex flex-col justify-center space-y-2 text-sm leading-6 text-gray-600">
                  {isLoading && <div className='my-4'><Spinner border='text-[#dccece]' fill='fill-blue-600' /></div>}
                  {customError && <p className='text-red-400 my-3'>{customError}</p>}
                  <label ref={buttonRef} onClick={handleClick} htmlFor="file-upload" className="relative w-full cursor-pointer rounded-md bg-white font-semibold text-cyan-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-cyan-600 focus-within:ring-offset-2 hover:text-cyan-500 p-2">
                     <span>{label ?? "Upload a file"}</span>
                     <input
                        id={id}
                        type="file"
                        {...register(name, { ...validationRules })}
                        ref={inputRef}
                        className="sr-only"
                        onChange={onChange}
                     />
                  </label>
                  {/* <p className="pl-1">or drag and drop</p> */}
               </div>
               <p className="text-xs leading-5 text-gray-600 mt-3">{!uploadableTypes && "PNG, JPG, GIF up to 50KB"}</p>
            </div>
         </div>
         {error && <span className="error-message text-red-400 text-xs">{error.message}</span>}
      </div>
   )
}

export const DateInput = ({ label, name, required = true }: { label: string, name: string, required?: boolean }) => {
   const { register, formState: { errors } } = useFormContext();

   return (
      <div className="col-span-full">
         <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
         <div className="mt-2">
            <input required={required} {...register(name)} type="date" name={name} id={name} />
         </div>
         {errors[name] && (<p className='text-red-400'>{typeof errors[name]?.message === 'string' ? errors[name]?.message : ''}</p>)}
      </div>
   )
}

export const HR = ({ classList }: { classList?: string }) => {
   return (
      <hr className={cn(`my-2`, classList)} />
   )
}

{/* <div className="relative z-0 w-full mb-5 group">
   <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
   <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
</div> */}