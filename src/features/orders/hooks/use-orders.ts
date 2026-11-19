'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ordersApi } from '../api';

import type {
    CreateOrderInput,
    OrderActionInput,
    OrderFilters,
} from '../types';

export const orderKeys = {
    all: ['orders'] as const,

    customer: (filters: OrderFilters) =>
        [...orderKeys.all, 'customer', filters] as const,

    customerDetails: (id: string) =>
        [...orderKeys.all, 'customer', id] as const,

    vendor: (filters: OrderFilters) =>
        [...orderKeys.all, 'vendor', filters] as const,

    vendorDetails: (id: string) => [...orderKeys.all, 'vendor', id] as const,
};

// Customer queries

export function useCustomerOrders(filters: OrderFilters = {}) {
    return useQuery({
        queryKey: orderKeys.customer(filters),
        queryFn: () => ordersApi.getCustomerOrders(filters),
    });
}

export function useCustomerOrder(id: string) {
    return useQuery({
        queryKey: orderKeys.customerDetails(id),
        queryFn: () => ordersApi.getCustomerOrder(id),
        enabled: Boolean(id),
    });
}

// Vendor queries

export function useVendorOrders(filters: OrderFilters = {}) {
    return useQuery({
        queryKey: orderKeys.vendor(filters),
        queryFn: () => ordersApi.getVendorOrders(filters),
    });
}

export function useVendorOrder(id: string) {
    return useQuery({
        queryKey: orderKeys.vendorDetails(id),
        queryFn: () => ordersApi.getVendorOrder(id),
        enabled: Boolean(id),
    });
}

// Mutations

export function useCreateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: CreateOrderInput) => ordersApi.create(input),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: orderKeys.all,
            });
        },
    });
}

export function useCancelOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, input }: { id: string; input?: OrderActionInput }) =>
            ordersApi.cancel(id, input),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: orderKeys.all,
            });
        },
    });
}

export function useAcceptOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => ordersApi.accept(id),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: orderKeys.all,
            });
        },
    });
}

export function useRejectOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, input }: { id: string; input?: OrderActionInput }) =>
            ordersApi.reject(id, input),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: orderKeys.all,
            });
        },
    });
}
