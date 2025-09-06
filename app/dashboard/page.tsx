'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner'; // Assuming you have this component
export default function DashboardPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
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
                localStorage.setItem('user', JSON.stringify(userData.user));
                console.log(localStorage.getItem('user'));
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoading(false);
            }
        }
        const token = searchParams.get('token');
        const role = searchParams.get('role');


        // Fetch user data if we have both token and userId
        if (token) {
            localStorage.setItem('accessToken', token);
            localStorage.setItem('token', token);
            localStorage.setItem('role', role || '');
            fetchData();
        }
        if (role) {
            console.log("role here:", role);
            // Redirect to role-specific dashboard
            router.push(`/dashboard/${role}`);
        } else {
            setIsLoading(false);
        }
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