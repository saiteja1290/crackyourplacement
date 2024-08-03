import clientPromise from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';

export async function GET(req) {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Here you would typically fetch the daily challenge from your database
    // This is a placeholder
    const challenge = {
        date: new Date().toISOString().split('T')[0],
        leetcode: {
            title: "Two Sum",
            url: "https://leetcode.com/problems/two-sum/"
        },
        dbms: Array(5).fill("DBMS Question"),
        sql: Array(5).fill("SQL Question"),
        os: Array(5).fill("OS Question")
    };

    return new Response(JSON.stringify(challenge), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
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

    await db.collection('users').updateOne(
        { _id: decoded.userId },
        { $inc: { completedChallenges: 1 } }
    );

    return new Response(JSON.stringify({ message: 'Challenge completed' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}