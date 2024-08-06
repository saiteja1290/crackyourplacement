'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, LogOut, Menu, Settings, Trophy, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
            return;
        }

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

    const NavItems = () => (
        <>
            <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/daily-challenge')}>
                <Trophy className="mr-2 h-4 w-4" />
                Daily Challenge
            </Button>
            <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
            </Button>
        </>
    );

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <header className="shadow-sm ">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center ">
                    <div className="flex items-center ">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen} >
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[200px] sm:w-[300px]">
                                <div className="py-4">
                                    {/* <h2 className="text-2xl font-bold mb-4">CodeChallenge</h2> */}
                                    <nav className="flex flex-col space-y-2">
                                        <NavItems />
                                    </nav>
                                </div>
                            </SheetContent>
                        </Sheet>
                        {/* <h1 className="text-2xl font-semibold ml-2 lg:ml-0">Dashboard</h1> */}
                    </div>
                    {/* <div className="flex items-center">
                        <Button variant="ghost" size="icon">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <Avatar className="ml-4">
                            <AvatarImage src={user.avatarUrl} alt={user.username} />
                            <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div> */}
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar - hidden on mobile */}
                <aside className="hidden lg:block w-64 shadow-md">

                    <nav className="mt-6 flex flex-col space-y-2">
                        <NavItems />
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {/* User Info Card */}
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Welcome back, {user.username}!</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Keep up the great work and tackle today's challenge!</p>
                            </CardContent>
                        </Card>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Completed Challenges</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold">{user.completedChallenges}</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Current Streak</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold">{user.currentStreak} days</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Total XP</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold">{user.totalXP}</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <Button onClick={() => router.push('/daily-challenge')} className="w-full sm:w-auto">
                                Start Today's Challenge
                            </Button>
                            <Button variant="outline" onClick={handleLogout} className="w-full sm:w-auto">
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}