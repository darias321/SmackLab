import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import GradientButton from "../Button/GradientButton";
import { Link, BrowserRouter as Router } from "react-router-dom";
import ProfileCard from "../Profile/ProfileCard";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "../Card/Card";
import Quiz from "../Quiz/Quiz";
import QuizCard from "../Quiz/index";
import axios from "axios";
import AnswerOption from "../Quiz/AnswerOption";
import "../Pages/Styles.css";
import "./Profile.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Profile = () => {
  const [profileState, setProfileState] = useState(null);

  // // useEffect(() => {
  // //   const token = localStorage.getItem("token");
  //   axios({
  //     method: "GET",
  //     url: "",
  //     headers: { "x-auth-token": token },
  //   })
  //     .then((response) => {
  //       const profileInfo = response.data;
  //       setProfileState(profileInfo);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // const initialState = {
  //   questions: [],
  // };

  // const [data, setData] = React.useState(initialState);
  // const handleInputChange = (event) => {
  //   setData({
  //     ...data,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  // const submitState = (e) => {
  //   e.preventDefault();
  //   Profile(data)
  //     .then((res) => {
  //       console.log(res.data.user);
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // };
  // const token = localStorage.getItem("token");
  // console.log(state);
  // return new Promise((resolve, reject) => {
  //   axios({
  //     method: "POST",
  //     url: `http://localhost:5000/api/users/profile`,
  //     headers: {
  //       "x-auth-token": token,
  //     },
  //     data: {
  //       questions: state.questions,
  //     },
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       resolve(response);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
  const classes = useStyles();

  const handleSubmit = (answerOptions) => {
    console.log(answerOptions);

    const token = localStorage.getItem("token");
    axios({
      method: "POST",
      url: "api-routes/profile/populate",
      headers: { "x-auth-token": token },
      data: { answers: answerOptions },
    })
      .then((response) => {
        setProfileState({ ...profileState, answerOptions });
        console.log(answerOptions);
      })
      .catch((err) => {
        console.log(err);
        setProfileState({ ...profileState, answerOptions });
      });

    //setProfileState({ ...profileState, answers: answerOptions });
  };

  return (
    <div className="bgProfile">
      <div className={classes.root}>
        <Grid
          container
          spacing={3}
          direction="column-reverse"
          justify="center"
          alignItems="center"
          className="Profile text-black"
        >
          {profileState && <ProfileCard profileInfo={profileState} />}
        </Grid>
        <Grid
          container
          spacing={3}
          direction="column-reverse"
          justify="center"
          alignItems="center"
        >
          <QuizCard handleSubmit={handleSubmit} />
        </Grid>
      </div>
    </div>
  );
};

export default Profile;
