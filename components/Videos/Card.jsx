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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';


export default function RecipeReviewCard({ video }) {

    console.log(video);

    const [expanded, setExpanded] = React.useState(true);
    const router = useRouter();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const options = [
        'Watch Later',
        'Remove From List'
    ];

    function formatNumber(number) {
        const symbols = ["", "K", "M", "B", "T", "Q"];
        const exp = Math.floor(Math.log10(number) / 3);
        const formattedNumber = (number / Math.pow(10, exp * 3)).toFixed(1);
        return formattedNumber + symbols[exp];
    }

    const showvideo = (id) => {
        router.push(`/videos/${id}`)
    }


    return (
        <Card sx={{ maxWidth: 345, minHeight: 500, position: 'relative' }}>
            {/* header  */}
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon onClick={handleClick} />
                    </IconButton>
                }
                title={video.snippet.channelTitle}
                subheader="September 14, 2016"
            />

            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: 48 * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>

            {/* image  */}
            <CardMedia
                component="img"
                height="194"
                image={video.snippet.thumbnails.high.url}
                alt="Paella dish"
            />

            {/* title */}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {video.snippet.title}
                </Typography>
            </CardContent>

            {/* statistics  */}
            <CardActions className='absolute bottom-0 w-full'>

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

                <IconButton aria-label="share" onClick={() => showvideo(video.id)} >
                    <PlayCircleOutlineIcon
                        className='text-red-500 w-8 h-8'

                    />
                </IconButton>


            </CardActions>

        </Card>
    );
}