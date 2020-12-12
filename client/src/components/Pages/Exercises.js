import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Paper,
  InputBase,
  IconButton,
  TextField,
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Fab from "@material-ui/core/Fab";
import axios from "axios";
// import "./styling/Categories.css";
import pic0 from "../../images/pic0.jpg";
import pic1 from "../../images/pic1.jpg";
import pic2 from "../../images/pic2.jpg";
import pic3 from "../../images/pic3.jpg";
import pic4 from "../../images/pic4.jpg";
import pic5 from "../../images/pic5.jpg";
import pic6 from "../../images/pic6.jpg";
import "./Exercises.css";
import SearchIcon from "@material-ui/icons/Search";
import WorkoutS from "../Exercise/Exercises";
import search from "../img/search.png";

const picArray = [pic0, pic1, pic2, pic3, pic4, pic5, pic6];

const api = axios.create({
  baseURL: "https://wger.de/api/v2/exercisecategory/",
});

const image = axios.create({
  baseURL: "https://wger.de/api/v2/exerciseimage/",
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "2em",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#21212188",
  },
  paper: {
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 3),
  },
}));

function TModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fab
        type="button"
        variant="extended"
        onClick={handleOpen}
        color="secondary"
      >
        Search Exercise
      </Fab>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <WorkoutS />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const Exercises = () => {
  const classes = useStyles();

  const [state, setState] = useState({ name: [], image: [] });

  const getExercises = (exercises) => {
    window.location.href = `exercises/${exercises.name}`;
  };

  const getMuscles = () => {
    api.get("/").then((res) => {
      console.log(res.data.results);
      image.get("/").then((img) => {
        console.log(img.data.results);
        setState({
          name: res.data.results,
          image: img.data.results,
        });
      });
    });
  };

  useEffect(() => {
    getMuscles();
  }, []);

  return (
    <div className="bg">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid className="parentSearch">
            <Paper className="searchDescription">
              <TModal />
            </Paper>
          </Grid>
        </Grid>
        <Grid className="introParent" container spacing={3}>
          <Grid className="introChild" xs={12}>
            <Typography className="introText typewriter">
              <h1>
                <b>
                  THE ESCAPE
                  <br />
                  STARTS HERE.
                </b>
              </h1>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid className="parentTitle" item xs={12}>
            <Typography className="childTitle" variant="h4">
              <b>Popular Exercises</b>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {state.name.map((exercises, index) => (
            <Grid item xs={6} sm={3}>
              <div className="card" onClick={() => getExercises(exercises)}>
                <img
                  className={classes.img}
                  alt="exercise"
                  src={picArray[index]}
                />
                <Typography variant="h5">{exercises.name}</Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Exercises;
