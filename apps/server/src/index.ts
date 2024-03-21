import express from "express";
import { authController, defaultController, userController } from "./controllers/api";
import http from "http";
import { SocketServerInit } from "./controllers/sockets/socketController";
require("dotenv").config({ path: ".env.local" });

const app = express();
const port = process.env.SERVER_PORT;
const server = http.createServer(app);
const cors = require("cors");

app.use(cors({ exposedHeaders: ["token"] }));

// Api Route Handlers
app.use("/auth", authController());
app.use("/user/default", defaultController());
app.use("/user/update", userController());

// Initialize Socket Server
SocketServerInit(server);

server.listen(port, () => {
  console.log("Server running at port : ", port);
});
