const { Op } = require("sequelize");
// import model for todos and user
const { Todos } = require("../model/m_todo");
const { Users } = require("../model/m_user");

// controller for todos
module.exports.TodosAdd = function(req, res) {
    // body payload
    let { title, message, datetime } = req.body;

    // insert todos on logedin user
    Todos.create({
        title, message, datetime, userID: req.user.id
    }).then(result => {
        return res.status(200).send({ 
            status: "Successful", 
            message: "Successfuly creating TODO",
            data: { title, message, datetime }
        });
    }).catch(error => {
        return res.status(400).send({ 
            status: "Invalid", 
            message: "Error accord while creating TODO"
        });
    });
};


// list all todos belongs to the user
module.exports.TodosList = function(req, res) {
    // get the query
    let { page, size, title } = req.query;

    page = parseInt(page);
    size = parseInt(size);

    // list all todos
    Todos.findAndCountAll({
        attributes: ["title", "message", "datetime"],
        where: { userID: req.user.id, active: true, title: {[Op.like]: `%${title}%`} },
        limit: size,
        offset: size * (page - 1),
        order: [["createdAt", "DESC"]],
        raw: true
    }).then(result => {
        // for pagination
        result["cpage"] = page;
        result["tpage"] = Math.ceil(result.count / size);

        res.status(200).send(result);
    }).catch(error => {
        res.status(400).send(error);
    });
}