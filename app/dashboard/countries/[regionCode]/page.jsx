'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../../../../components/Videos/Card';

const CountriesPopular = ({ params }) => {

    const { regionCode } = params;

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function fetchCountryPopularVideos() {
            const url = `${process.env.NEXT_PUBLIC_SERVER}/api/google/videos/popular`;

            try {

                const popularVideos = await axios.post(url, {
                    regionCode
                })

                console.log({ popularVideos: popularVideos.data.data });


                setVideos(popularVideos.data.data);

            } catch (error) {
                alert('some error occured while fetching videos ');
                console.log(error);
            }
        }

        fetchCountryPopularVideos();
    }, [])


    return (
        <section >
            <div className='flex flex-wrap gap-4 relative justify-center'>
                {videos && videos.map((video) => {
                    return <div key={video.id}
                        className=" h-fit p-2 "
                    >
                        <Card video={video} ForSearch={false} />
                    </div>
                })}
            </div>

        </section>
    )
}

export default CountriesPopular