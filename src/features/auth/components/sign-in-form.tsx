'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Store, UserRound, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { signInSchema } from '../schemas/auth.schema';

const demoAccounts = [
    {
        role: 'Admin',
        email: 'admin@example.com',
        password: 'YourStrongPassword123',
        icon: ShieldCheck,
        description: 'Explore admin dashboard',
        color: 'text-amber-600 bg-amber-500/10',
    },
    {
        role: 'Vendor',
        email: 'amdad@gmail.com',
        password: 'Amdad2026',
        icon: Store,
        description: 'Explore vendor dashboard',
        color: 'text-emerald-600 bg-emerald-500/10',
    },
    {
        role: 'Customer',
        email: 'asif@gmail.com',
        password: 'Amdad2026',
        icon: UserRound,
        description: 'Explore customer dashboard',
        color: 'text-blue-600 bg-blue-500/10',
    },
];

export function SignInForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isPending, setIsPending] = useState(false);
    const [isGooglePending, setIsGooglePending] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    const handleDemoAccount = (email: string, password: string) => {
        setFormData({ email, password });
        setErrors({});
        toast.success('Demo credentials filled successfully!');
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
            {/* Demo Accounts */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-brand-tomato" />

                    <h3 className="text-sm font-semibold">Quick Demo Access</h3>
                </div>

                <p className="text-xs leading-5 text-muted-foreground">
                    Choose a demo account to automatically fill in the login
                    credentials.
                </p>

                <div className="grid grid-cols-3 gap-2">
                    {demoAccounts.map((account) => {
                        const Icon = account.icon;

                        return (
                            <button
                                key={account.role}
                                type="button"
                                disabled={isPending || isGooglePending}
                                onClick={() =>
                                    handleDemoAccount(
                                        account.email,
                                        account.password,
                                    )
                                }
                                className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-3 text-center transition-all hover:border-brand-tomato/50 hover:bg-brand-tomato/5 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span
                                    className={`flex size-10 items-center justify-center rounded-xl ${account.color}`}
                                >
                                    <Icon className="size-5" />
                                </span>

                                <span className="text-xs font-bold">
                                    {account.role}
                                </span>

                                <span className="text-[10px] text-muted-foreground">
                                    Select account
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                </div>

                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-3 text-muted-foreground">
                        Sign in with credentials
                    </span>
                </div>
            </div>

            {/* Sign In Form */}
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
                        disabled={isPending || isGooglePending}
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
                        disabled={isPending || isGooglePending}
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
                    <span className="bg-card px-3 text-muted-foreground">
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
