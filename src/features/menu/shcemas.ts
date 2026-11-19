import { z } from 'zod';

export const menuFormSchema = z.object({
    name: z.string().trim().min(3).max(100),
    description: z.string().trim().min(10).max(2000),
    price: z.coerce.number().positive().max(100000),
    category: z.string().trim().min(2).max(50),
    location: z.string().trim().min(2).max(100),
    images: z.array(z.url()).min(1).max(4),
});

export type MenuFormValues = z.infer<typeof menuFormSchema>;
