'use client';

import axios from "axios"
import Card from '../../components/Videos/Card'
// import popularVideos from "./demodata"
import CheckAuth from '../../components/Auth'
import { useState, useEffect } from "react";



const dashboard = async () => {


    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(`/api/google/videos/popular`);
                setVideos(response.data.data)
            } catch (error) {
                console.log(error);
                throw error;
            }
        }

        getData();

    }, [])


    return <div className=' h-[100vh] flex flex-wrap gap-4 relative  justify-around '>

        {videos && videos.map((video) => {
            return <div key={video.id}
                className=" h-fit p-2 "
            >

                <Card video={video} />

            </div>
        })}
    </div>
}

export default CheckAuth(dashboard);