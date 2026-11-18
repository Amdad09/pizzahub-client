'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signUpSchema } from '../schemas/auth.schema';
import { authClient } from '@/lib/auth-client';

type Role = 'customer' | 'vendor';

export function SignUpForm() {
    const router = useRouter();

    const [role, setRole] = useState<Role>('customer');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isPending, setIsPending] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        businessName: '',
    });

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        const payload = {
            ...formData,
            role,
            businessName: role === 'vendor' ? formData.businessName : undefined,
        };

        const validation = signUpSchema.safeParse(payload);

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
            const { data, error } = await authClient.signUp.email({
                name: validation.data.name,
                email: validation.data.email,
                password: validation.data.password,
                role: validation.data.role,
                businessName: validation.data.businessName ?? '',
            });

            if (error) {
                toast.error(error.message || 'Registration failed');
                return;
            }

            if (data) {
                toast.success('Account created successfully!');
                router.push('/');
                router.refresh();
            }
        } catch {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsPending(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Account Type */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Account Type</label>

                <div className="grid grid-cols-2 gap-3">
                    {(['customer', 'vendor'] as const).map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => {
                                setRole(item);
                                setErrors({});
                            }}
                            className={`rounded-lg border p-3 text-sm font-medium capitalize transition-colors ${
                                role === item
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'border-border hover:bg-muted'
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                </label>

                <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isPending}
                />

                {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                )}
            </div>

            {/* Vendor Business Name */}
            {role === 'vendor' && (
                <div className="space-y-2">
                    <label
                        htmlFor="businessName"
                        className="text-sm font-medium"
                    >
                        Restaurant Name
                    </label>

                    <Input
                        id="businessName"
                        name="businessName"
                        placeholder="Your Pizza Restaurant"
                        value={formData.businessName}
                        onChange={handleChange}
                        disabled={isPending}
                    />

                    {errors.businessName && (
                        <p className="text-sm text-destructive">
                            {errors.businessName}
                        </p>
                    )}
                </div>
            )}

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
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isPending}
                />

                {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
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
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isPending}
                />

                {errors.password && (
                    <p className="text-sm text-destructive">
                        {errors.password}
                    </p>
                )}

                <p className="text-xs text-muted-foreground">
                    Password must be at least 6 characters long.
                </p>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Creating account...' : 'Create Account'}
            </Button>
        </form>
    );
}
