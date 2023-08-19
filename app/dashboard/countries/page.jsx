'use client'
import React, { useEffect, useState, Suspense } from 'react'
import axios from 'axios'
import Card from '../../../components/Videos/Card';

const CountriesPopular = ({ searchParams }) => {

    const { country, videoCategory } = searchParams;

    // console.log({ country, videoCategory });

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function fetchCountryPopularVideos() {
            const url = `${process.env.NEXT_PUBLIC_SERVER}/api/google/videos/popular`;

            try {

                const popularVideos = await axios.post(url, {
                    regionCode: country || 'IN',
                    videoCategory: videoCategory || 0
                })

                console.log({ popularVideos: popularVideos.data.data });


                setVideos(popularVideos.data.data);

            } catch (error) {
                alert('some error occured while fetching videos ');
                console.log(error);
            }
        }

        fetchCountryPopularVideos();
    }, [country, videoCategory])

    if(!videos) return <div>loading...</div>;

    return (
        <section >
            <Suspense fallback={<div>countries result loading...</div>}>

                <div className='flex flex-wrap gap-4 relative justify-center'>
                    {videos && videos.map((video) => {
                        return <div key={video.id}
                            className=" h-fit p-2 "
                        >
                            <Card video={video} ForSearch={false} />
                        </div>
                    })}
                </div>

            </Suspense>


        </section>
    )
}

export default CountriesPopular