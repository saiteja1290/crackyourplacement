'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
        } else {
            fetchUser(token);
        }
    }, []);

    const fetchUser = async (token) => {
        try {
            const res = await fetch('/api/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            localStorage.removeItem('token');
            router.push('/auth/login');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/auth/login');
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
            <p className="mb-4">Welcome, {user.username}!</p>
            <p className="mb-4">Completed Challenges: {user.completedChallenges}</p>
            <Button onClick={() => router.push('/daily-challenge')}>Start Today's Challenge</Button>
            <Button onClick={handleLogout} variant="outline" className="mt-4">Logout</Button>
        </div>
    );
}