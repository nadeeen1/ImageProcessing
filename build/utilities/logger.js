'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const images = 'images';
const fs_1 = __importDefault(require('fs'));
function logger(req, res, next) {
  const length = fs_1.default.readdirSync(images).length;
  const fileName = req.query.filename;
  const width = req.query.width;
  const height = req.query.height;
  if (
    Number.isNaN(parseInt(width)) ||
    Number.isNaN(parseInt(height)) ||
    fileName == undefined
  ) {
    res
      .status(400)
      .send(
        'Incorrect parameters! Please enter a fileName and numerical dimensions!'
      );
    return;
  }
  if (length == 0) {
    res
      .status(400)
      .send(
        'Your images folder is Empty! Please add images to be processed and try again!'
      );
    return;
  }
  let valid = false;
  fs_1.default.readdirSync(images).forEach((file) => {
    if (file == fileName + '.jpg') {
      valid = true;
    }
  });
  if (!valid) {
    res.status(400).send('Please enter a valid file name!');
    return;
  } else {
    const dateo = new Date();
    const day = ('0' + dateo.getDate()).slice(-2);
    const month = ('0' + (dateo.getMonth() + 1)).slice(-2);
    const year = dateo.getFullYear();
    const hours = dateo.getHours();
    const minutes = dateo.getMinutes();
    const seconds = dateo.getSeconds();
    const dateTime =
      year +
      '-' +
      month +
      '-' +
      day +
      ' ' +
      hours +
      ':' +
      minutes +
      ':' +
      seconds;
    console.log(dateTime);
    next();
  }
}
module.exports = logger;
