'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner'; 
import { toast } from 'sonner';
export default function DashboardPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (token: string) => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const userData = await response.json();
                localStorage.setItem('user', JSON.stringify(userData.user || userData));
                console.log('User data stored:', localStorage.getItem('user'));

                // Redirect based on profile completion status
                if (userData.user?.profileComplete || userData.profileComplete) {
                    router.push(`/dashboard/${userData.user?.role || userData.role}`);
                } else {
                    router.push(`/dashboard/${userData.user?.role || userData.role}/create-profile`);
                }

            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error('Failed to load user data');
                setIsLoading(false);
            }
        };

         const checkUserProfile = () => {
            const userData = localStorage.getItem('user');
            const token = localStorage.getItem('accessToken');
            
            if (userData && token) {
                const user = JSON.parse(userData);
                if (user.profileComplete) {
                    router.push(`/dashboard/${user.role}`);
                } else {
                    router.push(`/dashboard/${user.role}/create-profile`);
                }
            } else {
                setIsLoading(false);
            }
        };
        const token = searchParams.get('token');
        const role = searchParams.get('role');


        // Fetch user data if we have both token and userId
        if (token) {
            localStorage.setItem('accessToken', token);
             if (role) {
                localStorage.setItem('role', role);
            }
            fetchData(token);
        } else {
            // Check existing user data
            checkUserProfile();
        }
        // if (role) {
        //     console.log("role here:", role);
        //     // Redirect to role-specific dashboard
        //     router.push(`/dashboard/${role}`);
        // } else {
        //     setIsLoading(false);
        // }
    }, [router, searchParams]);

    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <h1>Welcome to Dashboard</h1>
        </div>
    );
}