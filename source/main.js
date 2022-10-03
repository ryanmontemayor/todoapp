// set timezone
process.env.TZ = "Asia/Manila";

// configuration env file
require('dotenv').config();

// express package
const express = require("express");
// cors package
const cors = require("cors");
// app express
const app = express();
// json fro express
app.use(express.json());
// url encoded
app.use(express.urlencoded({ extended: true }));
// add cors to express
app.use(cors());

// all routes
const { appRoutes } = require("./routes");

// middleware for authenticating user
const { Authenticate } = require("./helper/authen");

// route that allow default
const allowroute = [
    "/todoapp/signup",
    "/todoapp/login"
];

// register all routes - register all route
appRoutes.forEach((route) => {
    if (allowroute.includes(route.path)) {
        app[route.method](route.path, route.action);
    } else {
        app[route.method](route.path, Authenticate, route.action);
    }
});

// listening
app.listen(process.env.APP_PORT, function() {
    console.log("LISTENING ON \x1b[4m%s\x1b[0m", `http://localhost:${process.env.APP_PORT}`);
});

// process killer
process.on('SIGINT', () => {
    const { sequelize } = require("./config/dbase");
    sequelize.close();
    console.log("SIGINT");
    process.exit(0);
});

process.on('exit', () => {
    console.log("EXITING");
});