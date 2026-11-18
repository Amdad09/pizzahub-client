'use client';

import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

interface ProfileFormProps {
    name: string;
    email: string;
    role: 'customer' | 'vendor' | 'admin';
    businessName?: string;
}

export function ProfileForm({
    name: initialName,
    email,
    role,
    businessName: initialBusinessName = '',
}: ProfileFormProps) {
    const [name, setName] = useState(initialName);
    const [businessName, setBusinessName] = useState(initialBusinessName);
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!name.trim()) {
            toast.error('Name is required');
            return;
        }

        setIsPending(true);

        try {
            const result = await authClient.updateUser({
                name: name.trim(),
                ...(role === 'vendor'
                    ? { businessName: businessName.trim() }
                    : {}),
            });

            if (result.error) {
                toast.error(result.error.message || 'Failed to update profile');
                return;
            }

            toast.success('Profile updated successfully');
        } catch {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsPending(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl space-y-6 rounded-xl border bg-card p-6"
        >
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                </label>
                <input
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    maxLength={100}
                    className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                    className="w-full cursor-not-allowed rounded-lg border bg-muted px-4 py-3 text-sm text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">
                    Email address cannot be changed here.
                </p>
            </div>

            {role === 'vendor' && (
                <div className="space-y-2">
                    <label
                        htmlFor="businessName"
                        className="text-sm font-medium"
                    >
                        Business Name
                    </label>
                    <input
                        id="businessName"
                        value={businessName}
                        onChange={(event) =>
                            setBusinessName(event.target.value)
                        }
                        maxLength={100}
                        className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>
            )}

            <div className="space-y-2">
                <label className="text-sm font-medium">Account Role</label>
                <input
                    value={role.charAt(0).toUpperCase() + role.slice(1)}
                    disabled
                    className="w-full cursor-not-allowed rounded-lg border bg-muted px-4 py-3 text-sm text-muted-foreground"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isPending ? 'Saving...' : 'Save Changes'}
            </button>
        </form>
    );
}
