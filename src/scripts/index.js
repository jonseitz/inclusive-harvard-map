/* eslint-disable no-console, no-global-assign */
require('dotenv').config();
require = require('esm')(module);
const convert = require('./convert').default;
const upload = require('./upload').default;

const argument = process.argv[2];

if (argument === 'convert') {
  convert()
    .then((result) => {
      console.log(`CONVERSION FINISHED: Wrote ${result.length} files`);
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
} else if (argument === 'upload') {
  console.log(process.env);
  upload()
    .then((result) => {
      console.log(`UPLOAD FINISHED: added ${result.length} objects`);
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
} else {
  convert()
    .then((converted) => {
      console.log(`CONVERSION FINISHED: Wrote ${converted.length} files`);
      return upload();
    })
    .then((uploaded) => {
      console.log(`UPLOAD FINISHED: added ${uploaded.length} objects`);
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
