const express = require("express");
const app = express();
const cors = require("cors");

const server = require('http').createServer(app);

const io = require('socket.io')(server,{
  allowEIO3: true,
  cors: {
      origin: true,
      credentials: true
  },
});

app.use(cors());
app.use(express.json());
require("dotenv").config();

const authRouter = require("./routes/auth.routes");
const videoRouter = require("./routes/video.routes")(io);


app.use("/", authRouter);
app.use("/video/", videoRouter);
io.on("connection", (socket) => {
    console.log("a user connected");
  
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
  
module.exports = server