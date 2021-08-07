import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 700,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const FavoriteCard = (props) => {
    const [value, setValue] = React.useState(0);
    const [colorFlag, setColorFlag] = useState('');
    const [item, setItem] = React.useState({ emailId: '', movieId: '' });
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    useEffect(() => {
        let emailId = localStorage.getItem('userEmail');
        let movieId = props.movieobj.id;
        axios.get("http://localhost:8080/getmovie", { params: { emailId, movieId } })
            .then((res) => {
                if(res.data){
                    console.log(res.data);
                    setItem({ ...item, emailId: res.data.emailId, movieId: res.data.movieId })
                }
                else{
                    setItem({ ...item, emailId: "", movieId: ""})
                }
            }).catch((err) => {
                console.log(err.message)
            })
    }, [colorFlag])

    const addFavourite = (e) => {
        let emailId = localStorage.getItem('userEmail');
        let movieId = props.movieobj.id;
        let movieObj = props.movieobj;
        axios.post("http://localhost:8080/add", { emailId, movieId, movieObj })
            .then((res) => {
                console.log(res)
                setColorFlag('added');
            }).catch((err) => {
                console.log(err.message)
            })
    }
    const deleteFavourite = (e) => {
        let emailId = localStorage.getItem('userEmail');
        let movieId = props.movieobj.id;
        axios.delete("http://localhost:8080/deletemovie", { params: { emailId, movieId } })
        .then((res)=>{
            console.log(res)
            setColorFlag('removed')
        }).catch((err)=>{
            console.log(err.message);
        })
    }
    console.log(item)
    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {props.movieobj.original_title ? props.movieobj.title[0] : props.movieobj.original_name[0]}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.movieobj.original_title ? props.movieobj.title : props.movieobj.original_name}
                subheader={props.movieobj.release_date}
            />
            <CardMedia
                className={classes.media}
                image={`https://image.tmdb.org/t/p/w500${props.movieobj.backdrop_path ? props.movieobj.backdrop_path : props.movieobj.poster_path}`}
                title="Paella dish"
            />
            <CardContent>
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend"><b>Rating</b></Typography>
                    <Rating value={(props.movieobj.vote_average * 5) / 10} precision={0.5} readOnly /> </Box>
            </CardContent>
            <CardActions disableSpacing>
                {localStorage.getItem('userEmail') !== item.emailId && props.movieobj.id !== item.movieId ?
                    <IconButton aria-label="add to favorites" onClick={(e) => { addFavourite(e) }}>
                        <FavoriteIcon />
                    </IconButton> : <IconButton aria-label="add to favorites" style={{ color: "red" }} onClick={(e) => { deleteFavourite(e) }}>
                        <FavoriteIcon />
                    </IconButton> }
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Overview:</Typography>
                    <Typography paragraph>
                        {props.movieobj.overview}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
export default FavoriteCard;