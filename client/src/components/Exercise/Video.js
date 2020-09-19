import React, { useState, useEffect } from "react";
import axios from "axios";

const API = `AIzaSyAvqG7JViWXH4CoAiI80z2eBPw5PQF2YQM`;

const Video = (props) => {
  const [stateId, setId] = useState({ id: "" });
  const [videoLink, setVideoLink] = useState({ link: [] });
  const [state, setState] = useState({ id: [] });

  let links = [];
  let arr = [];

  console.log(stateId);

  axios.get("/profile", (req, res) => {
    const id = req.body.id;
    setId({ id: id });
  });

  axios
    .post("/uservideo", {
      id: stateId.id,
      link: videoLink.link,
    })
    .then((res) => {
      console.log(res);
    });

  const getVideo = () => {
    axios
      .get(
        ` https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&key=${API}&q=${props.name}`
      )
      .then((res) => {
        const id = console.log(res.data.items[0].id.videoId);
        arr.push(id);
        links.push(`https://www.youtube.com/watch?v=${id}`);
      });

    setState({ id: arr });
    setVideoLink({ link: links });
  };

  useEffect(() => {
    getVideo();
  }, []);
};
export default Video;
