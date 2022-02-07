const
    queryDB = require('../Models/query.database'),
    query = new queryDB();

class Middleware {
    filter_token = async(req, res, next) => {
        try {
            const { token } = req.headers;
            if (req.headers.hasOwnProperty('token') == false) {
                res.status(500).send({
                    'error': true,
                    'message': 'nothing token in headers'
                });
            }
            if (await query.get_token(token) == false) {
                res.status(500).send({
                    'error': true,
                    'message': 'token error'
                });
            }
            return next();
        } catch (err) {
            res.status(500).send({
                'error': true,
                'message': err
            })
        }
    }
}
module.exports = Middleware;