import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

import Home from "./components/Pages/Home";
import SignUp from "./components/Pages/SignUp";
import Login from "./components/Pages/Login";
import Quiz from "./components/Quiz/";
import Header from "./components/AppBar/index";
import PrivateBar from "./components/AppBar/PrivateBar";
import Footer from "./components/Footer";
import ExercisesList from "./components/Exercise/ExerciseList";
import Profile from "./components/Profile/Profile";
import Contact from "./components/Pages/Contact";
import Test from "./components/Pages/Exercises";
import About from "./components/Pages/About";
import Landing from "./components/Pages/Landing";
import Calc from "./components/Calculator/index";
import ChatBtn from "./components/ChatBtn/ChatBtn";

import "./App.css";
import PrivateRoute from "./handlers/PrivateRoute";
import PublicRoute from "./handlers/PublicRoute";
import Store from "./components/Pages/Store";

const App = () => {
  const { auth } = useAuthContext();

  return (
    <Router>
      <div className="App">
        {!auth.isAuthenticated ? <Header /> : <PrivateBar />}
        <Switch>
          {/* {!auth.isAuthenticated ? <Login /> : <Home />} */}
          <Route exact path="/" component={Landing} />
          <PrivateRoute exact path="/home" component={Home} />
          <PublicRoute exact path="/signup" component={SignUp} />
          <PublicRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/quiz" component={Quiz} />
          <PrivateRoute exact path="/exercises" component={Test} />
          <Route exact path="/exercises/:muscles" component={ExercisesList} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/calculator" component={Calc} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about" component={About} />
          <Route exact path="/store" component={Store} />
        </Switch>
        {/* Floating Button for chatter */}
        {!auth.isAuthenticated ? null : <ChatBtn />}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
