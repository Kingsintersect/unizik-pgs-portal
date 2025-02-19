"use client";
import { getUser } from '@/app/actions/auth';
import { useAppContext } from '@/contexts/AppContext';
import useToken from '@/hook/useToken';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const GetUser = () => {
   const { token } = useToken();
   const { state, setUser } = useAppContext();

   useEffect(() => {
      const fetchUser = async () => {
         const { error, success } = await getUser();
         if (success) {
            setUser(success.user);
            return;
         }
         if (error) {
            console.log('User fetch error:', error.message); return;
         }
      };

      if (token) {
         fetchUser();
      }
   }, [token]);

   return (
      <></>
   )
}

export default GetUser