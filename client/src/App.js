import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
// import AuthReducer from "./reducers/authReducer";
// import useReducer from "./reducers/useReducer";

import Chat from "./components/Chat/Chat";
import Home from "./components/Pages/Home";
import SignUp from "./components/Pages/SignUp";
import Login from "./components/Pages/Login";
import Quiz from "./components/Quiz/";
import Header from "./components/AppBar";
import Footer from "./components/Footer";
import Categories from "./components/Exercise/Categories";
import ExercisesList from "./components/Exercise/ExerciseList";
import Profile from "./components/Profile/Profile";
import Contact from "./components/Pages/Contact";
import About from "./components/Pages/About";
import Landing from "./components/Pages/Landing";
import Calc from "./components/Calculator/index";
import axios from "axios";

import "./App.css";
import Fab from "@material-ui/core/Fab";

const App = () => {
  const { auth, setAuth } = useAuthContext();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // async function isLoggedIn() {
    //   if (token) {
    //     await setAuth({ type: "LOGGED_IN", payload: { user: localStorage.getItem('user'), token: token } });
    //   }
    // }
    isLoggedIn(token);
    console.log(auth);
  }, []);

  const isLoggedIn = (token) => {
    return new Promise((resolve, reject) => {
        axios({
          method: "GET",
          uri: 'http://localhost:5000/api/users/verify',
          headers: {
            Authorization: "Bearer" + token,
          },
        })
        .then((response) => {
            console.log(response);
            setAuth({ type: "LOGGED_IN" });
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
    });
  };

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      // localStorage.getItem('token') !== null
      auth.isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  );

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          {/* {!auth.isAuthenticated ? <Login /> : <Home />} */}
          <Route exact path="/" component={Landing} />
          <PrivateRoute exact path="/home" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/chat" component={Chat} />
          <PrivateRoute exact path="/quiz" component={Quiz} />
          <PrivateRoute exact path="/categories" component={Categories} />
          <PrivateRoute exact path="/exercises" component={ExercisesList} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/calculator" component={Calc} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about" component={About} />
        </Switch>
        {/* Floating Button for chatter */}
        <Fab color="secondary" variant="extended" aria-label="chat">
          {"Let's Chat..."}
        </Fab>
        <Footer />
      </div>
    </Router>
  );
};

// }
// }

export default App;
