import Card from '../../components/Videos/Card'
// import popularVideos from "./demodata"
import CheckAuth from '../../components/Auth'
import { cookies } from 'next/headers'


/* get popular videos */
async function getData() {

    const url = `${process.env.NEXT_PUBLIC_SERVER}/api/google/videos/popular`;

    const res = await fetch(url, {
        headers: { Cookie: cookies().toString() },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    
    const data = await res.json();
    return data.data;
}

const dashboard = async () => {

    const videos = await getData();

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