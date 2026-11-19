import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    getAdminUserById,
    getAdminUsers,
    updateAdminUserBlockStatus,
} from '../api';

import type { AdminUserFilters } from '../types';

export function useAdminUsers(filters: AdminUserFilters) {
    return useQuery({
        queryKey: ['admin', 'users', filters],
        queryFn: () => getAdminUsers(filters),
    });
}

export function useAdminUser(id: string) {
    return useQuery({
        queryKey: ['admin', 'users', id],
        queryFn: () => getAdminUserById(id),
        enabled: Boolean(id),
    });
}

export function useUpdateAdminUserBlockStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateAdminUserBlockStatus,

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['admin', 'users'],
                }),
                queryClient.invalidateQueries({
                    queryKey: ['admin', 'overview'],
                }),
            ]);
        },
    });
}
