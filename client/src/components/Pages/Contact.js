import React from "react";
import emailjs from "emailjs-com";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  TextareaAutosize,
  Link,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";

// CSS
import "./Styles.css";
import "./Contact.css";

export default function ContactUS() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "gmail",
        "template_3b1aoz4",
        e.target,
        "user_nrgx1QJAWq0Ptc9TE9HGw"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <div id="Contact">
      <Grid
        container
        className="bgShadow container"
        spacing={2}
        justify="center"
      >
        <Grid item xs={12}>
          <h2 className="weight800">Smack talk with us!</h2>
          <p className="weight500 text-crimson">
            Not sure if this is the right method for you? Send us an email, a
            smacker will respond to you within a few smackable moments.
          </p>
        </Grid>
        <Grid className="email shadow" justify="center">
          <form onSubmit={sendEmail}>
            <Grid item xs={12} spacing={1} className="margin">
              <TextField
                id="filled-basic"
                type="text"
                placeholder="Name"
                name="name"
                label="Name"
              />
              <TextField
                id="filled-basic"
                type="email"
                id="filled-basic"
                placeholder="Email Address"
                name="email"
                label="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                placeholder="Subject"
                name="subject"
                label="subject"
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                rowsMin={5}
                placeholder="Your message"
                name="message"
              ></TextareaAutosize>
            </Grid>
            <Grid item xs={12}>
              <input type="submit" className="btn" value="Send Message"></input>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
