"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { redirect } from 'next/navigation'


export default function Auth(Component) {
    return function ProtectedRoute({ ...props }) {

        const router = useRouter();


        /* if the user is logged in then we want the user to be redirected to the dashboard otherwise the login page */
        const userIsAuthenticated = getCookie('isLoggedIn');
        console.log(userIsAuthenticated);


        useEffect(() => {
            if (!userIsAuthenticated) {
                redirect('/login');
            }
        }, [userIsAuthenticated, router]);


        return <Component {...props} />;
    };
}
