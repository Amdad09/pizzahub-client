import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    getAdminMenuItem,
    getAdminMenuItems,
    reviewAdminMenuItem,
} from '../api';

import type { AdminMenuFilters } from '../types';

export function useAdminMenuItems(filters: AdminMenuFilters) {
    return useQuery({
        queryKey: ['admin', 'menu', filters],
        queryFn: () => getAdminMenuItems(filters),
    });
}

export function useAdminMenuItem(id: string) {
    return useQuery({
        queryKey: ['admin', 'menu', id],
        queryFn: () => getAdminMenuItem(id),
        enabled: Boolean(id),
    });
}

export function useReviewAdminMenuItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: reviewAdminMenuItem,
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['admin', 'menu'],
                }),
                queryClient.invalidateQueries({
                    queryKey: ['admin', 'overview'],
                }),
            ]);
        },
    });
}
