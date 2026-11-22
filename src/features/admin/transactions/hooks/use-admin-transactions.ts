import { useQuery } from '@tanstack/react-query';

import { getAdminTransactions } from '../api';
import type { AdminTransactionFilters } from '../types';

export function useAdminTransactions(filters: AdminTransactionFilters) {
    return useQuery({
        queryKey: ['admin', 'transactions', filters],
        queryFn: () => getAdminTransactions(filters),
    });
}
