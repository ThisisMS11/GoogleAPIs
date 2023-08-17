'use client';
import React from 'react'
import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'

const myplaylists = [
  {
    kind: 'youtube#playlist',
    etag: 'tzK785_vayQRHoIqsNO6OxKpF1Y',
    id: 'PLYYw9OEv9CEyRYGjm2BT1UbgUddJrE720',
    snippet: {
      publishedAt: '2023-04-17T07:10:36Z',
      channelId: 'UCpkVstDSqpHgLuWQQXQDtvg',
      title: 'Management',
      description: '',
      thumbnails: {
        default: { url: 'https://i.ytimg.com/vi/lDvcVDmcgA8/default.jpg', width: 120, height: 90 },
        medium: { url: 'https://i.ytimg.com/vi/lDvcVDmcgA8/mqdefault.jpg', width: 320, height: 180 },
        high: { url: 'https://i.ytimg.com/vi/lDvcVDmcgA8/hqdefault.jpg', width: 480, height: 360 },
        standard: { url: 'https://i.ytimg.com/vi/lDvcVDmcgA8/sddefault.jpg', width: 640, height: 480 },
        maxres: { url: 'https://i.ytimg.com/vi/lDvcVDmcgA8/maxresdefault.jpg', width: 1280, height: 720 }
      },
      channelTitle: 'MotaBhai Motivation',
      localized: { title: 'Management', description: '' }
    },
    contentDetails: { itemCount: 1 }
  }, {
    kind: 'youtube#playlist',
    etag: '_HzAd6edEGoXznF7oJv1dmU8qgk',
    id: 'PLYYw9OEv9CEznqG4VkuIgG56V2iamfPRz',
    snippet: {
      publishedAt: '2023-03-01T10:31:26Z',
      channelId: 'UCpkVstDSqpHgLuWQQXQDtvg',
      title: 'can work',
      description: '',
      thumbnails: {
        default: { url: 'https://i.ytimg.com/vi/ilvMtjzDnE0/default.jpg', width: 120, height: 90 },
        medium: { url: 'https://i.ytimg.com/vi/ilvMtjzDnE0/mqdefault.jpg', width: 320, height: 180 },
        high: { url: 'https://i.ytimg.com/vi/ilvMtjzDnE0/hqdefault.jpg', width: 480, height: 360 },
        standard: { url: 'https://i.ytimg.com/vi/ilvMtjzDnE0/sddefault.jpg', width: 640, height: 480 },
        maxres: { url: 'https://i.ytimg.com/vi/ilvMtjzDnE0/maxresdefault.jpg', width: 1280, height: 720 }
      },
      channelTitle: 'MotaBhai Motivation',
      localized: { title: 'can work', description: '' }
    },
    contentDetails: { itemCount: 3 }
  },
  {
    kind: 'youtube#playlist',
    etag: 'nkGaXlRi-KZgNbE9YA08v_hAgPQ',
    id: 'PLYYw9OEv9CEyboJKSESvZ7BWtHnHcM-n5',
    snippet: {
      publishedAt: '2023-01-20T13:05:13Z',
      channelId: 'UCpkVstDSqpHgLuWQQXQDtvg',
      title: 'wishlist',
      description: '',
      thumbnails: {
        default: { url: 'https://i.ytimg.com/vi/EyIvuigqDoA/default.jpg', width: 120, height: 90 },
        medium: { url: 'https://i.ytimg.com/vi/EyIvuigqDoA/mqdefault.jpg', width: 320, height: 180 },
        high: { url: 'https://i.ytimg.com/vi/EyIvuigqDoA/hqdefault.jpg', width: 480, height: 360 },
        standard: { url: 'https://i.ytimg.com/vi/EyIvuigqDoA/sddefault.jpg', width: 640, height: 480 },
        maxres: { url: 'https://i.ytimg.com/vi/EyIvuigqDoA/maxresdefault.jpg', width: 1280, height: 720 }
      },
      channelTitle: 'MotaBhai Motivation',
      localized: { title: 'wishlist', description: '' }
    },
    contentDetails: { itemCount: 1 }
  },
  {
    kind: 'youtube#playlist',
    etag: 'EUmntA_J9a9aZ0nhhnV9vhbrlM8',
    id: 'PLYYw9OEv9CExfI9U8sNvuXNGZxqd29QXi',
    snippet: {
      publishedAt: '2023-01-10T11:11:21Z',
      channelId: 'UCpkVstDSqpHgLuWQQXQDtvg',
      title: 'Javascript behind the scenes',
      description: '',
      thumbnails: {
        default: { url: 'https://i.ytimg.com/vi/8zKuNo4ay8E/default.jpg', width: 120, height: 90 },
        medium: { url: 'https://i.ytimg.com/vi/8zKuNo4ay8E/mqdefault.jpg', width: 320, height: 180 },
        high: { url: 'https://i.ytimg.com/vi/8zKuNo4ay8E/hqdefault.jpg', width: 480, height: 360 },
        standard: { url: 'https://i.ytimg.com/vi/8zKuNo4ay8E/sddefault.jpg', width: 640, height: 480 },
        maxres: { url: 'https://i.ytimg.com/vi/8zKuNo4ay8E/maxresdefault.jpg', width: 1280, height: 720 }
      },
      channelTitle: 'MotaBhai Motivation',
      localized: { title: 'Javascript behind the scenes', description: '' }
    },
    contentDetails: { itemCount: 1 }
  },
  {
    kind: 'youtube#playlist',
    etag: 'gjgyRz8CGD8ty3U9dUIX3gp2nlg',
    id: 'PLYYw9OEv9CEwk1QPy0X3HQFUvuHfCXdNQ',
    snippet: {
      publishedAt: '2022-12-23T15:37:02Z',
      channelId: 'UCpkVstDSqpHgLuWQQXQDtvg',
      title: 'web development',
      description: '',
      thumbnails: {
        default: { url: 'https://i.ytimg.com/vi/4r6WdaY3SOA/default.jpg', width: 120, height: 90 },
        medium: { url: 'https://i.ytimg.com/vi/4r6WdaY3SOA/mqdefault.jpg', width: 320, height: 180 },
        high: { url: 'https://i.ytimg.com/vi/4r6WdaY3SOA/hqdefault.jpg', width: 480, height: 360 },
        standard: { url: 'https://i.ytimg.com/vi/4r6WdaY3SOA/sddefault.jpg', width: 640, height: 480 },
        maxres: { url: 'https://i.ytimg.com/vi/4r6WdaY3SOA/maxresdefault.jpg', width: 1280, height: 720 }
      },
      channelTitle: 'MotaBhai Motivation',
      localized: { title: 'web development', description: '' }
    },
    contentDetails: { itemCount: 2 }
  },
  {
    kind: 'youtube#playlist',
    etag: '2QlhSfwiQVYT-yEZsBInfDGtME4',
    id: 'PLYYw9OEv9CEzBmAsClMMB5Z-JlSLgyJTV',
    snippet: {
      publishedAt: '2022-10-24T04:52:46Z',
      channelId: 'UCpkVstDSqpHgLuWQQXQDtvg',
      title: 'Placement success',
      description: '',
      thumbnails: {
        default: { url: 'https://i.ytimg.com/vi/wow0VjbwDRM/default.jpg', width: 120, height: 90 },
        medium: { url: 'https://i.ytimg.com/vi/wow0VjbwDRM/mqdefault.jpg', width: 320, height: 180 },
        high: { url: 'https://i.ytimg.com/vi/wow0VjbwDRM/hqdefault.jpg', width: 480, height: 360 },
        standard: { url: 'https://i.ytimg.com/vi/wow0VjbwDRM/sddefault.jpg', width: 640, height: 480 }
      },
      channelTitle: 'MotaBhai Motivation',
      localized: { title: 'Placement success', description: '' }
    },
    contentDetails: { itemCount: 2 }
  },
  {
    kind: 'youtube#playlist',
    etag: '-WwiremuPXuJ2vcDpxSwjrduJbk',
    id: 'PLYYw9OEv9CEy2wiZhfy6nFYFoe3ulXk6-',
    snippet: {
      publishedAt: '2022-10-24T04:50:39Z',
      channelId: 'UCpkVstDSqpHgLuWQQXQDtvg',
      title: 'devops + opensource',
      description: '',
      thumbnails: {
        default: { url: 'https://i.ytimg.com/vi/M2V1xXCl8pw/default.jpg', width: 120, height: 90 },
        medium: { url: 'https://i.ytimg.com/vi/M2V1xXCl8pw/mqdefault.jpg', width: 320, height: 180 },
        high: { url: 'https://i.ytimg.com/vi/M2V1xXCl8pw/hqdefault.jpg', width: 480, height: 360 },
        standard: { url: 'https://i.ytimg.com/vi/M2V1xXCl8pw/sddefault.jpg', width: 640, height: 480 },
        maxres: { url: 'https://i.ytimg.com/vi/M2V1xXCl8pw/maxresdefault.jpg', width: 1280, height: 720 }
      },
      channelTitle: 'MotaBhai Motivation',
      localized: { title: 'devops + opensource', description: '' }
    },
    contentDetails: { itemCount: 1 }
  },
  {
    kind: 'youtube#playlist',
    etag: 'lQ4JQ5OldAFljjshmhl52Ic48ao',
    id: 'PLYYw9OEv9CEx3ljQv5LEjiizPCxiATqTS',
    snippet: {
      publishedAt: '2022-10-21T13:04:23Z',
      channelId: 'UCpkVstDSqpHgLuWQQXQDtvg',
      title: 'Open Source',
      description: '',
      thumbnails: {
        default: { url: 'https://i.ytimg.com/vi/yzeVMecydCE/default.jpg', width: 120, height: 90 },
        medium: { url: 'https://i.ytimg.com/vi/yzeVMecydCE/mqdefault.jpg', width: 320, height: 180 },
        high: { url: 'https://i.ytimg.com/vi/yzeVMecydCE/hqdefault.jpg', width: 480, height: 360 },
        standard: { url: 'https://i.ytimg.com/vi/yzeVMecydCE/sddefault.jpg', width: 640, height: 480 },
        maxres: { url: 'https://i.ytimg.com/vi/yzeVMecydCE/maxresdefault.jpg', width: 1280, height: 720 }
      },
      channelTitle: 'MotaBhai Motivation',
      localized: { title: 'Open Source', description: '' }
    },
    contentDetails: { itemCount: 1 }
  },
  {
    kind: 'youtube#playlist',
    etag: 'IiNJq37julbIvRvwgeuN65964zQ',
    id: 'PLYYw9OEv9CEwvY1t9PPM4R9eMeaLJF6lh',
    snippet: {
      publishedAt: '2022-10-14T07:58:57Z',
      channelId: 'UCpkVstDSqpHgLuWQQXQDtvg',
      title: 'DSA',
      description: '',
      thumbnails: {
        default: { url: 'https://i.ytimg.com/vi/fzip9Aml6og/default.jpg', width: 120, height: 90 },
        medium: { url: 'https://i.ytimg.com/vi/fzip9Aml6og/mqdefault.jpg', width: 320, height: 180 },
        high: { url: 'https://i.ytimg.com/vi/fzip9Aml6og/hqdefault.jpg', width: 480, height: 360 },
        standard: { url: 'https://i.ytimg.com/vi/fzip9Aml6og/sddefault.jpg', width: 640, height: 480 },
        maxres: { url: 'https://i.ytimg.com/vi/fzip9Aml6og/maxresdefault.jpg', width: 1280, height: 720 }
      },
      channelTitle: 'MotaBhai Motivation',
      localized: { title: 'DSA', description: '' }
    },
    contentDetails: { itemCount: 4 }
  },
  {
    kind: 'youtube#playlist',
    etag: '2CRtWVDIBDs9R6t24pXQPV3g6cw',
    id: 'PLYYw9OEv9CEwNTc72VMmqGQSKY_STWCIa',
    snippet: {
      publishedAt: '2022-09-25T05:35:41Z',
      channelId: 'UCpkVstDSqpHgLuWQQXQDtvg',
      title: 'React',
      description: '',
      thumbnails: {
        default: { url: 'https://i.ytimg.com/vi/4pLWpfaMe4I/default.jpg', width: 120, height: 90 },
        medium: { url: 'https://i.ytimg.com/vi/4pLWpfaMe4I/mqdefault.jpg', width: 320, height: 180 },
        high: { url: 'https://i.ytimg.com/vi/4pLWpfaMe4I/hqdefault.jpg', width: 480, height: 360 },
        standard: { url: 'https://i.ytimg.com/vi/4pLWpfaMe4I/sddefault.jpg', width: 640, height: 480 },
        maxres: { url: 'https://i.ytimg.com/vi/4pLWpfaMe4I/maxresdefault.jpg', width: 1280, height: 720 }
      },
      channelTitle: 'MotaBhai Motivation',
      localized: { title: 'React', description: '' }
    },
    contentDetails: { itemCount: 7 }
  },
  {
    kind: 'youtube#playlist',
    etag: 'jP25iXdQCyBa75bZBcbWljNfYY0',
    id: 'PLYYw9OEv9CExitjg6vFEweYACzrfQkVXm',
    snippet: {
      publishedAt: '2022-09-25T05:09:07Z',
      channelId: 'UCpkVstDSqpHgLuWQQXQDtvg',
      title: 'css useful',
      description: '',
      thumbnails: {
        default: { url: 'https://i.ytimg.com/vi/6yAAV-uP0po/default.jpg', width: 120, height: 90 },
        medium: { url: 'https://i.ytimg.com/vi/6yAAV-uP0po/mqdefault.jpg', width: 320, height: 180 },
        high: { url: 'https://i.ytimg.com/vi/6yAAV-uP0po/hqdefault.jpg', width: 480, height: 360 },
        standard: { url: 'https://i.ytimg.com/vi/6yAAV-uP0po/sddefault.jpg', width: 640, height: 480 },
        maxres: { url: 'https://i.ytimg.com/vi/6yAAV-uP0po/maxresdefault.jpg', width: 1280, height: 720 }
      },
      channelTitle: 'MotaBhai Motivation',
      localized: { title: 'css useful', description: '' }
    },
    contentDetails: { itemCount: 2 }
  },
  {
    kind: 'youtube#playlist',
    etag: '5djN19zMvo7E2If02_i6qdHPfTg',
    id: 'PLYYw9OEv9CEzv6f_JbjqwfjeFlsy24KIU',
    snippet: {
      publishedAt: '2022-09-12T06:20:09Z',
      channelId: 'UCpkVstDSqpHgLuWQQXQDtvg',
      title: 'Solutions',
      description: '',
      thumbnails: {
        default: { url: 'https://i.ytimg.com/vi/NVCh_ECxgGw/default.jpg', width: 120, height: 90 },
        medium: { url: 'https://i.ytimg.com/vi/NVCh_ECxgGw/mqdefault.jpg', width: 320, height: 180 },
        high: { url: 'https://i.ytimg.com/vi/NVCh_ECxgGw/hqdefault.jpg', width: 480, height: 360 },
        standard: { url: 'https://i.ytimg.com/vi/NVCh_ECxgGw/sddefault.jpg', width: 640, height: 480 },
        maxres: { url: 'https://i.ytimg.com/vi/NVCh_ECxgGw/maxresdefault.jpg', width: 1280, height: 720 }
      },
      channelTitle: 'MotaBhai Motivation',
      localized: { title: 'Solutions', description: '' }
    },
    contentDetails: { itemCount: 3 }
  },
  {
    kind: 'youtube#playlist',
    etag: 's-IE9jSaKR7GTB13cr1kzhu82zg',
    id: 'PLYYw9OEv9CEwT5vWNaZVZMXq7fSj_etgE',
    snippet: {
      publishedAt: '2022-08-31T16:38:26Z',
      channelId: 'UCpkVstDSqpHgLuWQQXQDtvg',
      title: 'Git and Github',
      description: '',
      thumbnails: {
        default: { url: 'https://i.ytimg.com/vi/ElRzTuYln0M/default.jpg', width: 120, height: 90 },
        medium: { url: 'https://i.ytimg.com/vi/ElRzTuYln0M/mqdefault.jpg', width: 320, height: 180 },
        high: { url: 'https://i.ytimg.com/vi/ElRzTuYln0M/hqdefault.jpg', width: 480, height: 360 },
        standard: { url: 'https://i.ytimg.com/vi/ElRzTuYln0M/sddefault.jpg', width: 640, height: 480 },
        maxres: { url: 'https://i.ytimg.com/vi/ElRzTuYln0M/maxresdefault.jpg', width: 1280, height: 720 }
      },
      channelTitle: 'MotaBhai Motivation',
      localized: { title: 'Git and Github', description: '' }
    },
    contentDetails: { itemCount: 1 }
  },
  {
    kind: 'youtube#playlist',
    etag: 'OiWQdB-kfzaLjezP9wDuy7nIKxA',
    id: 'PLYYw9OEv9CEz9VTXapCqTXcoCV1VJBffn',
    snippet: {
      publishedAt: '2022-04-14T06:32:34Z',
      channelId: 'UCpkVstDSqpHgLuWQQXQDtvg',
      title: 'pug',
      description: '',
      thumbnails: {
        default: { url: 'https://i.ytimg.com/vi/R5W7NVskve8/default.jpg', width: 120, height: 90 },
        medium: { url: 'https://i.ytimg.com/vi/R5W7NVskve8/mqdefault.jpg', width: 320, height: 180 },
        high: { url: 'https://i.ytimg.com/vi/R5W7NVskve8/hqdefault.jpg', width: 480, height: 360 },
        standard: { url: 'https://i.ytimg.com/vi/R5W7NVskve8/sddefault.jpg', width: 640, height: 480 },
        maxres: { url: 'https://i.ytimg.com/vi/R5W7NVskve8/maxresdefault.jpg', width: 1280, height: 720 }
      },
      channelTitle: 'MotaBhai Motivation',
      localized: { title: 'pug', description: '' }
    },
    contentDetails: { itemCount: 1 }
  },
  {
    kind: 'youtube#playlist',
    etag: '_s-4WTm54J7qOfwr5OyJpT1KT0w',
    id: 'PLYYw9OEv9CEyvmNb84Pt8HzBuJ_pUyRpx',
    snippet: {
      publishedAt: '2021-12-17T08:12:41Z',
      channelId: 'UCpkVstDSqpHgLuWQQXQDtvg',
      title: 'xd into html and csss',
      description: '',
      thumbnails: {
        default: { url: 'https://i.ytimg.com/vi/goI6JHO99Qg/default.jpg', width: 120, height: 90 },
        medium: { url: 'https://i.ytimg.com/vi/goI6JHO99Qg/mqdefault.jpg', width: 320, height: 180 },
        high: { url: 'https://i.ytimg.com/vi/goI6JHO99Qg/hqdefault.jpg', width: 480, height: 360 },
        standard: { url: 'https://i.ytimg.com/vi/goI6JHO99Qg/sddefault.jpg', width: 640, height: 480 },
        maxres: { url: 'https://i.ytimg.com/vi/goI6JHO99Qg/maxresdefault.jpg', width: 1280, height: 720 }
      },
      channelTitle: 'MotaBhai Motivation',
      localized: { title: 'xd into html and csss', description: '' }
    },
    contentDetails: { itemCount: 2 }
  },

]

const MyPlaylist = () => {
  const [parent, enableAnimations] = useAutoAnimate();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {

    async function fetchUserPlaylists() {

      try {
        const playlistRes = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/playlists`);

        // console.log(playlistRes.data);

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
        return <div className="group flex flex-col h-fit bg-white border border-gray-200 rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] min-w-2/6 shadow-lg shadow-slate-500/40">



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