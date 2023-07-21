'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';


export default function RecipeReviewCard({ video }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function formatNumber(number) {
        const symbols = ["", "K", "M", "B", "T", "Q"];
        const exp = Math.floor(Math.log10(number) / 3);
        const formattedNumber = (number / Math.pow(10, exp * 3)).toFixed(1);
        return formattedNumber + symbols[exp];
    }


    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={video.snippet.channelTitle}
                subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="194"
                image={video.snippet.thumbnails.standard.url}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {video.snippet.title}
                </Typography>
            </CardContent>


            <CardActions >

                <IconButton aria-label="share">
                    <VisibilityIcon className='text-gray-500' />
                    <Typography>
                        {formatNumber(video.statistics.viewCount)}
                    </Typography>
                </IconButton>


                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                    <Typography>
                        {formatNumber(video.statistics.likeCount)}
                    </Typography>
                </IconButton>

                <IconButton aria-label="share">
                    <ChatIcon />
                    <Typography>
                        {formatNumber(video.statistics.commentCount)}
                    </Typography>
                </IconButton>

                <IconButton aria-label="share" >
                    <PlayCircleOutlineIcon 
                    className='text-red-500 w-8 h-8'
                    
                    />
                </IconButton>


            </CardActions>

        </Card>
    );
}
