import { z } from 'zod';

export const signInSchema = z.object({
    email: z.string().trim().email('Enter a valid email address'),
    password: z.string().min(1, 'Password is required'),
});

export const signUpSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(2, 'Name must be at least 2 characters')
            .max(80, 'Name cannot exceed 80 characters'),

        email: z.string().trim().email('Enter a valid email address'),

        password: z.string().min(6, 'Password must be at least 6 characters'),

        role: z.enum(['customer', 'vendor']),

        businessName: z.string().trim().optional(),
    })
    .superRefine((data, ctx) => {
        if (data.role === 'vendor' && !data.businessName) {
            ctx.addIssue({
                code: 'custom',
                path: ['businessName'],
                message: 'Business name is required for vendors',
            });
        }
    });

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
