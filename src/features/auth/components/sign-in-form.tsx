'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { signInSchema } from '../schemas/auth.schema';

export function SignInForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isPending, setIsPending] = useState(false);
    const [isGooglePending, setIsGooglePending] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        const validation = signInSchema.safeParse(formData);

        if (!validation.success) {
            const fieldErrors: Record<string, string> = {};

            for (const issue of validation.error.issues) {
                const field = issue.path[0];

                if (typeof field === 'string' && !fieldErrors[field]) {
                    fieldErrors[field] = issue.message;
                }
            }

            setErrors(fieldErrors);
            return;
        }

        setIsPending(true);

        try {
            const { error } = await authClient.signIn.email({
                email: validation.data.email,
                password: validation.data.password,
            });

            if (error) {
                toast.error(error.message || 'Invalid email or password');
                return;
            }

            toast.success('Signed in successfully!');
            router.push('/');
            router.refresh();
        } catch {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsPending(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsGooglePending(true);

        try {
            const { error } = await authClient.signIn.social({
                provider: 'google',
                callbackURL: '/',
            });

            if (error) {
                toast.error(error.message || 'Google sign-in failed');
                setIsGooglePending(false);
            }
        } catch {
            toast.error('Something went wrong. Please try again.');
            setIsGooglePending(false);
        }
    };

    return (
        <div className="space-y-5">
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                    </label>

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isPending}
                    />

                    {errors.email && (
                        <p className="text-sm text-destructive">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                        Password
                    </label>

                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isPending}
                    />

                    {errors.password && (
                        <p className="text-sm text-destructive">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending || isGooglePending}
                >
                    {isPending ? 'Signing in...' : 'Sign In'}
                </Button>
            </form>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                </div>

                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-3 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>

            {/* Google */}
            <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={isPending || isGooglePending}
            >
                {isGooglePending ? 'Redirecting...' : 'Continue with Google'}
            </Button>
        </div>
    );
}
