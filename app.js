/*jslint node: true */
"use strict";
var inquirer = require("inquirer");
var fs = require('fs');
var promise = require('bluebird');

console.log("Hi, this little script helps organize your music files by artist, album, or any other combination you would like.");

var pathQuestion = [
    {
        type: "input",
        name: "musicPath",
        message: "Where are your media files located? (e.g. /Users/somebody/Music)"
    }
];
inquirer.prompt(pathQuestion, function(response){
    response.musicPath = '/Kitchen/musicbox'; //test path
    scanPath(response.musicPath);
});

var scanPath = function(path){
    walk(path, function(err, filelist){
        if (err) throw err;

        // filelist.forEach(function(file){
        //     console.log(file);
        // });
    });
};

// As seen on http://stackoverflow.com/a/5827895/895695
var walk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = dir + '/' + file;
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};
