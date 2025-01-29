import React, { FC } from 'react'
import { Years } from '@/config';
import { CompleteApplicationFormData, CompleteApplicationProps } from '../studentApplication.types';
import { InputFormField, SelectFormField } from '@/components/ui/inputs/FormFields';
import ComboBox from '@/components/ui/application/ComboBox';

interface ExamSitting extends CompleteApplicationProps {
   id: string,
   name: string,
   title: string,
   result: { value: string | number; label: string; }[],
   years: { value: string | number; label: string; }[],
   required?: boolean,
}

const ExamSitting: FC<ExamSitting> = ({ register, errors, id, name, title, result, years, required = false }) => {

   const examType = name + '_type';
   const examYear = name + '_year';
   const examNumber = name + '_exam_number';

   return (
      <div className={id}>
         <h3 className="text-lg text-blue-700 font-bold">{title} {required && <span className='text-red-600 text-3xl'>*</span>}</h3>
         <div className={` homee ${examType} --- ${examYear} ---- ${examNumber}`}>
            <div className="grid grid-cols-1 gap-4 mt-2">
               <SelectFormField<CompleteApplicationFormData>
                  id={examType}
                  name={examType as keyof CompleteApplicationFormData}
                  label={"Select exam type"}
                  register={register}
                  error={errors[examType as keyof CompleteApplicationFormData]}
               >
                  <option value={""}>Exam Type</option>
                  {result && result.map((item: any, i: any) => (
                     <option key={i} value={item.value}>{item.label}</option>
                  ))}
               </SelectFormField>
               <SelectFormField<CompleteApplicationFormData>
                  id={examYear}
                  name={examYear as keyof CompleteApplicationFormData}
                  label={"Select exam year"}
                  register={register}
                  error={errors[examYear as keyof CompleteApplicationFormData]}
               >
                  <option value={""}>Exam Type</option>
                  {Years && Years.map((item: any, i: any) => (
                     <option key={i} value={item.value}>{item.label}</option>
                  ))}
               </SelectFormField>
               <InputFormField<CompleteApplicationFormData>
                  type="text"
                  id={examNumber}
                  label={"Fill in your exam number"}
                  name={examNumber as keyof CompleteApplicationFormData}
                  register={register}
                  error={errors[examNumber as keyof CompleteApplicationFormData]}
               />

               <div className="grid grid-cols-1 my-7">
                  <ComboBox key={name} identifire={name} />
               </div>
            </div>
         </div>
      </div >
   )
}

export default ExamSitting