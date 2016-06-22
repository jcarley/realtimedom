import _ from 'lodash';
import Promise from 'bluebird';
import colors from 'colors';

let gm = require('gm').subClass({imageMagick: true});

let inputfile = "./images/P1180111.JPG";
let outputFile = "./images/P1180111_thumbnail.JPG";
let outputFile2 = "./images/P1180111_oriented.JPG";
let outputFile3 = "./images/P1180111_preview.JPG";

// convert "./images/P1180111.JPG" "-auto-orient" "./images/P1180111_oriented.JPG"
// gm(inputfile)
  // .autoOrient()
  // .write(outputFile2, function (err) {
  // });

// convert "-quality" "60" "./images/P1180111.JPG" "./images/P1180111_preview.JPG"
gm(inputfile)
  .quality(60)
  .write(outputFile3, function (err) {
  });

 // /usr/local/bin/identify -ping -verbose ./images/P1180111.JPG
// gm(file)
  // .identify(function (err, data) {
    // // if (!err) console.log(data)
  // });

// convert "./images/P1180111.JPG" "-resize" "240x240" "./images/P1180111_thumbnail.JPG"
// gm(inputfile)
  // .resize(240, 240)
  // .write(outputFile, function (err) {
// });

// identify "-ping" "-format" "%wx%h" "./images/P1180111.JPG"
// gm(inputfile)
  // .size(function (err, size) {
  // });
