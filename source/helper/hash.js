const bcrypt = require("bcrypt");

// hash the password
module.exports.EncryptPass = async function(data) {
    // encrypt the password, using 10 as salt
    return await bcrypt.hash(data, 10);
};

// compare hash
module.exports.DecryptPass = async function(data, hash) {
    // decrypt and compare hash from password
    return await bcrypt.compare(data, hash);
};