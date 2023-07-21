import axios from "axios"
import { cookies } from 'next/headers'
import Card from '../../components/Videos/Card'
import popularVideos from "./demodata"

// async function getData() {
//     const cookieStore = cookies()

//     const accessToken = cookieStore.get('accessToken').value;
//     const refreshToken = cookieStore.get('refreshToken').value;


//     if (accessToken || refreshToken) {
//         /* make the axios call to get the most popular videos from youtube */
//         const tokens = { accessToken, refreshToken };

//         try {
//             const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/google/videos/popular`, tokens, {});
//             return response.data.data;
//         } catch (error) {
//             console.log(error);
//             throw error;
//         }
//     }
// }

const dashboard = async () => {
    // const popularVideos = await getData();
    // console.log(popularVideos);

    return <div className=' h-[100vh] flex flex-wrap gap-4 relative  justify-around '>

        {popularVideos && popularVideos.map((video) => {
            return <div key={video.id}
                className=" h-fit p-2 "
            >

                <Card video={video} />

            </div>
        })}
    </div>
}

export default dashboard;