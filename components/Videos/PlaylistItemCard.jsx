'use client';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Checkbox from '@mui/material/Checkbox';
import { useRouter } from 'next/navigation';
import axios from 'axios';


function truncateStringWithEllipsis(str, maxWords) {
    // Split the string into an array of words
    const words = str.trim().split(/\s+/);

    // Return the original string if it has fewer words than the maximum
    if (words.length <= maxWords) {
        return str;
    }

    // Truncate the array to the maximum number of words
    const truncatedWords = words.slice(0, maxWords);

    // Join the words back into a string and add '...' at the end
    return truncatedWords.join(' ') + '...';
}

export default function Play({ video, isViewed }) {
    const theme = useTheme();

    const router = useRouter();

    const [checked, setChecked] = React.useState(isViewed);

    /* will handle the viwed status of the video */
    const handleViewedStatus = async (event) => {

        const videoId = video.snippet.resourceId.videoId;
        if (checked) {
            /* call the uncheck api */
            try {
                const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/api/user/videos/markNotViewed/${videoId}`, {}, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })

                // console.log("video marked as not viewed", response.data)
                alert(`${video.snippet.resourceId.videoId} video marked as not viewed`)
                setChecked(event.target.checked);

            } catch (error) {
                console.log(error);
            }

        } else {
            /* call the check api */
            try {
                const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/api/user/videos/markViewed/${videoId}`, {}, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })

                // console.log("video marked as viewed", response.data)
                alert(`${video.snippet.resourceId.videoId} video marked as  viewed`)
                setChecked(event.target.checked);

            } catch (error) {
                console.log(error);
            }
        }
    };


    /* navigate to the video page */
    const showVideo = (videoid) => {
        // console.log('videoID : ', videoid)
        router.push(`/videos/${videoid}`)
    }



    return (
        <Card sx={{ maxWidth: 950 }} className='shadow-lg flex justify-between flex-col md:flex-row' >

            <CardMedia
                component="img"
                className='w-full md:w-48'
                image={video.snippet.thumbnails.high.url}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {video.snippet.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {truncateStringWithEllipsis(video.snippet.description, 20)}
                    </Typography>
                </CardContent>
                <Box className='flex justify-between'>

                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <IconButton aria-label="previous">
                            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                        </IconButton>
                        <IconButton aria-label="play/pause" onClick={() => showVideo(video.snippet.resourceId.videoId)} >
                            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                        <IconButton aria-label="next">
                            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                        </IconButton>
                    </Box>

                    <Checkbox defaultChecked={isViewed} onChange={handleViewedStatus} />
                </Box>

            </Box>

        </Card>
    );
}