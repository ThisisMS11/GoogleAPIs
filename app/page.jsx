'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { useGoogleAuth } from '../context/GoogleAuth';
import { useRouter } from 'next/navigation';


export default function Home() {

  const query = useSearchParams();
  const router = useRouter();
  const googleauth = useGoogleAuth();

  // const [popularVideos, setPopularVideos] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

    const accessToken = query.get("accessToken");
    const refreshToken = query.get("refreshToken");

    const response = googleauth.handleTokenFromQueryParams(accessToken, refreshToken);
    console.log(response);

    /* if set successfully then will redirect to home page */
    if (response) {
      setIsAuthenticated(true);
      router.push('/dashboard');
    }

    if (!sessionStorage.getItem('accessToken')) {
      router.push('/login')
    }

    if (sessionStorage.getItem('accessToken')) {
      router.push('/dashboard')
    }

  }, []);



  // useEffect(() => {
  //   const accessToken = sessionStorage.getItem('accessToken');
  //   const refreshToken = sessionStorage.getItem('refreshToken');


  //   if (accessToken || refreshToken) router.push('/dashboard');

  // async function call(tokens) {
  //   try {
  //     const response = await axios.post(`/api/google/videos/popular`, tokens, {});
  //     setPopularVideos(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // if (accessToken || refreshToken) {
  //   /* make the axios call to get the most popular videos from youtube */
  //   const tokens = { accessToken, refreshToken };
  //   call(tokens);
  // }
  // }, [])


  return (
    <div className=' h-[100vh] flex flex-wrap gap-4 relative top-[5rem] justify-around'>
      Home Page
    </div>
  )
}

