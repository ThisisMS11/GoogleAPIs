'use client';
import React from 'react'
import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'


const MyPlaylist = () => {
  const [parent, enableAnimations] = useAutoAnimate();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {

    async function fetchUserPlaylists() {
      const token = localStorage.getItem('token');

      try {
        const playlistRes = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/playlists`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setPlaylists(playlistRes.data.data);
      } catch (error) {
        console.log(error);
      }

    }

    fetchUserPlaylists();
  }, [])


  return (<>


    {playlists && <div className='h-[100vh] flex flex-wrap p-8 gap-20 items-center justify-center' ref={parent}>


      {playlists.map((playlist) => {
        return <div className="group flex flex-col h-fit bg-white border border-gray-200 rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] min-w-2/6 shadow-lg shadow-slate-500/40" key={playlist.id}>



          <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">

            <img
              src={playlist.snippet.thumbnails.medium.url || playlist.snippet.thumbnails.medium.url}
              alt="Picture of the author"
              className='w-full h-full'
            />
          </div>


          <div className="p-4 md:p-6">
            <span className="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500">
              Atlassian API
            </span>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
              {playlist.snippet.title}
            </h3>
            <p className="mt-3 text-gray-500">
              {playlist.snippet.description || "No Description"}
            </p>
          </div>
          <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
            <Link className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-bl-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              href={`myplaylist/${playlist.id}`}>
              View Playlist
            </Link>
            <Link className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-br-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" href="#">
              View API
            </Link>
          </div>
        </div>
      })
      }

    </div>}
  </>

  )
}

export default MyPlaylist  