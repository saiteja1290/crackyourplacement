'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function DailyChallenge() {
    const [challenge, setChallenge] = useState(null);
    const [completed, setCompleted] = useState({
        leetcode: false,
        dbms: Array(5).fill(false),
        sql: Array(5).fill(false), os: Array(5).fill(false),
    });
    const router = useRouter();

    useEffect(() => {
        fetchChallenge();
    }, []);

    const fetchChallenge = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
            return;
        }

        const res = await fetch('/api/daily-challenge', {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
            const data = await res.json();
            setChallenge(data);
        } else {
            alert('Failed to fetch challenge');
        }
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
            return;
        }

        const res = await fetch('/api/daily-challenge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ completed }),
        });

        if (res.ok) {
            alert('Challenge completed!');
            router.push('/dashboard');
        } else {
            alert('Failed to submit challenge');
        }
    };

    if (!challenge) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-8">Daily Challenge</h1>
            <div className="w-full max-w-md">
                <div className="mb-4">
                    <h2 className="text-2xl font-bold mb-2">LeetCode POTD</h2>
                    <div className="flex items-center">
                        <Checkbox
                            checked={completed.leetcode}
                            onCheckedChange={(checked) => setCompleted({ ...completed, leetcode: checked })}
                            className="mr-2"
                        />
                        <a href={challenge.leetcode.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {challenge.leetcode.title}
                        </a>
                    </div>
                </div>
                {['dbms', 'sql', 'os'].map((category) => (
                    <div key={category} className="mb-4">
                        <h2 className="text-2xl font-bold mb-2">{category.toUpperCase()} Questions</h2>
                        {challenge[category].map((question, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <Checkbox
                                    checked={completed[category][index]}
                                    onCheckedChange={(checked) => {
                                        const newCategory = [...completed[category]];
                                        newCategory[index] = checked;
                                        setCompleted({ ...completed, [category]: newCategory });
                                    }}
                                    className="mr-2"
                                />
                                <span>{question}</span>
                            </div>
                        ))}
                    </div>
                ))}
                <Button onClick={handleSubmit} className="w-full mt-4">Submit Challenge</Button>
            </div>
        </div>
    );
}