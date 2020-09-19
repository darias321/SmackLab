import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { pink, red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import "./Profile.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: pink[500],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserName = currentUser.first_name;
  const letter = currentUserName[0];

  return (
    <Card className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} className="parentTitle text-blk">
          <CardHeader
            avatar={<Avatar>{props.letter}</Avatar>}
            title={<h3 className="text-blk">{props.fullName}</h3>}
          />
        </Grid>
      </Grid>
      <CardMedia />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <p> Name: {currentUserName} </p>
          <p> Age: {currentUser.age || ""} </p>
          <p> Weight: {currentUser.weight || ""} </p>
          <p> Height: {currentUser.height || ""} </p>
          <p> Fitness Goal: {currentUser.Results} </p>
        </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}

//routes still need to be made from quiz and calculator for profile
