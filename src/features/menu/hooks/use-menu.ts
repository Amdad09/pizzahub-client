'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { menuApi } from '../api';
import type { MenuFilters, MenuInput } from '../types';

export const menuKeys = {
    all: ['menu'] as const,
    lists: () => [...menuKeys.all, 'list'] as const,
    list: (filters: MenuFilters) => [...menuKeys.lists(), filters] as const,
    details: () => [...menuKeys.all, 'detail'] as const,
    detail: (id: string) => [...menuKeys.details(), id] as const,
    vendor: () => [...menuKeys.all, 'vendor'] as const,
};

export function useMenu(filters: MenuFilters) {
    return useQuery({
        queryKey: menuKeys.list(filters),
        queryFn: () => menuApi.getAll(filters),
    });
}

export function useMenuDetails(id: string) {
    return useQuery({
        queryKey: menuKeys.detail(id),
        queryFn: () => menuApi.getById(id),
        enabled: Boolean(id),
    });
}

export function useVendorMenu() {
    return useQuery({
        queryKey: menuKeys.vendor(),
        queryFn: menuApi.getVendorItems,
    });
}

export function useCreateMenu() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: MenuInput) => menuApi.create(input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: menuKeys.all });
        },
    });
}

export function useUpdateMenu() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            input,
        }: {
            id: string;
            input: Partial<MenuInput>;
        }) => menuApi.update(id, input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: menuKeys.all });
        },
    });
}

export function useDeleteMenu() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => menuApi.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: menuKeys.all });
        },
    });
}

export function useVendorMenuDetails(id: string) {
    return useQuery({
        queryKey: [...menuKeys.vendor(), id],
        queryFn: () => menuApi.getVendorItem(id),
        enabled: Boolean(id),
    });
}

export function useUploadMenuImage() {
    return useMutation({
        mutationFn: (image: string) => menuApi.uploadImage(image),
    });
}
