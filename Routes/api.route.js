const
    express = require('express'),

    router = express.Router(),

    mainController = require('../Controllers/main.controller'),
    main = new mainController(),

    twoFactorLibrary = require("../Libraries/twofactor.library"),
    twoFactor = new twoFactorLibrary();



router.post('/login', main.ifLogin);
router.post('/register', main.register);
router.post('/verify', twoFactor.verify)


module.exports = router;