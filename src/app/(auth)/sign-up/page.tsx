import Link from 'next/link';

import { SignUpForm } from '@/features/auth/components/sign-up-form';

export default function SignUpPage() {
    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">
                    Create your account
                </h1>

                <p className="text-muted-foreground">
                    Join PizzaHub and enjoy delicious pizzas.
                </p>
            </div>

            <SignUpForm />

            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                    href="/sign-in"
                    className="font-medium text-primary hover:underline"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
}
