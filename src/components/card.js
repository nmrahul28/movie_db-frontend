import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const MediaCard = (props) => {
  const handleCard = (e,obj) => {
    props.history.push({
      pathname:'/details',
      state:{
        data:obj
      }
    })
  }
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={(e) => { handleCard(e, props.obj) }}>
        <CardMedia
          className={classes.media}
          image={`https://image.tmdb.org/t/p/w500${props.obj.backdrop_path ? props.obj.backdrop_path : props.obj.poster_path}`}
          title="Contemplative Reptile"
        />
        <CardContent>
          {<Typography gutterBottom variant="h6" component="h2">
            {props.obj.original_title ? props.obj.title : props.obj.original_name}
          </Typography>}
          <Typography variant="body2" color="textSecondary" component="p">
            Rating: {props.obj.vote_average}/10  Language:{props.obj.original_language}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
export default withRouter(MediaCard);