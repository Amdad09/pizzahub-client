import Link from 'next/link';
import { VendorMenuTable } from '@/features/menu/components/vendor-menu-table';

export default function VendorMenuPage() {
    return (
        <main className="mx-auto max-w-7xl space-y-8 px-6 py-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">My Menu</h1>
                    <p className="mt-2 text-muted-foreground">
                        Manage your restaurant menu items.
                    </p>
                </div>

                <Link
                    href="/dashboard/vendor/menu/create"
                    className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground"
                >
                    + Add Menu Item
                </Link>
            </div>

            <VendorMenuTable />
        </main>
    );
}
