import Profile from '@/components/ui/student/Profile';
import { Card } from 'flowbite-react';

const CreateAccount = () => {
   return (
      <Card className="">
         <h5 className="text-3xl font-bold tracking-tight text-cyan-700 dark:text-cyan-200 flex justify-center items-center mb-5 text-center">
            Profile
         </h5>
         <Profile />
      </Card>
   )
}

export default CreateAccount