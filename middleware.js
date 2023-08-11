import { NextResponse } from 'next/server'
import * as jose from 'jose'


export async function middleware(request) {

    if (request.nextUrl.pathname.startsWith('/api/google/userinfo')) {

        /* if the access token gets expired then using this middlware i want to update the value of that access token to the new one */

        // let accessToken = request.cookies.get('accessToken')
        // let refreshToken = request.cookies.get('refreshToken');

        console.log('userinfo middleware')
        return NextResponse.next()
    }

    /* authorisation logic */
    if (request.nextUrl.pathname.startsWith('/api/videos')
        || request.nextUrl.pathname.startsWith('/api/user')) {

        /* get the authorisation header */

        let JWTtoken = request.headers.get('Authorization').split(" ")[1];

        // /* if the authorization header is not present then return the error */
        if (!JWTtoken) {
            return NextResponse.json({ error: "user token not found" }, { status: 401 });
        }

        const secret = new TextEncoder().encode(
            process.env.NEXT_PUBLIC_JWT_SECRET,
        )


        try {

            const { payload } = await jose.jwtVerify(JWTtoken, secret, {
                issuer: 'http://localhost:3000',
                audience: 'http://localhost:3000',
            })

            /* payload contains the userId of the client */
            console.log('inside middleware ', { payload })

            const userId = payload.sub;

            const requestHeaders = new Headers(request.headers)


            /* setting new headers here */
            requestHeaders.set('userId', userId)


            return NextResponse.next({
                request: {
                    // New request headers
                    headers: requestHeaders,
                },
            })

        } catch (error) {

            console.log({ error }, 'abra ka dabra : ');
            return NextResponse.json({ error })
        }
    }
}
