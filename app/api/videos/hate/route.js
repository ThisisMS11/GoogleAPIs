import { NextResponse } from "next/server";
import * as jose from 'jose'

export const GET = async (req) => {
    const userId = '64bea5031fdb79fac183ebfa';

    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const alg = 'HS256';

    const jwt = await new jose.SignJWT({ 'http://localhost:3000': true })
        .setProtectedHeader({ alg })
        .setSubject(userId) // Set the "sub" claim to the user ID
        .setIssuedAt()
        .setIssuer('http://localhost:3000')
        .setAudience('http://localhost:3000') // Set the "aud" claim to the user ID
        .setExpirationTime('2h')
        .sign(secret);

    console.log({ 'inside googleredirect': jwt });

    return NextResponse.json({ jwt }, { status: 200 });
}