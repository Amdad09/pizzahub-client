'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { useCreateOrder } from '../hooks/use-orders';
import type { MenuItem } from '@/features/menu/types';

const orderFormSchema = z.object({
    quantity: z.number().int().min(1).max(20),
    deliveryDate: z.string().min(1, 'Delivery date is required.'),
    deliveryAddress: z.string().trim().min(10).max(300),
    phone: z
        .string()
        .trim()
        .regex(/^\+?[0-9\s()-]{8,20}$/),
    note: z.string().trim().max(500).optional(),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

interface OrderFormProps {
    menuItem: MenuItem;
}

export function OrderForm({ menuItem }: OrderFormProps) {
    const router = useRouter();
    const createOrder = useCreateOrder();
    const [quantity, setQuantity] = useState(1);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OrderFormValues>({
        resolver: zodResolver(orderFormSchema),
        defaultValues: {
            quantity: 1,
            deliveryDate: '',
            deliveryAddress: '',
            phone: '',
            note: '',
        },
    });

    const onSubmit = async (values: OrderFormValues) => {
        try {
            const order = await createOrder.mutateAsync({
                menuItemId: menuItem._id,
                ...values,
            });

            toast.success('Your order has been placed successfully.');
            router.push(`/dashboard/customer/orders/${order._id}`);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Failed to place your order.',
            );
        }
    };

    const totalPrice = menuItem.price * quantity;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="rounded-2xl border bg-card p-5">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h3 className="font-semibold">{menuItem.name}</h3>
                        <p className="text-sm text-muted-foreground">
                            {menuItem.vendorName}
                        </p>
                    </div>

                    <p className="font-bold">
                        ৳{menuItem.price.toLocaleString('en-BD')}
                    </p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                    <label htmlFor="quantity" className="font-medium">
                        Quantity
                    </label>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                setQuantity((current) =>
                                    Math.max(1, current - 1),
                                )
                            }
                            className="h-9 w-9 rounded-lg border"
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>

                        <span className="min-w-6 text-center font-semibold">
                            {quantity}
                        </span>

                        <button
                            type="button"
                            onClick={() =>
                                setQuantity((current) =>
                                    Math.min(20, current + 1),
                                )
                            }
                            className="h-9 w-9 rounded-lg border"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>

                    <input
                        type="hidden"
                        {...register('quantity')}
                        value={quantity}
                    />
                </div>

                <div className="mt-5 flex justify-between border-t pt-4">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-primary">
                        ৳{totalPrice.toLocaleString('en-BD')}
                    </span>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="deliveryDate" className="text-sm font-medium">
                    Delivery Date
                </label>
                <input
                    id="deliveryDate"
                    type="date"
                    min={new Date().toISOString().slice(0, 10)}
                    {...register('deliveryDate')}
                    className="w-full rounded-xl border bg-background px-4 py-3"
                />
                {errors.deliveryDate && (
                    <p className="text-sm text-destructive">
                        {errors.deliveryDate.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="deliveryAddress"
                    className="text-sm font-medium"
                >
                    Delivery Address
                </label>
                <textarea
                    id="deliveryAddress"
                    rows={3}
                    placeholder="Enter your complete delivery address"
                    {...register('deliveryAddress')}
                    className="w-full rounded-xl border bg-background px-4 py-3"
                />
                {errors.deliveryAddress && (
                    <p className="text-sm text-destructive">
                        {errors.deliveryAddress.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                </label>
                <input
                    id="phone"
                    type="tel"
                    placeholder="01712345678"
                    {...register('phone')}
                    className="w-full rounded-xl border bg-background px-4 py-3"
                />
                {errors.phone && (
                    <p className="text-sm text-destructive">
                        {errors.phone.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="note" className="text-sm font-medium">
                    Additional Note (Optional)
                </label>
                <textarea
                    id="note"
                    rows={2}
                    placeholder="Any special instructions?"
                    {...register('note')}
                    className="w-full rounded-xl border bg-background px-4 py-3"
                />
            </div>

            <button
                type="submit"
                disabled={createOrder.isPending}
                className="w-full rounded-xl bg-primary px-5 py-4 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {createOrder.isPending
                    ? 'Placing Order...'
                    : `Place Order · ৳${totalPrice.toLocaleString('en-BD')}`}
            </button>
        </form>
    );
}
