import Banner from '@/components/ui/student/Banner'
import SSOForm from '@/components/ui/auth/SSO'
import { CenteredSection } from '@/components/ui/application/sections/Section'
import { Suspense } from 'react'

const SignOn = () => {
  return (
    <div className="container flex items-center justify-center min-h-screen bg-white text-black">
      <CenteredSection classList='min-h-[450px] w-[50vw] mx-auto p-0' title={''}>
        <Banner />
        {/* <h1 className='text-2xl my-2'>Login to your account</h1> */}
        <div className="grid grid-cols-2 py-10 px-20 items-center justify-center gap-7">
          <div className="form">
            <Suspense>
              <SSOForm />
            </Suspense>
          </div>
          <div className="note text-lg font-bold text-left text-orange-600"> Sign Into the LMS to Begin studies</div>
        </div>
      </CenteredSection>
    </div>
  )
}

export default SignOn