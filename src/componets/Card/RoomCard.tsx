import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

//roomItemInfo
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


const RoomCard = (props: any) => {
    const {
        roomName,
        id: roomId,
        abstract,
        ctime,
        owner
    } = props
    const [expanded, setExpanded] = React.useState(false);

    const navigate = useNavigate();
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className='w-[340px] mr-[16px] mt-[16px]'>
            <CardHeader
                // action={
                //     <IconButton aria-label="settings">
                //         <MoreVertIcon />
                //     </IconButton>
                // }
                title={roomName}
                subheader={dayjs(ctime).format('YYYY年MM月DD日')}
            />
            {/* <CardMedia
                component="img"
                height="40"
                image="/static/images/cards/paella.jpg"
                alt="封面保留"
            /> */}
            <a className='flex items-center ml-[16px] no-underline' href={`/web/zone/${owner.uuid}`}>
                <Avatar sx={{ bgcolor: red[500], height: 24, width: 24 }} sizes='small' />
                {owner.userNickName}
            </a>
            <CardContent>

                <Typography variant="body2" color="text.secondary">
                    {abstract}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {/* <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton> */}
                <Button onClick={() => navigate(`/web/group/${roomId}`)}>进入房间</Button>
            </CardActions>

        </Card>
    );
}

export default RoomCard;
