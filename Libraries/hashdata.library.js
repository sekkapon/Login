const sha1 = require('sha1');

class HashData {
    constructor() {}

    hash_password = (password) => {
        var salt = 'salt code to hash password';
        return sha1(password + salt);
    }
}

module.exports = HashData;