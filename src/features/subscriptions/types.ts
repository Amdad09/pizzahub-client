export type SubscriptionStatus =
    | 'incomplete'
    | 'trialing'
    | 'active'
    | 'past_due'
    | 'canceled'
    | 'unpaid'
    | 'incomplete_expired'
    | 'paused';

export interface Subscription {
    vendorId: string;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    stripePriceId: string;
    status: SubscriptionStatus;
    cancelAtPeriodEnd: boolean;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface SubscriptionResponse {
    plan: 'free' | 'premium';
    expiresAt: string | null;
    subscription: Subscription | null;
}

export interface CheckoutSessionResponse {
    checkoutUrl: string | null;
    sessionId: string;
}

export interface PortalSessionResponse {
    portalUrl: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
