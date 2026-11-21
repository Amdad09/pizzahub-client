'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { subscriptionsApi } from '../api';

export const subscriptionKeys = {
    all: ['subscriptions'] as const,
    current: () => [...subscriptionKeys.all, 'current'] as const,
};

export function useSubscription(verifyPayment = false) {
    return useQuery({
        queryKey: subscriptionKeys.current(),
        queryFn: subscriptionsApi.getCurrent,

        refetchInterval: (query) => {
            if (verifyPayment && query.state.data?.plan !== 'premium') {
                return 3000;
            }

            return false;
        },
    });
}

export function useCreateCheckout() {
    return useMutation({
        mutationFn: subscriptionsApi.createCheckout,
    });
}

export function useCreatePortal() {
    return useMutation({
        mutationFn: subscriptionsApi.createPortal,
    });
}

export function useRefreshSubscription() {
    const queryClient = useQueryClient();

    return () =>
        queryClient.invalidateQueries({
            queryKey: subscriptionKeys.all,
        });
}
