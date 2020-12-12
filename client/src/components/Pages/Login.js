import React from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  makeStyles,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Grid,
  Typography,
} from "@material-ui/core";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Route, Redirect, useHistory } from "react-router-dom";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };

  const { setAuth } = useAuthContext();

  const [data, setData] = React.useState(initialState);
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  let history = useHistory();

  const submitState = (e) => {
    e.preventDefault();
    loginUser(data)
      .then((res) => {
        // setState({
        //   ...state,
        //   [e.target.name]:e.target.value
        // });
        console.log(res.data.user);
        setAuth({
          type: "LOGIN",
          payload: { user: res.data.user, token: res.data.token },
        });
        history.push("/home");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const loginUser = (state) => {
    console.log(state);
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: `api/users/login`, //add http://localhost:5000 for speed.
        data: {
          email: state.email,
          password: state.password,
        },
      })
        .then((response) => {
          console.log(response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
    },
    image: {
      backgroundImage: "url(https://source.unsplash.com/featured/?workout)",
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "dark"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  return (
    <div id="Login">
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={data.email}
                onChange={handleInputChange}
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={data.password}
                onChange={handleInputChange}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {data.errorMessage && (
                <span className="form-error">{data.errorMessage}</span>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={data.isSubmitting}
                onClick={submitState}
              >
                {data.isSubmitting ? "Loading..." : "Login"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
