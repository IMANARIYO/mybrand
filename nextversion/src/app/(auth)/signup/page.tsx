import Logo from '@/components/ui/logo';
import SignupForm from '@/components/ui/signup-form';
import { Suspense } from 'react';
 
export default function SignupPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-background">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-6 p-4">
        <div className="flex justify-center items-center p-6">
          <Logo />
        </div>
        <Suspense>
          <SignupForm />
        </Suspense>
      </div>
    </main>
  );
}