import Logo from '@/components/ui/logo';
import LoginForm from '@/app/(auth)/login/_login_components/login-form';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-background">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-6 p-4">
        <div className="flex justify-center items-center p-6">
          <Logo />
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}