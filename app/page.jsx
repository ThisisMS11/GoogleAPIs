'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookies } from 'cookies-next';
import { useDispatch } from 'react-redux';
import { setUser, setIsAuthenticated } from './redux/slices/UserSlice'
import axios from 'axios';

export default function Home({ searchParams }) {

  const router = useRouter();
  const dispatch = useDispatch();

  const cook = getCookies();

  console.log({ cook });

  console.log("main page has rendered ");

  useEffect(() => {
    console.log("main page has mounted ");

    /* if the user is logged in then we want the user to be redirected to the dashboard otherwise the login page */
    console.log({searchParams});

    const token = searchParams?.token || localStorage.getItem('token') || cook.token;


    async function fetchUserInfo(token) {
      /* make the api call to get the user information here */
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/user`, 
        { headers: { 'Authorization': `Bearer ${token}` } });

        const { user } = response.data;

        console.log('Inside app folder page : ', { user });

        dispatch(setUser(user));
        dispatch(setIsAuthenticated(true));

        router.push('/dashboard')


      } catch (error) {
        console.log("Hello 1");
        router.push('/login')
        console.log("some error occured while fetching the user information");
      }
    }

    if (token) {
      localStorage.setItem('token', token);
      /* also fetch user information and set it to global state */
      fetchUserInfo(token);
    }else{
      console.log("Hello 2");
      router.push('/login');
    }

  }, [searchParams]);

  return (
    <div className=' h-[70vh] flex items-center justify-center flex-wrap gap-4 relative top-[5rem] text-3xl '>
      Please Wait Redirecting to Dashboard...
    </div>
  )
}

