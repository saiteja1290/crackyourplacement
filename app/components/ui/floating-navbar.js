"use client";
import React, { useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({
    navItems,
    className,
}) => {
    const { scrollYProgress } = useScroll();

    const [visible, setVisible] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        // Check if current is a number
        if (typeof current === "number") {
            let direction = current - scrollYProgress.getPrevious();

            if (scrollYProgress.get() < 0.05) {
                setVisible(false);
            } else {
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        }
    });

    return (
        <div
            className={cn(
                "flex w-full fixed top-0 left-0 border-b border-neutral-200 dark:border-white/[0.2] bg-white dark:bg-black shadow-md z-50 py-2 px-4",
                className
            )}
        >
            <div className="container mx-auto flex justify-between items-center">
                {Array.isArray(navItems) && navItems.length > 0 ? (
                    navItems.map((navItem, idx) => (
                        <Link
                            key={`link-${idx}`}
                            href={navItem.link}
                            className={cn(
                                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
                            )}
                        >
                            <span className="block sm:hidden">{navItem.icon}</span>
                            <span className="hidden sm:block text-sm">{navItem.name}</span>
                        </Link>
                    ))
                ) : (
                    <p>No navigation items available</p>
                )}
            </div>
        </div>
    );
};
