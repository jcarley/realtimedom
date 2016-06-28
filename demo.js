import gm from 'gm';
import { exec } from 'child_process';
import glob from 'glob';

let autoOrientTest = () => {
  let image = gm.subClass({imageMagick: true});
  let originalFile = "./images/KP_6652.jpg";
  let orientedFile = "./images/KP_6652-oriented.jpg";

  let startTime = Date.now();

  gm(originalFile)
    .autoOrient()
    .write(orientedFile, function (err) {
      if (err) {
        console.log(err);
      }

      let endTime = Date.now();
      console.log("autoOrientTest: ", endTime - startTime);
    });
}

let nonAutoOrientTest = () => {
  let originalFile = "./images/model.jpg";
  let orientedFile = "./images/model-oriented.jpg";

  let startTime = Date.now();

  gm(originalFile)
    .autoOrient()
    .write(orientedFile, function (err) {
      if (err) {
        console.log(err);
      }

      let endTime = Date.now();
      console.log("nonAutoOrientTest: ", endTime - startTime);
    });
}

let identify = (image) => {
  let startTime = Date.now();
  // gm(image)
    // .identify(function (err, data) {
      // if (!err) console.log(image, data.Orientation);
      // let endTime = Date.now();
      // console.log(image, endTime - startTime);
    // });

  let command = `exiftool -*orientation -json ${image}`;

  exec(command, (error, stdout, stderr) => {
    if (error) { console.log(error); return; }
    if (stderr) { console.log(stderr); return; }

    var metadata = JSON.parse(stdout)[0];

    let endTime = Date.now();
    console.log(image, endTime - startTime);
    console.log(metadata);
    console.log('========================');
  });
}


let images = [
  './images/KP_6652.JPG',
  './images/KP_6669.JPG',
  './images/model.jpg',
  './images/superbowl.JPG',
  './images/tools.jpg',
  './images/KP_6652-oriented.jpg'
];

let images = glob.sync('/Users/jcarley/Projects/javascripts/realtimedom/images/100EOS1D/**/*.{jpg,jpeg}', {nocase:true});

images.forEach((image) => {
  identify(image);
});

// autoOrientTest();
// nonAutoOrientTest();

