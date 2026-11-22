'use client';

import Link from 'next/link';
import { toast } from 'sonner';

import { useDeleteMenu, useVendorMenu } from '../hooks/use-menu';

export function VendorMenuTable() {
    const { data: items = [], isLoading, isError, error } = useVendorMenu();

    const deleteMutation = useDeleteMenu();

    async function handleDelete(id: string) {
        const confirmed = window.confirm(
            'Are you sure you want to delete this menu item?',
        );

        if (!confirmed) return;

        try {
            await deleteMutation.mutateAsync(id);

            toast.success('Menu item deleted successfully.');
        } catch (err) {
            toast.error(
                err instanceof Error
                    ? err.message
                    : 'Failed to delete menu item.',
            );
        }
    }

    if (isLoading) {
        return <p className="py-10 text-center">Loading your menu...</p>;
    }

    if (isError) {
        return (
            <p role="alert" className="py-10 text-center text-destructive">
                {error.message}
            </p>
        );
    }

    if (!items.length) {
        return (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
                <h3 className="text-xl font-semibold">No menu items yet</h3>

                <p className="mt-2 text-muted-foreground">
                    Add your first pizza to get started.
                </p>

                <Link
                    href="/dashboard/vendor/menu/create"
                    className="mt-5 inline-flex rounded-xl bg-primary px-5 py-3 text-primary-foreground"
                >
                    Create menu item
                </Link>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-175 text-left text-sm">
                <thead className="bg-muted/60">
                    <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item) => (
                        <tr key={item._id} className="border-t border-border">
                            <td className="p-4 font-medium">{item.name}</td>

                            <td className="p-4">{item.category}</td>

                            <td className="p-4">
                                ৳{item.price.toLocaleString('en-BD')}
                            </td>

                            <td className="p-4">
                                <span className="rounded-full bg-muted px-3 py-1 text-xs capitalize">
                                    {item.status}
                                </span>
                            </td>

                            <td className="space-x-3 p-4">
                                <Link
                                    href={`/dashboard/vendor/menu/${item._id}`}
                                    className="font-medium text-primary hover:underline"
                                >
                                    View
                                </Link>

                                <Link
                                    href={`/dashboard/vendor/menu/${item._id}/edit`}
                                    className="font-medium text-primary hover:underline"
                                >
                                    Edit
                                </Link>

                                <button
                                    type="button"
                                    disabled={deleteMutation.isPending}
                                    onClick={() => handleDelete(item._id)}
                                    className="font-medium text-destructive disabled:opacity-50"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
