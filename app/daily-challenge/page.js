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
        sql: Array(5).fill(false),
        os: Array(5).fill(false),
    });
    const [reveal, setReveal] = useState({
        dbms: Array(5).fill(false),
        sql: Array(5).fill(false),
        os: Array(5).fill(false),
    });
    const [completedToday, setCompletedToday] = useState(false);
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
            setCompletedToday(data.completedToday);
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

        try {
            const res = await fetch('/api/daily-challenge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ completed }),
            });

            if (res.ok) {
                const data = await res.json();
                alert(data.message);
                router.push('/dashboard');
            } else {
                const errorData = await res.json();
                alert(errorData.error || 'Failed to submit challenge');
            }
        } catch (error) {
            console.error('Error submitting challenge:', error);
            alert('An error occurred while submitting the challenge');
        }
    };

    if (!challenge) return <div>Loading...</div>;

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen py-2">
            {completedToday && (
                <div className="absolute inset-0 flex items-center justify-center bg-opacity-100 z-50">
                    <div className="text-center p-6 rounded shadow-lg">
                        <h1 className="text-2xl font-bold">You have already completed today's challenge!</h1>
                    </div>
                </div>
            )}

            {/* <h1 className="text-4xl font-bold mb-8">Daily Challenge</h1> */}
            <div className={`w-full max-w-md ${completedToday ? 'blur-sm' : ''}`}>
                <div className="mb-4">
                    <h2 className="text-2xl font-bold mb-2">LeetCode POTD</h2>
                    <div className="flex items-center">
                        <Checkbox
                            checked={completed.leetcode}
                            onCheckedChange={(checked) => setCompleted({ ...completed, leetcode: checked })}
                            className="mr-2"
                            disabled={completedToday}
                        />
                        <a href={challenge.leetcode.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {challenge.leetcode.title}
                        </a>
                    </div>
                </div>
                {['dbms', 'sql', 'os'].map((category) => (
                    <div key={category} className="mb-4">
                        <h2 className="text-2xl font-bold mb-2">{category.toUpperCase()} Questions</h2>
                        {challenge[category].map((question, index) => (
                            <div key={index} className="flex flex-col items-start mb-4 p-4 border rounded shadow">
                                <div className="flex items-center mb-2 w-full">
                                    <Checkbox
                                        checked={completed[category][index]}
                                        onCheckedChange={(checked) => {
                                            const newCategory = [...completed[category]];
                                            newCategory[index] = checked;
                                            setCompleted({ ...completed, [category]: newCategory });
                                        }}
                                        className="mr-2"
                                        disabled={completedToday}
                                    />
                                    <span>{question.question}</span>
                                </div>
                                <Button onClick={() => {
                                    const newReveal = [...reveal[category]];
                                    newReveal[index] = !newReveal[index];
                                    setReveal({ ...reveal, [category]: newReveal });
                                }} className="w-full" disabled={completedToday}>
                                    {reveal[category][index] ? 'Hide Solution' : 'Reveal Solution'}
                                </Button>
                                {reveal[category][index] && <div className="mt-2">{question.solution}</div>}
                            </div>
                        ))}
                    </div>
                ))}
                {!completedToday && (
                    <Button onClick={handleSubmit} className="w-full mt-4">Submit Challenge</Button>
                )}
            </div>
        </div>
    );
}
