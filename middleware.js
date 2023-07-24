import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    // console.log(request);
    let accessToken = request.cookies.get('accessToken')
    let refreshToken = request.cookies.get('refreshToken');


    console.log({ accessToken, refreshToken });

    console.log('middleware')
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/api/google/userinfo',
}