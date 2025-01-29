"use client";

import React, { FC, useEffect, useState } from 'react'
import { Religion, LocalGovAreaList, gender, YesOrNo } from '@/config';
import { FormFieldSet, InputFormField, SelectFormField, TextareaFormField } from '@/components/ui/inputs/FormFields';
import { CompleteApplicationFormData, OtherPersonalDetailsProps } from '../../studentApplication.types';
import Fade from '@/components/ui/application/animatives/Fade';
import { GetListOfLocalGov } from '@/app/actions/server.admin';
import useToken from '@/hook/useToken';
import { notify } from '@/contexts/ToastProvider';


const OtherPersonalDetails: FC<OtherPersonalDetailsProps> = ({ register, errors }) => {
   const { token } = useToken();
   const [localGavAreaList, setLocalGavAreaList] = useState<any[]>([])
   const [hasDisability, setHasDisability] = useState<string>('no');

   useEffect(() => {
      async function fetchLocalGovArea(token: string) {
         const { error, success }: any = await new Promise((resolve) => resolve(GetListOfLocalGov(token)));
         console.log('success', success)
         // if (success.data) {
         //    setLocalGavAreaList(success.data);
         //    console.log('success.data', success.data);
         // }
         if (error) {
            notify({ message: 'Local Govanment List Could be fetched', variant: "error", timeout: 5000 });
            console.error("Local Gov List Fetch Error: ", error);
         }
      }

      if (token) fetchLocalGovArea(token);
   }, [token]);
   

   const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setHasDisability(event.target.value);
   };
   return (
      <div className="mx-auto">
         <FormFieldSet legend={'Personal Information'} classList={'bg-white'} >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 my-7 gap-y-7">
               <InputFormField<CompleteApplicationFormData>
                  type="text"
                  id={'hometown'}
                  label={"Your home town"}
                  name="hometown"
                  register={register}
                  error={errors.hometown}
               />
               <InputFormField<CompleteApplicationFormData>
                  type="text"
                  id={'hometown_address'}
                  label={"Your home town address"}
                  name="hometown_address"
                  register={register}
                  error={errors.hometown_address}
               />
               <InputFormField<CompleteApplicationFormData>
                  classList={"col-span-full"}
                  type="date"
                  id={'dob'}
                  label={"Your date of birth"}
                  name="dob"
                  register={register}
                  error={errors.dob}
               />
               <InputFormField<CompleteApplicationFormData>
                  classList={"col-span-full"}
                  type="text"
                  id={'contact_address'}
                  label={"Your contact address"}
                  name="contact_address"
                  register={register}
                  error={errors.contact_address}
               />
               <SelectFormField<CompleteApplicationFormData>
                  id={'religion'}
                  name="religion"
                  label={"Select your Religion"}
                  register={register}
                  error={errors.religion}
               >
                  <option value={""}>Religion Option</option>
                  {Religion && Religion.map((item: any, i: any) => (
                     <option key={i} value={item.value}>{item.label}</option>
                  ))}
               </SelectFormField>
               <SelectFormField<CompleteApplicationFormData>
                  classList={""}
                  id={'lga'}
                  name="lga"
                  label={"Local Government Area"}
                  register={register}
                  error={errors.lga}
               >
                  <option value={""}>Local Gov. Area Option</option>
                  {LocalGovAreaList && LocalGovAreaList.map((item: any, i: any) => (
                     <option key={i} value={item.value}>{item.label}</option>
                  ))}
               </SelectFormField>
               <SelectFormField<CompleteApplicationFormData>
                  classList={""}
                  id={'gender'}
                  name="gender"
                  label={"Your Gender"}
                  register={register}
                  error={errors.gender}
               >
                  <option value={""}>Gender Option</option>
                  {gender && gender.map((item: any, i: any) => (
                     <option key={i} value={item.value}>{item.label}</option>
                  ))}
               </SelectFormField>
               <SelectFormField<CompleteApplicationFormData>
                  classList={""}
                  id={'dis'}
                  name="dis"
                  label={"Do you have any disability"}
                  register={register}
                  error={errors.dis}
                  selected={hasDisability}
                  handleChange={handleSelectChange}
               >
                  {YesOrNo && YesOrNo.map((item: any, i: any) => (
                     <option key={i} value={item.value}>{item.label}</option>
                  ))}
               </SelectFormField>

               <div className="col-span-full">
                  <Fade duration={200} in={hasDisability === 'yes'}>
                     <TextareaFormField<CompleteApplicationFormData>
                        id="disability"
                        rows={3}
                        placeholder="Short note about the new Department"
                        name="disability"
                        register={register}
                        error={errors.disability} cols={0} />
                  </Fade>
               </div>
            </div>
         </FormFieldSet>
      </div>
   )
}

export default OtherPersonalDetails

