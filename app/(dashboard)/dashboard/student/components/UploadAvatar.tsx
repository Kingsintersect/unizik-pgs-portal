"use client";

import Image from "next/image";
import { useState } from "react";

interface UploadAvatarProps {
   imageUrl: string;
}

const UploadAvatar = ({ imageUrl }: UploadAvatarProps) => {
   const [avatar, setAvatar] = useState(imageUrl);

   const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
         const imageUrl = URL.createObjectURL(file);
         setAvatar(imageUrl); // You should upload it to the server
      }
   };

   return (
      <div className="relative w-24 h-24 mx-auto">
         <div className="relative h-[100px] w-[200px]">
            <Image
                src={'/random/rand1.jpg'}
                alt={'banner'}
                fill
                style={{ objectFit: "cover" }}
                className="border-2 border-gray-300"
            />
        </div>
         <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer">
            📷
            <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
         </label>
      </div>
   );
};

export default UploadAvatar;
