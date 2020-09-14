const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 5000;
const path = require("path");
const cors = require("cors");

app.use(cors());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

//initial codes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options('*', cors());

// const apiRoutes = require("./routes/api-routes");
// app.use(apiRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

io.on("connection", (socket) => {
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

http.listen(4000, () => {
  console.log("Chat is now on stand-by at at port http://localhost:4000");
});
app.listen(PORT, () => {
  console.log(`API Server is up and Listening at - http://localhost:${PORT}`);
});

// mongoose.connect(
//   process.env.MONGODB_CONNECTION_STRING,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   },
//   (err) => {
//     if (err) throw err;
//     console.log("MongoDB is now connected");
//   }
// );

// setup routes

// app.use("/users", require("./routes/userRoutes"));
// app.use("/users", require("./routes/APIRoutes"));
