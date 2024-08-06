import { verifyToken } from '@/lib/auth';
import leetcodeProblems from '@/data/leetcode';
import dbmsQuestions from '@/data/dbms';
import sqlQuestions from '@/data/sql';
import osQuestions from '@/data/os';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req) {
    try {
        const token = req.headers.get('Authorization')?.split(' ')[1];
        const decoded = verifyToken(token);

        if (!decoded) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const getRandomItems = (arr, num) => {
            const shuffled = arr.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, num);
        };

        const challenge = {
            date: new Date().toISOString().split('T')[0],
            leetcode: getRandomItems(leetcodeProblems, 1)[0],
            dbms: getRandomItems(dbmsQuestions, 5),
            sql: getRandomItems(sqlQuestions, 5),
            os: getRandomItems(osQuestions, 5)
        };

        return new Response(JSON.stringify(challenge), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("GET /api/daily-challenge Error:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(req) {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { completed } = await req.json();
    const client = await clientPromise;
    const db = client.db("dailyChallengeDB");

    try {
        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(decoded.userId) },
            {
                $inc: { completedChallenges: 1 },
                $push: {
                    completedDates: new Date().toISOString().split('T')[0]
                }
            }
        );

        if (result.modifiedCount === 0) {
            return new Response(JSON.stringify({ error: 'User not found or challenge already completed today' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ message: 'Challenge completed and count updated' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error updating challenge completion:', error);
        return new Response(JSON.stringify({ error: 'Server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
