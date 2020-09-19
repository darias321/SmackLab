import React, { useEffect, useState } from "react";
import Exercise from "./Exercises";
import allExercises from "./Exercise.json";
import axios from "axios";
import Video from "./Video";
import ExerciseCard from "./Card/ExerciseCard";
import { Grid } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  useParams,
} from "react-router-dom";
import "../Pages/Styles.css";

const ExerciseList = () => {
  let parts = [];
  const [state, setState] = useState({ name: [] });
  const [bodyParts, setBodyParts] = useState({ body: [] });
  let { muscles } = useParams();

  const getExercises = () => {
    allExercises.map((exercise) => {
      if (exercise[0] === muscles) {
        exercise.splice(0, 1);
        exercise.map((muscle) => {
          console.log(muscle);
          parts.push(muscle);
        });
      }

      setBodyParts({ body: parts });
    });
  };

  useEffect(() => {
    getExercises();
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/exercises/:muscles">
            {/* <Exercise/> */}
            <h1 className="weight800 font40">This is {muscles}</h1>
            <div className="Techniques">
              <Grid container className="container" spacing={2}>
                {bodyParts.body.map((exercise) => {
                  console.log(exercise);
                  return (
                    <Grid item xs={6}>
                      <ExerciseCard
                        name={exercise}
                        exercise={exercise}
                        text={muscles}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default ExerciseList;
