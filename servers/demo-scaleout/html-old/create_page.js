"use strict";
var fs = require('fs'),
    wrench = require('wrench'),
    htmlFileDir = __dirname + '/';

var folders = ['abc-1', 'abc-2', 'abc-3',
    'nyc-1', 'nyc-2', 'nyc-3', 'nyc-4', 'nyc-5'
];
folders.forEach(function(item) {
    saveHtmlFile(item);
});

function saveHtmlFile(input) {
    var fileName = htmlFileDir + input + '.html';
    var fileDict = getResourceFiles(input);
    var top = '<!DOCTYPE html><hmtl>\n<head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>' + input + '</title></head>\n<body>\n';
    var middle = createMiddle(input, fileDict);
    var bottom = '</body>\n</html>';
    var text = top + middle + bottom;
    fs.writeFile(fileName, text, function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('Wrote: ' + fileName);
        }
    });
}

function createMiddle(input, fileDict) {
    var middleText = '';
    Object.keys(fileDict).forEach(function(key) {
        fileDict[key].forEach(function(file) {
            var src = input + '/' + file;
            var extension = key.toLowerCase();
            switch (extension) {
                case '.jpg':
                case '.png':
                case '.gif':
                    middleText += '<img src="' + src + '"/>';
                    break;
                case '.css':
                    middleText += '<link rel="stylesheet" href="' + src + '">';
                    break;
                case '.js':
                    middleText += '<script src="' + src + '"></script>';
                    break;
                case '.txt':
                    middleText += '<p>' + src + '</p>';
                    break;
                default:
                    console.log(extension);
                    throw 'Unexpected file type';
            }
            middleText += '\n';

        });
    });
    return middleText;
}

function getResourceFiles(input) {
    var files = wrench.readdirSyncRecursive(__dirname + '/' + input);

    var fileDict = {
        '.txt': [makeParagraph(50, 200)]
    },
        //, 'js'
        fileTypes = ['jpg', 'gif', 'png', 'css']
            .map(function(item) {
                return '\.' + item + '$';
            }),
        fileTypesRegEx = new RegExp(fileTypes.join('|'), 'i');
    for (var i = files.length - 1; i >= 0; i--) {
        var file = files[i],
            match = file.match(fileTypesRegEx);
        if (match) {
            if (!fileDict[match[0]]) {
                fileDict[match[0]] = [];
            }
            fileDict[match[0]].push(file);
        }
    };

    Object.keys(fileDict).forEach(function(key) {
        fileDict[key].sort();
    });

    return fileDict;
}

function randomLength(min, max) {
    var possible = [];
    for (var i = min; i <= max; i++) {
        possible.push(i);
    }
    return possible[Math.floor(Math.random() * possible.length)];
}

function makeParagraph(min, max) {
    var text = "";
    for (var i = min; i <= max; i++) {
        text += makeRandomString(randomLength(1, 20)) + " ";
    }
    return text;

}

function makeRandomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}