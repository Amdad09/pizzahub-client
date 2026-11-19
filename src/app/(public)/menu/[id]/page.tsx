'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MenuGallery } from '@/features/menu/components/menu-gallery';
import { useMenuDetails } from '@/features/menu/hooks/use-menu';
import { OrderForm } from '@/features/orders/components/order-form';

export default function MenuDetailsPage() {
    const params = useParams<{ id: string }>();
    const { data: item, isLoading, isError } = useMenuDetails(params.id);

    if (isLoading) {
        return (
            <main className="mx-auto max-w-7xl px-6 py-20">
                Loading menu item...
            </main>
        );
    }

    if (isError || !item) {
        return (
            <main className="mx-auto max-w-7xl px-6 py-20 text-center">
                <h1 className="text-2xl font-bold">Menu item not found</h1>
                <Link href="/menu" className="mt-4 inline-block text-primary">
                    Back to menu
                </Link>
            </main>
        );
    }

    return (
        <main className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-2">
            <MenuGallery images={item.images} name={item.name} />

            <div className="flex flex-col justify-center">
                <Link href="/menu" className="mb-8 text-sm text-primary">
                    ← Back to menu
                </Link>

                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                    {item.category}
                </p>

                <h1 className="mt-3 text-4xl font-bold">{item.name}</h1>

                <p className="mt-5 leading-8 text-muted-foreground">
                    {item.description}
                </p>

                <p className="mt-8 text-3xl font-bold text-primary">
                    ৳{item.price}
                </p>

                <div className="mt-8 space-y-3 border-t border-border pt-6">
                    <p className="text-sm text-muted-foreground">Prepared by</p>
                    <p className="font-semibold">{item.vendorName}</p>
                    <p className="text-sm text-muted-foreground">
                        {item.location}
                    </p>
                </div>
                <div className="mt-10 border-t border-border pt-8">
                    <h2 className="mb-5 text-2xl font-bold">
                        Place Your Order
                    </h2>
                    <OrderForm menuItem={item} />
                </div>
            </div>
        </main>
    );
}
