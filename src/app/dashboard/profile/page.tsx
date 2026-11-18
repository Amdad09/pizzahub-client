import { redirect } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { ProfileForm } from '@/features/profile/components/profile-form';
import { getSession } from '@/lib/session';

export default async function ProfilePage() {
    const session = await getSession();

    if (!session) {
        redirect('/sign-in');
    }

    return (
        <div>
            <PageHeader
                title="Profile Settings"
                description="Manage your personal information and account details."
            />

            <ProfileForm
                name={session.user.name}
                email={session.user.email}
                role={session.user.role}
                businessName={session.user.businessName}
            />
        </div>
    );
}
