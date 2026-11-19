import Link from 'next/link';
import { MenuForm } from '@/features/menu/components/menu-form';

export default function CreateMenuPage() {
    return (
        <main className="mx-auto max-w-3xl space-y-8 px-6 py-12">
            <div>
                <Link href="/dashboard/vendor/menu" className="text-sm text-primary">
                    ← Back to my menu
                </Link>
                <h1 className="mt-5 text-3xl font-bold">Add a Menu Item</h1>
                <p className="mt-2 text-muted-foreground">
                    Add your pizza details and submit it for approval.
                </p>
            </div>

            <MenuForm />
        </main>
    );
}
