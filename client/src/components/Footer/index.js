import React from "react";
import { Grid, Typography, Link, makeStyles } from "@material-ui/core";
import "./Footer.css";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

function Copyright() {
  return (
    <Typography variant="body2" className="text-color" align="left">
      {"Copyright © "}
      <Link color="inherit" href="/">
        SmackLab
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid className="footerColor footer-pos" item xs={6} sm={4}>
          <div className="text-color text-link">
            <p>
              <b>INFO</b>
            </p>
            <p>
              SMACKLAB is the global destination to get the best workout of your
              life while talking smack.
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={4} className="footerColor footer-pos2">
          <div id="Footer">
            <div className="text-color" id="FooterLinks">
              <p>
                <b>MORE</b>
              </p>
              <Link color="inherit" href="/About">
                About Us
              </Link>{" "}
              <Link color="inherit" href="/Contact">
                Contact
              </Link>{" "}
              <Link color="inherit" href="/Store">
                Store
              </Link>{" "}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className="footerColor footer-pos" id="Footer">
            <div className="text-color" id="FooterLinks">
              <p>
                <b>FOLLOW US</b>
              </p>
              <InstagramIcon color="inherit" href="/Contact" alt="#Smvcklvb" />
              <FacebookIcon color="inherit" href="/Contact" alt="@Smvcklvb" />
              <TwitterIcon
                color="inherit"
                href="/Contact"
                alt="@Smvcklvbfitness"
              />
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container className="footerColor">
        <Grid item xs={12} className="copyright">
          <Copyright />
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
