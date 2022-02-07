const
    queryDB = require("../Models/query.database"),
    query = new queryDB(),

    hashLibrary = require("../Libraries/hashdata.library"),
    hashData = new hashLibrary(),

    twoFactorLibrary = require("../Libraries/twofactor.library"),
    twoFactor = new twoFactorLibrary();


class Main {
    constructor() {}
    ifLogin = async(req, res) => {
        const { username, password } = req.body;
        try {
            if (req.body.hasOwnProperty('username') == false && req.body.hasOwnProperty('password') == false) { /* เช็คเงื่อนไข key username,password ใน json  */
                res.status(500).send({
                    'error': true,
                    'message': 'incorrect key in body'
                });
            }
            if (await query.checkLogin(username, 1) == false) { /* เช็คเงื่อนไข username ถูกต้องหรือไม่ */
                res.status(500).send({
                    'error': true,
                    'message': 'incorrect username or password'
                });
            }
            if (await query.checkLogin(await hashData.hash_password(password), 2) == false) { /* เช็คเงื่อนไข password ถูกต้องหรือไม่ */
                res.status(500).send({
                    'error': true,
                    'message': 'incorrect username or password'
                });
            }
            res.json({ status: 'login success' });
        } catch (err) {
            res.status(500).send({
                'error': true,
                'message': err
            })
        } finally {
            return false;
        }
    }

    register = async(req, res) => {
        const { username, password, firstname, phone } = req.body;

        try {
            if (req.body.hasOwnProperty('username') == false && req.body.hasOwnProperty('password') == false &&
                req.body.hasOwnProperty('firstname') == false && req.body.hasOwnProperty('phone') == false) { /* เช็คเงื่อนไข key username,password,firstname,phone ใน json  */
                res.status(500).send({
                    'error': true,
                    'message': 'incorrect key in body'
                });
            }
            if (await query.hasBeenUsed(username) == false) {
                res.status(500).send({
                    'error': true,
                    'message': 'username has be used'
                });
            }
            if (await query.insertUser(req.body) == false) {
                res.status(500).send({
                    'error': true,
                    'message': 'register error'
                });
            }
            await twoFactor.createTwoFactor(req, res)
        } catch (err) {
            res.status(500).send({
                'error': true,
                'message': err
            })
        } finally {
            return false;
        }
    }

}
module.exports = Main;