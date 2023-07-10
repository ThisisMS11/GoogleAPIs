'use client';

import { useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import { useGoogleAuth } from '@/context/GoogleAuth';
import { useRouter } from 'next/navigation';


export default function Home() {

  const query = useSearchParams();
  const router = useRouter();
  const googleauth = useGoogleAuth();

  /* for creating the google auth link */
  const createGoogleAuthLink = async () => {
    try {

      const url = `${process.env.NEXT_PUBLIC_EXTERNAL_SERVER}/api/createAuthLink`
      const request = await axios.get(url);

      window.location.href = request.data.url;

    } catch (error) {
      console.log("App.js 12 | error", error);
      throw new Error("Issue with Login", error.message);
    }
  };


  useEffect(() => {

    const accessToken = query.get("accessToken");
    const refreshToken = query.get("refreshToken");

    const response = googleauth.handleTokenFromQueryParams(accessToken, refreshToken);

    if(response) router.push('/');

  }, []);


  return (
    <div>
      <button onClick={createGoogleAuthLink} className='p-4 bg-black text-white rounded-md m-4'>Google</button>
    </div>
  )
}
