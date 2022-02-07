const
    express = require('express'),
    app = express(),
    port = 3000,
    routes = require('./Routes/api.route'),

    middleware = require('./Controllers/middleware'),
    myMiddleware = new middleware(),

    bodyParser = require('body-parser');


app.use(express.json());


app.use('/', myMiddleware.filter_token, routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})