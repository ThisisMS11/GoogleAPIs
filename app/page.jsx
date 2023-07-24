'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookies } from 'cookies-next';

export default function Home() {

  const router = useRouter();

  useEffect(() => {

    const isLoggedIn = getCookies().isLoggedIn;

    /* if the user is logged in then we want the user to be redirected to the dashboard otherwise the login page */
    if (!isLoggedIn) {
      router.push('/login')
    } else {
      router.push('/dashboard')
    }

  }, []);

  return (
    <div className=' h-[100vh] flex flex-wrap gap-4 relative top-[5rem] justify-around'>
      Home Page
    </div>
  )
}

