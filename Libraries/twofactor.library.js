const
    JsonDB = require('node-json-db').JsonDB,
    Config = require('node-json-db/dist/lib/JsonDBConfig').Config,

    speakeasy = require("speakeasy"),

    db = new JsonDB(new Config("MyData", true, false, '/'));

class TwoFactor {
    constructor() {}
    createTwoFactor = (req, res) => {
        const id = 1; /* สมมติ id ว่าเป็น id 1 */
        try {
            /*  สร้าง secert key */
            const temp_secret = speakeasy.generateSecret();

            /*  สร้างข้อมูล json ใน user */
            db.push(`/user/${id}`, { id, temp_secret });
            res.json({ id, secret: temp_secret.base32 });
        } catch (err) {
            res.status(500).send({
                'error': true,
                'message': err
            })
        } finally {
            return false;
        }
    }

    verify = async(req, res) => {
        const { id, token } = req.body;
        try {
            // Retrieve user from database
            const user = db.getData(`/user/${id}`),
                /* get ข้อมูล user จากไฟล์ json */
                { base32: secret } = user.secret,
                /* เช็คเลข 2 factor กับ authen */
                verified = speakeasy.totp.verify({
                    secret,
                    encoding: 'base32',
                    token
                });
            console.log({ user })
            if (verified) {
                // Update user data
                res.json({ status: true })
            } else {
                res.json({ status: false })
            }
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

module.exports = TwoFactor;