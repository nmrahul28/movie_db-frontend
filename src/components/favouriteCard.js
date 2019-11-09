import React from 'react';
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
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const addFavourite=(e)=>{
        let emailId=localStorage.getItem('userEmail');
        let movieId=props.movieobj.id;
        let backdrop_path=props.movieobj.backdrop_path;
        let movieObj={
            firstName:'Manikanta Rahul',
            lastName:'Nelluru',
            id:100
        }
        axios.post("http://localhost:8080/add",{emailId, movieId, backdrop_path,movieObj})
        .then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err.message)
        })
    }

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
                <Typography variant="body2" color="textSecondary" component="p">
                    Rating: {props.movieobj.vote_average}/10 | Language:{props.movieobj.original_language}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={(e)=>{addFavourite(e)}}>
                    <FavoriteIcon />
                </IconButton>
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