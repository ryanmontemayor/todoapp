// import model for user
const { Users } = require("../model/m_user");
const { EncryptPass, DecryptPass } = require("../helper/hash");
const { GenerateToken } = require("../helper/authen");

// user signup controller
module.exports.userSignup = async function(req, res) {
    // get the body payload
    let { title, fname, lname, address, phone, email, pass } = req.body;

    try {
        // determine if user exist using email address
        let user = await Users.findOne({
            where: { email },
            raw: true
        });

        // determine if user exist already
        if (user) {
            return res.status(400).send({
                status: "Conflict",
                message: "User email address already exist",
                email
            });
        }

        // encrypt the password
        let hash = await EncryptPass(pass);

        // store user details and credentials
        let final = await Users.create({
            title, fname, lname, address,
            phone, email, pass: hash
        });

        return res.status(200).send({
            status: "Successful",
            message: "User signup successful",
            email
        });

    } catch (error) {
        return res.status(400).send({
            status: "Error",
            message: "Error accord while signup",
            email
        });
    }
    
};

// user login controller
module.exports.userLogin = async function(req, res) {
    // get the body payload
    let { email, pass } = req.body;

    // determine if user exist
    let user = await Users.findOne({
        where: { email }
    });

    // if user not exist
    if (!user) {
        return res.status(400).send({
            status: "Invalid",
            message: "Email address not register on the TODOAPP",
            email
        });
    }

    // determine the password hashing
    let hashed = await DecryptPass(pass, user.pass);

    // check if password is correct
    if (hashed == true && email == user.email) {
        // create token
        let token = await GenerateToken({ email });

        return res.status(200).send({
            status: "Succesful",
            message: "Login successful",
            email, token
        });
    } else {
        return res.status(400).send({
            status: "Invalid",
            message: "Email address not register on the TODOAPP",
            email
        });
    }
    
};