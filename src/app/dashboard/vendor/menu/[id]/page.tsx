'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock,
    Edit,
    MapPin,
    Package,
    ShieldAlert,
    Trash2,
    UtensilsCrossed,
    XCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { MenuGallery } from '@/features/menu/components/menu-gallery';
import {
    useDeleteMenu,
    useVendorMenuDetails,
} from '@/features/menu/hooks/use-menu';

import type { MenuStatus } from '@/features/menu/types';
import { toast } from 'sonner';

const statusConfig: Record<MenuStatus, { label: string; className: string }> = {
    pending: {
        label: 'Pending Review',
        className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    approved: {
        label: 'Approved',
        className: 'bg-green-500/10 text-green-600 dark:text-green-400',
    },
    rejected: {
        label: 'Rejected',
        className: 'bg-destructive/10 text-destructive',
    },
    inactive: {
        label: 'Inactive',
        className: 'bg-muted text-muted-foreground',
    },
};

function formatDate(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return 'Not available';
    }

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default function VendorMenuDetailsPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();

    const { data, isLoading, isError } = useVendorMenuDetails(params.id);

    const deleteMutation = useDeleteMenu();

    const item = data;
    const status = item ? statusConfig[item.status] : null;

    const handleDelete = async () => {
        if (!item) return;

        try {
            await deleteMutation.mutateAsync(item._id);

            toast.success('Menu item deleted successfully.');

            router.push('/dashboard/vendor/menu');
            router.refresh();
        } catch {
            toast.error('Failed to delete menu item. Please try again.');
        }
    };

    if (isLoading) {
        return (
            <div className="mx-auto w-full max-w-7xl space-y-8 p-4 md:p-8">
                <div className="h-8 w-40 animate-pulse rounded bg-muted" />

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="aspect-square animate-pulse rounded-2xl bg-muted" />

                    <div className="space-y-5">
                        <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
                        <div className="h-5 w-1/3 animate-pulse rounded bg-muted" />
                        <div className="h-12 w-1/2 animate-pulse rounded bg-muted" />
                        <div className="h-28 animate-pulse rounded bg-muted" />
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !item || !status) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-destructive/10">
                    <Package className="size-8 text-destructive" />
                </div>

                <h1 className="text-2xl font-bold">Menu Item Not Found</h1>

                <p className="mt-2 max-w-md text-muted-foreground">
                    We could not find this menu item. It may have been deleted
                    or you may not have permission to view it.
                </p>

                <Link
                    href="/dashboard/vendor/menu"
                    className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    <ArrowLeft className="mr-2 size-4" />
                    Back to My Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-7xl space-y-8 p-4 pb-12 md:p-8">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Link
                    href="/dashboard/vendor/menu"
                    className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    <ArrowLeft className="mr-2 size-4" />
                    Back to My Menu
                </Link>

                <div className="flex flex-wrap gap-2">
                    <Link
                        href={`/dashboard/vendor/menu/${item._id}/edit`}
                        className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                        <Edit className="mr-2 size-4" />
                        Edit Item
                    </Link>

                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending}
                    >
                        <Trash2 className="mr-2 size-4" />
                        {deleteMutation.isPending
                            ? 'Deleting...'
                            : 'Delete Item'}
                    </Button>
                </div>
            </div>

            {/* Product Overview */}
            <section className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="min-w-0">
                    <MenuGallery images={item.images} name={item.name} />
                </div>

                <div className="space-y-6">
                    {/* Status */}
                    <div className="flex flex-wrap items-center gap-3">
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold ${status.className}`}
                        >
                            {status.label}
                        </span>

                        <span className="text-sm text-muted-foreground">
                            Menu ID: {item._id}
                        </span>
                    </div>

                    {/* Title */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                            <UtensilsCrossed className="size-4" />
                            {item.category}
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                            {item.name}
                        </h1>

                        <p className="text-base leading-8 text-muted-foreground">
                            {item.description}
                        </p>
                    </div>

                    {/* Price */}
                    <div className="rounded-2xl border bg-card p-5">
                        <p className="text-sm font-medium text-muted-foreground">
                            Product Price
                        </p>

                        <p className="mt-1 text-3xl font-bold text-primary">
                            ৳{item.price.toLocaleString('en-BD')}
                        </p>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center justify-between rounded-xl border bg-card p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                                {item.isActive ? (
                                    <CheckCircle2 className="size-5 text-green-600" />
                                ) : (
                                    <XCircle className="size-5 text-muted-foreground" />
                                )}
                            </div>

                            <div>
                                <p className="font-semibold">Availability</p>
                                <p className="text-sm text-muted-foreground">
                                    {item.isActive
                                        ? 'Visible as active'
                                        : 'Currently unavailable'}
                                </p>
                            </div>
                        </div>

                        <span
                            className={`text-sm font-semibold ${
                                item.isActive
                                    ? 'text-green-600'
                                    : 'text-muted-foreground'
                            }`}
                        >
                            {item.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
            </section>

            {/* Rejection Reason */}
            {item.status === 'rejected' && item.rejectionReason && (
                <section className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 md:p-6">
                    <div className="flex items-start gap-3">
                        <ShieldAlert className="mt-0.5 size-6 shrink-0 text-destructive" />

                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold text-destructive">
                                Admin Feedback
                            </h2>

                            <p className="leading-7 text-muted-foreground">
                                {item.rejectionReason}
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* Product Information */}
            <section className="space-y-5">
                <div>
                    <h2 className="text-2xl font-bold">Product Information</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Details and information about your menu item.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <InfoCard
                        icon={<UtensilsCrossed className="size-5" />}
                        label="Category"
                        value={item.category}
                    />

                    <InfoCard
                        icon={<MapPin className="size-5" />}
                        label="Location"
                        value={item.location}
                    />

                    <InfoCard
                        icon={<Package className="size-5" />}
                        label="Vendor"
                        value={item.vendorName}
                    />

                    <InfoCard
                        icon={<CalendarDays className="size-5" />}
                        label="Created At"
                        value={formatDate(item.createdAt)}
                    />

                    <InfoCard
                        icon={<Clock className="size-5" />}
                        label="Last Updated"
                        value={formatDate(item.updatedAt)}
                    />

                    <InfoCard
                        icon={<CheckCircle2 className="size-5" />}
                        label="Approval Status"
                        value={status.label}
                    />
                </div>
            </section>
        </div>
    );
}

function InfoCard({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-3 rounded-xl border bg-card p-5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="mt-1 wrap-break-word font-semibold">{value}</p>
            </div>
        </div>
    );
}
