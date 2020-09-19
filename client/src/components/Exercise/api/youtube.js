import axios from "axios";

const KEY = "AIzaSyAvqG7JViWXH4CoAiI80z2eBPw5PQF2YQM"; // mention your youtube API key here

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY,
  },
});
