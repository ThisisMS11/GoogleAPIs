import axios from "axios"
import { cookies } from 'next/headers'

async function getData() {
    const cookieStore = cookies()

    const accessToken = cookieStore.get('accessToken').value;
    const refreshToken = cookieStore.get('refreshToken').value;


    if (accessToken || refreshToken) {
        /* make the axios call to get the most popular videos from youtube */
        const tokens = { accessToken, refreshToken };

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/google/videos/popular`, tokens, {});
            return response.data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const dashboard = async () => {
    const popularVideos = await getData();

    return <div className=' h-[100vh] flex flex-wrap gap-4 relative top-[5rem] justify-around'>
        {popularVideos && popularVideos.map((video, index) => {
            return <div key={index}>
                <iframe className='w-[26rem] h-[18rem] rounded-lg' src={`https://www.youtube.com/embed/asfdafaf`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
        })}
    </div>
}

export default dashboard;