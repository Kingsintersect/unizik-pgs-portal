import CustomCard from '@/components/CustomCard';
import Profile from '@/components/ui/student/Profile';

const CreateAccount = () => {
   return (
      <CustomCard
         className=''
         title="Profile"
         titleClassName='text-3xl font-bold tracking-tight text-cyan-700 dark:text-cyan-200 flex justify-center items-center mb-5 text-center'
      >
         <Profile />
      </CustomCard>
   )
}

export default CreateAccount