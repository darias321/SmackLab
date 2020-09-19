import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styling/Categories.css";
import pic0 from "../../images/pic0.jpg";
import pic1 from "../../images/pic1.jpg";
import pic2 from "../../images/pic2.jpg";
import pic3 from "../../images/pic3.jpg";
import pic4 from "../../images/pic4.jpg";
import pic5 from "../../images/pic5.jpg";
import pic6 from "../../images/pic6.jpg";
const picArray = [pic0, pic1, pic2, pic3, pic4, pic5, pic6];

const api = axios.create({
  baseURL: "https://wger.de/api/v2/exercisecategory/",
});

// const api = axios.get("https://wger.de/api/v2/exercisecategory/");
const image = axios.create({
  baseURL: "https://wger.de/api/v2/exerciseimage/",
});

const Exercises = () => {
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
    <div className="container" style={{ border: "1px solid" }}>
      {state.name.map((exercises, index) => (
        <div class="row">
          <div class="col s12 m6">
            <div class="card" onClick={() => getExercises(exercises)}>
              <div class="card-image">
                <img src={picArray[index]} />
                <span class="card-title">{exercises.name}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Exercises;
