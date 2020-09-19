import React, { createContext, useReducer, useEffect } from "react";
import { initialState, AuthReducer } from "../reducers/authReducer";
import axios from "axios";

const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const isLoggedIn = () => {
      const token = localStorage.getItem("token");
      setAuth({ type: "USER_LOADING" });
      axios({
        method: "GET",
        url: "api/users/verify", //add localhost:5000 if local
        headers: {
          // "Access-Control-Allow-Headers": 'x-auth-token',
          "x-auth-token": token,
        },
      })
        .then((response) => {
          setAuth({
            type: "LOGIN",
            payload: { user: response.data.user, token: response.data.token },
          });
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
        });
    };
    isLoggedIn();
  }, []);

  console.log("auth context", auth);
  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

const useAuthContext = () => {
  return React.useContext(authContext);
};

export { AuthProvider, useAuthContext };
