import express from 'express';
const routes = express.Router();
const logger = require('../utilities/logger');
import fs from 'fs';
import { resize } from '../utilities/sharp';
const processed = 'processedImages';
const images = 'images';
const abs = 'C:/Users/nadin/OneDrive/Desktop/P1/processedImages';
routes.use(logger);
routes.get('/api/images', async (req, res) => {
  try {
    const fileName: string = req.query.filename as string;
    const width: string = req.query.width as string;
    const height: string = req.query.height as string;
    let exists = false;
    const length = fs.readdirSync(images).length;
    if (length !== 0) {
      fs.readdirSync(processed).forEach((file) => {
        if (file == fileName + '_' + width + '_' + height + '.jpg') {
          exists = true;
        }
      });
    }
    if (exists) {
      const path = abs + '/' + fileName + '_' + width + '_' + height + '.jpg';
      res.status(304).sendFile(path);
      console.log('Retrieved image from cache!');
      return;
    } else {
      if (res.statusCode !== 400) {
        const newPath = `processedImages/${fileName}_${width}_${height}.jpg`;
        await resize(newPath, fileName, width, height);
        res.sendFile(
          `C:/Users/nadin/OneDrive/Desktop/P1/processedImages/${fileName}_${width}_${height}.jpg`
        );
        return;
      }
    }
  } catch (err) {
    console.log(err);
  }
});
routes.get('/api', (req, res) => {
  res.send(
    'This is an empty api page! Please enter the correct filename and dimensions to begin the process!'
  );
});
module.exports = routes;
export default routes;
