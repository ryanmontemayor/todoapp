const sequelize = require("../config/dbase");
const { DataTypes } = require("sequelize");

// create mmodel for the user login
const Todos = sequelize.define("todos", {
    // primary key of the user
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: "id"
    },

    // relation to user
    userID: DataTypes.INTEGER.UNSIGNED,

    title: DataTypes.STRING(50),
    message: DataTypes.STRING(250),
    datetime: DataTypes.DATE,

    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

}, { freezeTableName: true, timestamps: true });

module.exports = { Todos };