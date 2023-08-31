'use client';

import React, { useEffect, useState } from 'react'
import PlaylistItemCard from '../../../components/Videos/PlaylistItemCard'
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

const data = [
    {
        kind: 'youtube#playlistItem',
        etag: 'j0tDQqIBzVKEqYZs-IWWPoOBLD0',
        id: 'UExZWXc5T0V2OUNFem5xRzRWa3VJZ0c1NlYyaWFtZlBSei41NkI0NEY2RDEwNTU3Q0M2',
        snippet: {
            publishedAt: '2023-03-01T10:31:26Z',
            channelId: 'UCpkVstDSqpHgLuWQQXQDtvg',
            title: 'Install Latest Mongo DB, Mongo Express GUI using Docker Compose file (Database Management UI Tool)',
            description: 'Install and Run Latest Mongo DB, Mongo Express GUI (Database Management UI Tool) on Docker using Docker-compose file on any OS like Ubuntu, Mac, Windows\n\nDocker-Compose file Github: https://github.com/uzrnem/docker-compose-files/blob/main/mongodb-expressui.yml',
            thumbnails: {
                default: {
                    url: 'https://i.ytimg.com/vi/ilvMtjzDnE0/default.jpg',
                    width: 120,
                    height: 90
                },
                medium: {
                    url: 'https://i.ytimg.com/vi/ilvMtjzDnE0/mqdefault.jpg',
                    width: 320,
                    height: 180
                },
                high: {
                    url: 'https://i.ytimg.com/vi/ilvMtjzDnE0/hqdefault.jpg',
                    width: 480,
                    height: 360
                },
                standard: {
                    url: 'https://i.ytimg.com/vi/ilvMtjzDnE0/sddefault.jpg',
                    width: 640,
                    height: 480
                },
                maxres: {
                    url: 'https://i.ytimg.com/vi/ilvMtjzDnE0/maxresdefault.jpg',
                    width: 1280,
                    height: 720
                }
            },
            channelTitle: 'MotaBhai Motivation',
            playlistId: 'PLYYw9OEv9CEznqG4VkuIgG56V2iamfPRz',
            position: 0,
            resourceId: {
                kind: 'youtube#video',
                videoId: 'ilvMtjzDnE0'
            },
            videoOwnerChannelTitle: 'Er Bhagyesh',
            videoOwnerChannelId: 'UCmSqoWoQVHU52JuDiQ6J2WQ'
        },
        contentDetails: {
            videoId: 'ilvMtjzDnE0',
            videoPublishedAt: '2022-02-13T18:04:14Z'
        }
    },
    {
        kind: 'youtube#playlistItem',
        etag: 'YvO72unLnsQXelfuZ4sZGHhOsXs',
        id: 'UExZWXc5T0V2OUNFem5xRzRWa3VJZ0c1NlYyaWFtZlBSei4yODlGNEE0NkRGMEEzMEQy',
        snippet: {
            publishedAt: '2023-03-03T11:28:34Z',
            channelId: 'UCpkVstDSqpHgLuWQQXQDtvg',
            title: 'BHEED Announcement! Rajkummar Rao, Bhumi Pednekar | Anubhav Sinha',
            description: 'Presenting #Bheed, a social drama, shedding light on the dichotomy and complexities through the toughest times our country faced! \n\nAnubhav Sinha Presents\n\n "Bheed" A Story Of The Darkest Times In Black & White\n\nA Benaras Mediaworks Production\nAn Anubhav Sinha Film\nProduced By Anubhav Sinha\nCo Produced By Drub Kumar Dubey, Sagar Shirgaonkar\n\nReleasing in cinemas on 24th March, 2023\n\n___________________________________\nEnjoy & stay connected with us!\n👉 Subscribe to T-Series: http://bit.ly/TSeriesYouTube\n👉 Like us on Facebook: https://www.facebook.com/tseriesmusic\n👉 Follow us on Twitter: https://twitter.com/tseries\n👉 Follow us on Instagram: http://bit.ly/InstagramTseries',
            thumbnails: {
                default: {
                    url: 'https://i.ytimg.com/vi/cDaZf16Qr7M/default.jpg',
                    width: 120,
                    height: 90
                },
                medium: {
                    url: 'https://i.ytimg.com/vi/cDaZf16Qr7M/mqdefault.jpg',
                    width: 320,
                    height: 180
                },
                high: {
                    url: 'https://i.ytimg.com/vi/cDaZf16Qr7M/hqdefault.jpg',
                    width: 480,
                    height: 360
                },
                standard: {
                    url: 'https://i.ytimg.com/vi/cDaZf16Qr7M/sddefault.jpg',
                    width: 640,
                    height: 480
                },
                maxres: {
                    url: 'https://i.ytimg.com/vi/cDaZf16Qr7M/maxresdefault.jpg',
                    width: 1280,
                    height: 720
                }
            },
            channelTitle: 'MotaBhai Motivation',
            playlistId: 'PLYYw9OEv9CEznqG4VkuIgG56V2iamfPRz',
            position: 1,
            resourceId: {
                kind: 'youtube#video',
                videoId: 'cDaZf16Qr7M'
            },
            videoOwnerChannelTitle: 'T-Series',
            videoOwnerChannelId: 'UCq-Fj5jknLsUf-MWSy4_brA'
        },
        contentDetails: {
            videoId: 'cDaZf16Qr7M',
            videoPublishedAt: '2023-03-03T08:10:39Z'
        }
    }
]



export default function PlaylistItems({ params, searchParams }) {
    // console.log(params);
    const playlistId = params.id;

    /* two api calls have to be here */

    const useStyles = makeStyles({
        PostGrid: {
            overflowY: 'scroll',
            maxHeight: '500px',
            '&::-webkit-scrollbar': {
                width: 0
            },
            display: 'flex',
            flexDirection: 'column',
        }
    });

    const classes = useStyles();

    const [user, setUser] = useState(null);
    const [playlist, setPlaylist] = useState([]);
    const [playlistItems, setPlaylistItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');
                const requests = [
                    axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/user`, { headers: { 'Authorization': `Bearer ${token}` } }),
                    axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/playlists/playlistItems/${playlistId}`, { headers: { 'Authorization': `Bearer ${token}` } }),
                    axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/playlists/${playlistId}`, { headers: { 'Authorization': `Bearer ${token}` } })
                ];

                const [userInfoResponse, playlistItemsResponse, playlistInfoResponse] = await Promise.all(requests);

                setUser(userInfoResponse.data.user);
                setPlaylistItems(playlistItemsResponse.data.data);

                console.log(playlistInfoResponse.data.data);
                
                setPlaylist(playlistInfoResponse.data.data);
            } catch (error) {
                console.log(error);
                // Handle errors gracefully
            }
        }

        fetchData();
    }, []);



    if (user == null || playlistItems == null || playlist==null) return <div>loading..</div>

    return (
        <>
            <div>
                <div className='mt-4 text-3xl text-center font-semibold'>
                    Playlist Videos
                </div>

                <div className='md:m-4 flex flex-col md:flex-row h-[80vh] rounded-md shadow-lg  bg-grey-400  '>

                    <div className='h-88 md:h-full'>

                        <div className='p-10'>
                            <img src="https://i.ytimg.com/vi/cDaZf16Qr7M/mqdefault.jpg" alt="image not found" className='w-full rounded-md' />

                            <p className='text-xl mt-3'>
                                {playlist.snippet.title}
                            </p>

                            <p className='text-slate-400 text-sm'>
                                {playlist.snippet.description || 'No Description'}
                            </p>
                        </div>
                    </div>

                    <Grid className={classes.PostGrid} >
                        {
                            playlistItems.map((video) => (
                                <div key={video.id} className='border-4 w-[20rem] border-white mx-auto md:w-full' >
                                    <PlaylistItemCard video={video} isViewed={user.videosViewed.includes(video.snippet.resourceId.videoId)} />
                                </div>
                            ))
                        }
                    </Grid>


                </div>
            </div>
        </ >

    )
}
