'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MenuForm } from '@/features/menu/components/menu-form';
import { useVendorMenuDetails } from '@/features/menu/hooks/use-menu';

export default function EditMenuPage() {
    const { id } = useParams<{ id: string }>();
    const { data: item, isLoading, isError } = useVendorMenuDetails(id);

    if (isLoading) {
        return <main className="p-10">Loading menu item...</main>;
    }

    if (isError || !item) {
        return <main className="p-10">Menu item not found.</main>;
    }

    return (
        <main className="mx-auto max-w-3xl space-y-8 px-6 py-12">
            <div>
                <Link href="/dashboard/vendor/menu" className="text-sm text-primary">
                    ← Back to my menu
                </Link>
                <h1 className="mt-5 text-3xl font-bold">Edit Menu Item</h1>
                <p className="mt-2 text-muted-foreground">
                    Changes will be submitted for approval again.
                </p>
            </div>

            <MenuForm initialData={item} />
        </main>
    );
}
