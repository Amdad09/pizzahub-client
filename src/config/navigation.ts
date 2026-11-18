export type UserRole = 'customer' | 'vendor' | 'admin';

interface NavigationItem {
    label: string;
    href: string;
}

export const dashboardNavigation: Record<UserRole, NavigationItem[]> = {
    customer: [
        { label: 'Overview', href: '/dashboard/customer' },
        { label: 'My Orders', href: '/dashboard/customer/orders' },
        { label: 'Favorites', href: '/dashboard/customer/favorites' },
        { label: 'Profile Settings', href: '/dashboard/profile' },
    ],

    vendor: [
        { label: 'Overview', href: '/dashboard/vendor' },
        { label: 'My Menu', href: '/dashboard/vendor/menu' },
        { label: 'Customer Orders', href: '/dashboard/vendor/orders' },
        { label: 'Subscription', href: '/dashboard/vendor/subscription' },
        { label: 'Profile Settings', href: '/dashboard/profile' },
    ],

    admin: [
        { label: 'Overview', href: '/dashboard/admin' },
        { label: 'Users', href: '/dashboard/admin/users' },
        { label: 'Menu Review', href: '/dashboard/admin/menu' },
        { label: 'Transactions', href: '/dashboard/admin/transactions' },
        { label: 'Profile Settings', href: '/dashboard/profile' },
    ],
};
