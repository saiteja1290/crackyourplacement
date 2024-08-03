import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';

export async function POST(req) {
    const { username, password } = await req.json();
    const client = await clientPromise;
    const db = client.db("dailyChallengeDB");

    const existingUser = await db.collection('users').findOne({ username });
    if (existingUser) {
        return new Response(JSON.stringify({ error: 'User already exists' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.collection('users').insertOne({
        username,
        password: hashedPassword,
        completedChallenges: 0,
    });

    const token = generateToken(result.insertedId.toString());

    return new Response(JSON.stringify({ token }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}