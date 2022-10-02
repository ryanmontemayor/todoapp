// import all controller of user
const user_control = require("../controller/c_user");

// routes of user
module.exports.routeUsers = [
    {
        path: "/todoapp/signup",
        method: "post",
        action: user_control.userSignup
    },
    {
        path: "/todoapp/login",
        method: "post",
        action: user_control.userLogin
    }
];