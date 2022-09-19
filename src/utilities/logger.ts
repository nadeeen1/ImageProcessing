import express from 'express';
import { NextFunction } from 'express';
const images = 'images';
import fs from 'fs';
function logger(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  const length = fs.readdirSync(images).length;
  const fileName: string = req.query.filename as string;
  const width: string = req.query.width as string;
  const height: string = req.query.height as string;
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
  fs.readdirSync(images).forEach((file) => {
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
