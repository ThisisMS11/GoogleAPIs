'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookies } from 'cookies-next';

export default function Home({ searchParams }) {

  const router = useRouter();

  useEffect(() => {

    const isLoggedIn = getCookies().isLoggedIn;

    /* if the user is logged in then we want the user to be redirected to the dashboard otherwise the login page */
    const token = searchParams?.token || localStorage.getItem('token');


    if (token) {
      localStorage.setItem('token', token);

      /* make the api call to get the user information here */
    }

    if (!isLoggedIn) {
      router.push('/login')
    } else {
      router.push('/dashboard')
    }

  }, []);

  return (
    <div className=' h-[70vh] flex items-center justify-center flex-wrap gap-4 relative top-[5rem] text-3xl '>
      Please Wait Redirecting to Dashboard...
    </div>
  )
}

