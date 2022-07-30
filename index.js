const express = require("express");
//creating the instance of express function
const app = express();

//creating a server from instance of our app using http
const server = require("http").createServer(app);

// options for cors policy error handling allowing all websites
const options = {
  cors: {
    origin: "*",
  },
};

//creating a socket server
const io = require("socket.io")(server, options);

//enabling view engine for our app
app.set("view engine", "ejs");

//get api which render a html page
app.get("/home", (req, res) => {
  return res.render("home");
});

//making server to listen for incoming requests
server.listen(3000, () => console.log("server runing on 3000 port"));

// socket--logic
/*
for "on" event called "connection" and taking that socket(callback) variable and logginf its id first 
for "on" event called "message" and taking that data (callback) and 
using the socket method called "broadcast" emitts the data to front end
where the front-end  will manage the emiited data to broacast to rest all connected users 
*/
io.on("connection", (socket) => {
  console.log("user connected" + socket.id);

  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });
});
