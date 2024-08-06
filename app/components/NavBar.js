"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Assuming Button is a shadcn component
import { useAuth } from '../contexts/AuthContext';
import { ModeToggle } from './ModeToggle';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function NavBar() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const NavItems = () => (
        <>
            <Link href="/">
                <Button variant="ghost" className="w-full justify-start">Home</Button>
            </Link>
            <Link href="/about">
                <Button variant="ghost" className="w-full justify-start">About Us</Button>
            </Link>
            <Link href="/contact">
                <Button variant="ghost" className="w-full justify-start">Contact</Button>
            </Link>
            <Link href="/daily-challenge">
                <Button variant="ghost" className="w-full justify-start">Daily Challenges</Button>
            </Link>
            <div className="mx-4">

                {user && isMobileMenuOpen && (
                    <>
                        <Button onClick={handleLogout} variant="destructive" className="w-full justify-start my-4">
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                        <ModeToggle />
                    </>
                )}
            </div>


        </>
    );

    return (
        <nav className="p-4 bg-white dark:bg-black border-b border-neutral-200 dark:border-white/[0.2] shadow">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="text-xl font-bold">
                        Crack Your Placements
                    </Link>
                </div>
                <div className="hidden lg:flex items-center space-x-4">
                    <NavItems />
                </div>
                <div className="hidden lg:flex items-center space-x-4">
                    <ModeToggle />
                    {user ? (
                        <>
                            <Button onClick={handleLogout} variant="destructive">
                                Logout
                            </Button>
                            <div className="flex items-center space-x-2">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <span className="text-neutral-600 dark:text-white">
                                    {user.username}
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login">
                                <button className="inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                    Log in
                                </button>
                            </Link>
                        </>
                    )}
                </div>
                <div className="lg:hidden">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[200px] sm:w-[300px]">
                            <div className="py-4">
                                <nav className="flex flex-col space-y-2">
                                    <NavItems />
                                    <div className="flex items-center justify-between">


                                    </div>

                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
