import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';

export async function POST(req) {
    const { username, password } = await req.json();
    const client = await clientPromise;
    const db = client.db("dailyChallengeDB");

    const user = await db.collection('users').findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const token = generateToken(user._id.toString());

    return new Response(JSON.stringify({ token }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}