"use client";
import { getUser } from "@/app/actions/auth";
import useToken from "@/hook/useToken";
import { createContext, useContext, useEffect, useState } from "react";

// Define user context type
interface User extends StudentType {
   // Add other fields as needed
}

interface UserContextType {
   user: User | null;
   setUser: (user: User | null) => void;
   logout: () => void;
   isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
   const { token } = useToken();
   const [user, setUser] = useState<User | null>(null);
   const [isLoading, setIsLoading] = useState(false);
    
   useEffect(() => {
      if (typeof window !== "undefined") {
         setIsLoading(true);
        const storedUser = localStorage.getItem("user");
        if (storedUser !== null) {
            try {
               setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing stored user:", error);
                localStorage.removeItem("user"); 
            } finally {
               setIsLoading(false);
            }
        }
    }
   }, []);

   useEffect(() => {
      if (!token || user) return;

      const fetchUser = async () => {
         setIsLoading(true);
         try {
            const { success, error } = await getUser();
            if (success) {
               setUser(success.data);
               localStorage.setItem("user", JSON.stringify(success.data));
            } else {
               console.error("User fetch error:", error?.message);
            }
         } catch (err) {
            console.error("Unexpected error fetching user:", err);
         } finally { setIsLoading(false); }
      };

      fetchUser();
   }, [token, user]);

   const logout = () => {
      setUser(null);
      if (typeof window !== "undefined") {
         localStorage.removeItem("user");
      }
   };

   return (
      <UserContext.Provider value={{ user, isLoading, setUser, logout }}>
         {children}
      </UserContext.Provider>
   );
};

// Custom hook to use the UserContext
export const useUser = () => {
   const context = useContext(UserContext);
   if (!context) {
      throw new Error("useUser must be used within a UserProvider");
   }
   return context;
};
