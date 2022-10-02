const jwt = require("jsonwebtoken");
const { Users } = require("../model/m_user");

// create token
module.exports.GenerateToken = async function(data) {
    // create access token
    let token = jwt.sign(data, process.env.TOKEN_ACCESS, { algorithm: "HS256", expiresIn: process.env.TOKEN_AGE });

    // reuturn the token
    return token;
};

// verify token
module.exports.VerifyToken = VerifyToken;
function VerifyToken(token) {
    let ret = {};
    jwt.verify(token, process.env.TOKEN_ACCESS, { algorithms: ["HS256"] }, (err, dec) => {
        if (err) {
            // err has { name, message, expiredAt };
            let {name, message, expiredAt} = err;
            ret = { status: "Unauthorized", message: name };
        }
        else {
            ret = dec;
        };
    });
    return ret;
};

// authenticate
module.exports.Authenticate = async function(req, res, next) {
    // get the token from header
    let { headers } = req;

    // split the authorization and get the token
    let token = headers.authorization.split(" ")[1];

    // get token token details
    let veri = VerifyToken(token);

    // if token unauthorized
    if (veri.status == "Unauthorized") {
        return res.status(401).send({ 
            status: "Unauthorized", 
            message: "Accessing this location is not allowed for unknown user"
        });
    }

    // verify token on database vs the logged in user
    let user = await Users.findOne({
        where: { email: veri.email },
        raw: true
    });

    // determine if user found
    if (user) {
        // attache the user details on request
        req["user"] = { id: user.id, email: user.email };

        // move to the next function
        next();
    } else {
        return res.status(401).send({ 
            status: "Unauthorized", 
            message: "Accessing this location is not allowed for unknown user"
        });
    }

};