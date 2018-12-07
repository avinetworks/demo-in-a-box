"use strict";
var express = require('express'),
    app = express();

app.use(express.bodyParser());
app.use(setHeaders);
app.use(app.router);
app.use(delayRequest);
app.use(setresponseStatus);
app.all('*', handleNonGet);
app.use(express.static(__dirname));

var port = process.env.PORT || 7777,
    ip = process.env.IP;

console.log('Starting node on: ' + ip + ':' + port);
app.listen(port, ip);

function setHeaders(req, res, next) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
}

function delayRequest(req, res, next) {
    var delay = parseInt(req.query.delay);

    if (!delay) {
        next();
        return;
    }

    setTimeout(function() {
        next();
    }, delay);
}

function setresponseStatus(req, res, next) {
    var responseStatus = parseInt(req.query.responseStatus);

    if (responseStatus > 0) {
        res.status(responseStatus)
    }
    next();
}

function handleNonGet(req, res, next) {
    req.method = 'GET';
    next();
}