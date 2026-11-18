import Link from 'next/link';

import { SignInForm } from '@/features/auth/components/sign-in-form';

export default function SignInPage() {
    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">
                    Welcome back
                </h1>

                <p className="text-muted-foreground">
                    Sign in to your PizzaHub account.
                </p>
            </div>

            <SignInForm />

            <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link
                    href="/sign-up"
                    className="font-medium text-primary hover:underline"
                >
                    Create account
                </Link>
            </p>
        </div>
    );
}
