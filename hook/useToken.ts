"use client";
import { useState, useEffect } from 'react';

function useToken() {
   // State to hold the token value
   const [token, setToken] = useState<string | null>(null);

   // Retrieve token from localStorage on initial render
   useEffect(() => {
      if (typeof window !== "undefined") {
         const storedToken = localStorage.getItem("accessToken");
         if (storedToken) {
            setToken(storedToken);
         }
      }
   }, []);

   // Function to save the token in localStorage and state
   const saveToken = (newToken: string) => {
      localStorage.setItem('accessToken', newToken);
      setToken(newToken);
   };

   // Function to remove the token from localStorage and state
   const removeToken = () => {
      localStorage.removeItem('accessToken');
      setToken(null);
   };

   // Return the current token, and methods to save/remove it
   return { token, saveToken, removeToken };
}

export default useToken;

