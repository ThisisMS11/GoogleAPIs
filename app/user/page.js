'use client'
import { useState, useEffect } from "react";
import axios from "axios";

const UserInfo = () => {

    const [user, setUser] = useState(null);

    const [files, setFiles] = useState([]);
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // console.log(videoTitle);
        // console.log(videoDescription);
        // console.log(files);

        // Create video data object
        const videoData = new FormData();
        videoData.append('title', videoTitle);
        videoData.append('file', files[0]);
        videoData.append('description', videoDescription);


        try {
            // Make an API call to upload the video

            console.log('here we are something nice is going to happen i guess');

            const url = `${process.env.NEXT_PUBLIC_EXTERNAL_SERVER}/api/upload/video`

            const response = await axios.post(url, videoData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Video uploaded successfully!', response.data);

        } catch (error) {
            console.error('Error uploading video:', error);
        }
    }

    useEffect(() => {
        async function call() {
            const url = `${process.env.NEXT_PUBLIC_EXTERNAL_SERVER}/api/userinfo`
            const response = await axios.get(url);

            console.log(response.data);

            setUser(response.data);
        }
        call();
    }, [])

    if (!user) return <div>User is not here ...</div>
    return (
        <>
            <div>
                <div>{user.name}</div>
                <div>{user.email}</div>
                <div><img src={user.picture} alt="image not found" /></div>
            </div>

            <div>

                <form onSubmit={handleFormSubmit} className='flex flex-col'>

                    <div className='my-4'>
                        <input type="text" placeholder="Title" name='videoTitle' value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} />
                    </div>

                    <div className='my-4'>
                        <textarea placeholder="Description" value={videoDescription} onChange={(e) => setVideoDescription(e.target.value)} />
                    </div>

                    <input type="file" accept=".mp4" onChange={(e) => setFiles(e.target.files)} multiple={false} />

                    <button type="submit" className='border-2 border-black p-4 rounded-md'>Upload Video</button>

                </form>

            </div>
        </>
    )
}
export default UserInfo;