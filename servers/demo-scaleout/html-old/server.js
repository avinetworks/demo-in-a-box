"use strict";
var express = require('express'),
    fs = require('fs'),
    app = express(),
    //TODO: Save to some share instead of the local folder so when this is ran on multiple machines it doesn't have issues
    log_location = __dirname + '/har_logs/';

app.use(setHeaders);
app.use(express.bodyParser());
app.use(app.router);

app.get('/api/pages', getHtmlFiles);
app.post('/api/har', saveHarFile);
app.use(express.static(__dirname));

var port = process.env.PORT || 9999;
console.log('Starting node on: ' + port);
//app.listen(port);
app.listen(port, '10.40.14.100');

function createDateString() {
    var d = new Date();
    return d.getUTCFullYear() + "_" + d.getUTCMonth() + "_" + d.getUTCDate() + "__" + d.getUTCHours() + "_" + d.getUTCMinutes() + "_" + d.getUTCSeconds() + "__" + d.getUTCMilliseconds();
}

function saveHarFile(req, res) {
    if (req.body && req.body.har) {

        var dateString = createDateString(),
            fileName = log_location + dateString + '.har';

        fs.writeFile(fileName, req.body.har, function(err) {
            if (err) {
                res.json({
                    msg: 'Error while writing file: ' + err
                });
            } else {
                res.json({
                    msg: 'har file saved as: ' + fileName
                });
            }
        });
    } else {
        res.json({
            msg: 'Error, there was no body or har!'
        });
    }
}

function setHeaders(req, res, next) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
}

function getHtmlFiles(req, res) {
    fs.readdir(__dirname, function(err, files) {
        if (err) {
            res.json({
                error: 'failed to read directory: ' + __dirname
            });

        }
        var htmlPages = [];
        for (var i = files.length - 1; i >= 0; i--) {
            var file = files[i];
            if (file.match(/\.html$/i)) {
                htmlPages.push(file);
            }
        };
        htmlPages = htmlPages.sort();
        res.json({
            pages: htmlPages
            // pages: [
            //     "index.html",
            //     "nut.html"
            // ]
        });
    });
}
