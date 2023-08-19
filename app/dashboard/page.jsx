import Card from '../../components/Videos/Card'
// import popularVideos from "./demodata"
import CheckAuth from '../../components/Auth'
import { cookies } from 'next/headers'
// import Search from '../../components/Search'

async function delay() {
    return new Promise(resolve => setTimeout(resolve, 10 * 60 * 1000));
}

/* get popular videos */
async function getData() {

    // await delay();
    
    const url = `${process.env.NEXT_PUBLIC_SERVER}/api/google/videos/popular`;

    const res = await fetch(url, {
        method: "POST",
        headers: {
            Cookie: cookies().toString(),
        },
        body: JSON.stringify({
            regionCode: 'IN',
            videoCategory: 0,
        }),
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    return data.data;
}

const dashboard = async () => {

    const videos = await getData();
    // const videos = popularVideos;


    return <section >

        {/* <Search /> */}

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
}

export default CheckAuth(dashboard);