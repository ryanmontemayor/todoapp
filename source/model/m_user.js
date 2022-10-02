const sequelize = require("../config/dbase");
const { DataTypes } = require("sequelize");

const { Todos } = require("./m_todo");

// create mmodel for the user login
const Users = sequelize.define("users", {
    // primary key of the user
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: "id"
    },

    title: DataTypes.STRING(50),
    fname: DataTypes.STRING(100),
    lname: DataTypes.STRING(100),
    address: DataTypes.STRING(200),

    phone: DataTypes.STRING(25),
    email: DataTypes.STRING(150),

    pass: DataTypes.STRING(100),

    active: {
        type: DataTypes.BOOLEAN,
        default: true
    }

}, { freezeTableName: true, timestamps: true });


// relation
Users.hasMany(Todos, {
    foreignKey: "userID",
    sourceKey: "id",
    as: "todos"
});

Todos.belongsTo(Users, {
    foreignKey: "userID",
    targetKey: "id"
});


module.exports = { Users };