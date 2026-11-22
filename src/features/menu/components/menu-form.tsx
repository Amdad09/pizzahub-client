/* eslint-disable react-hooks/set-state-in-effect */

'use client';

import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import type { MenuInput, MenuItem } from '../types';
import {
    useCreateMenu,
    useUpdateMenu,
    useUploadMenuImage,
} from '../hooks/use-menu';
import { menuFormSchema } from '../shcemas';

interface MenuFormProps {
    initialData?: MenuItem;
}

const initialValues: MenuInput = {
    name: '',
    description: '',
    price: 0,
    category: '',
    location: '',
    images: [],
};

const MAX_IMAGES = 4;
const MAX_FILE_SIZE = 4 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function MenuForm({ initialData }: MenuFormProps) {
    const router = useRouter();

    const createMutation = useCreateMenu();
    const updateMutation = useUpdateMenu();
    const uploadMutation = useUploadMenuImage();

    const [form, setForm] = useState<MenuInput>(initialValues);
    const [error, setError] = useState('');

    const isEditing = Boolean(initialData);

    const isPending =
        createMutation.isPending ||
        updateMutation.isPending ||
        uploadMutation.isPending;

    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name,
                description: initialData.description,
                price: initialData.price,
                category: initialData.category,
                location: initialData.location,
                images: initialData.images,
            });
        }
    }, [initialData]);

    function updateField<K extends keyof MenuInput>(
        key: K,
        value: MenuInput[K],
    ) {
        setForm((current) => ({
            ...current,
            [key]: value,
        }));
    }

    async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
        const files = Array.from(event.target.files ?? []);

        if (!files.length) return;

        setError('');

        const remainingSlots = MAX_IMAGES - form.images.length;
        const selectedFiles = files.slice(0, remainingSlots);
        const uploadErrors: string[] = [];

        if (remainingSlots <= 0) {
            const message = 'Maximum 4 images are allowed.';
            setError(message);
            toast.error(message);
            event.target.value = '';
            return;
        }

        if (files.length > remainingSlots) {
            uploadErrors.push(
                `Only ${remainingSlots} more image(s) can be uploaded.`,
            );
        }

        for (const file of selectedFiles) {
            if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
                uploadErrors.push(
                    `${file.name}: Only JPG, PNG and WebP images are allowed.`,
                );
                continue;
            }

            if (file.size > MAX_FILE_SIZE) {
                uploadErrors.push(
                    `${file.name}: Image size must be under 4MB.`,
                );
                continue;
            }

            try {
                const base64 = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onload = () => {
                        const result = reader.result;

                        if (typeof result !== 'string') {
                            reject(new Error('Could not read image.'));
                            return;
                        }

                        resolve(result.split(',')[1] ?? '');
                    };

                    reader.onerror = () => {
                        reject(new Error('Could not read image.'));
                    };

                    reader.readAsDataURL(file);
                });

                const result = await uploadMutation.mutateAsync(base64);

                setForm((current) => ({
                    ...current,
                    images: [...current.images, result.url],
                }));
            } catch (err) {
                uploadErrors.push(
                    `${file.name}: ${
                        err instanceof Error
                            ? err.message
                            : 'Image upload failed.'
                    }`,
                );
            }
        }

        if (uploadErrors.length > 0) {
            const message = uploadErrors.join(' ');
            setError(message);
            toast.error(message);
        } else {
            toast.success('Image uploaded successfully.');
        }

        event.target.value = '';
    }

    function removeImage(index: number) {
        setForm((current) => ({
            ...current,
            images: current.images.filter(
                (_, imageIndex) => imageIndex !== index,
            ),
        }));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');

        if (uploadMutation.isPending) {
            const message = 'Please wait until image uploads finish.';
            setError(message);
            toast.error(message);
            return;
        }

        const parsed = menuFormSchema.safeParse(form);

        if (!parsed.success) {
            const message =
                parsed.error.issues[0]?.message ?? 'Invalid form data.';

            setError(message);
            toast.error(message);
            return;
        }

        try {
            if (initialData) {
                await updateMutation.mutateAsync({
                    id: initialData._id,
                    input: parsed.data,
                });

                toast.success('Menu item updated successfully.');
            } else {
                await createMutation.mutateAsync(parsed.data);

                toast.success('Menu item created successfully.');
            }

            router.push('/dashboard/vendor/menu');
            router.refresh();
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Something went wrong.';

            setError(message);
            toast.error(message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="name" className="text-sm font-medium">
                        Pizza name
                    </label>

                    <input
                        id="name"
                        required
                        minLength={3}
                        maxLength={100}
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="h-11 w-full rounded-xl border border-input bg-background px-4"
                        placeholder="e.g. Classic Margherita"
                    />
                </div>

                <div className="space-y-2 sm:col-span-2">
                    <label
                        htmlFor="description"
                        className="text-sm font-medium"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        required
                        minLength={10}
                        maxLength={2000}
                        rows={5}
                        value={form.description}
                        onChange={(e) =>
                            updateField('description', e.target.value)
                        }
                        className="w-full rounded-xl border border-input bg-background p-4"
                        placeholder="Describe your pizza..."
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="price" className="text-sm font-medium">
                        Price (৳)
                    </label>

                    <input
                        id="price"
                        type="number"
                        required
                        min="1"
                        max="100000"
                        value={form.price || ''}
                        onChange={(e) =>
                            updateField('price', Number(e.target.value))
                        }
                        className="h-11 w-full rounded-xl border border-input bg-background px-4"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                        Category
                    </label>

                    <select
                        id="category"
                        required
                        value={form.category}
                        onChange={(e) =>
                            updateField('category', e.target.value)
                        }
                        className="h-11 w-full rounded-xl border border-input bg-background px-4"
                    >
                        <option value="">Select category</option>
                        <option value="Margherita">Margherita</option>
                        <option value="Pepperoni">Pepperoni</option>
                        <option value="BBQ">BBQ</option>
                        <option value="Cheese">Cheese</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Special">Special</option>
                    </select>
                </div>

                <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="location" className="text-sm font-medium">
                        Restaurant location
                    </label>

                    <input
                        id="location"
                        required
                        value={form.location}
                        onChange={(e) =>
                            updateField('location', e.target.value)
                        }
                        className="h-11 w-full rounded-xl border border-input bg-background px-4"
                        placeholder="e.g. Dhanmondi, Dhaka"
                    />
                </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
                <label className="text-sm font-medium">
                    Pizza images ({form.images.length}/{MAX_IMAGES})
                </label>

                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    disabled={
                        uploadMutation.isPending ||
                        form.images.length >= MAX_IMAGES
                    }
                    onChange={handleImageUpload}
                    className="block w-full cursor-pointer rounded-xl border border-input bg-background p-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-secondary file:px-4 file:py-2 file:font-medium"
                />

                {uploadMutation.isPending && (
                    <p className="text-sm text-muted-foreground">
                        Uploading images...
                    </p>
                )}

                {form.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {form.images.map((image, index) => (
                            <div
                                key={`${image}-${index}`}
                                className="relative overflow-hidden rounded-xl border border-border"
                            >
                                <img
                                    src={image}
                                    alt={`Pizza image ${index + 1}`}
                                    className="aspect-square w-full object-cover"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute right-2 top-2 rounded-lg bg-black/70 px-2 py-1 text-xs text-white"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <p className="text-xs text-muted-foreground">
                    JPG, PNG or WebP. Maximum 4 images, 4MB per image. You can
                    select multiple images at once.
                </p>
            </div>

            {error && (
                <p role="alert" className="text-sm text-destructive">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-50 sm:w-auto"
            >
                {uploadMutation.isPending
                    ? 'Uploading images...'
                    : isPending
                      ? 'Saving...'
                      : isEditing
                        ? 'Update Menu Item'
                        : 'Submit Menu Item'}
            </button>
        </form>
    );
}
