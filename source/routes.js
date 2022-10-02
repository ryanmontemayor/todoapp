// User routes
const { routeUsers } = require("./route/r_user");
const { routeTodos } = require("./route/r_todo");

// export all routes
module.exports.appRoutes = [
    ...routeUsers,
    ...routeTodos
];