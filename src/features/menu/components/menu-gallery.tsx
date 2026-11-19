'use client';

import Image from 'next/image';
import { useState } from 'react';

interface MenuGalleryProps {
    images: string[];
    name: string;
}

export function MenuGallery({ images, name }: MenuGalleryProps) {
    const [activeImage, setActiveImage] = useState(0);

    if (!images.length) {
        return (
            <div className="flex aspect-square items-center justify-center rounded-2xl bg-muted">
                No image available
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
                <Image
                    src={images[activeImage]}
                    alt={name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                />
            </div>

            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                    {images.map((image, index) => (
                        <button
                            key={image}
                            type="button"
                            onClick={() => setActiveImage(index)}
                            className={`relative aspect-square overflow-hidden rounded-xl border-2 ${
                                activeImage === index
                                    ? 'border-primary'
                                    : 'border-transparent'
                            }`}
                        >
                            <Image
                                src={image}
                                alt={`${name} image ${index + 1}`}
                                fill
                                sizes="120px"
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
