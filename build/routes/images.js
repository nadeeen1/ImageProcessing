'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const routes = express_1.default.Router();
const logger = require('../utilities/logger');
const fs_1 = __importDefault(require('fs'));
const sharp_1 = require('../utilities/sharp');
const processed = 'processedImages';
const images = 'images';
const abs = 'C:/Users/nadin/OneDrive/Desktop/P1/processedImages';
routes.use(logger);
routes.get('/api/images', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const fileName = req.query.filename;
      const width = req.query.width;
      const height = req.query.height;
      let exists = false;
      const length = fs_1.default.readdirSync(images).length;
      if (length !== 0) {
        fs_1.default.readdirSync(processed).forEach((file) => {
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
          yield (0, sharp_1.resize)(newPath, fileName, width, height);
          res.sendFile(
            `C:/Users/nadin/OneDrive/Desktop/P1/processedImages/${fileName}_${width}_${height}.jpg`
          );
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
  })
);
routes.get('/api', (req, res) => {
  res.send(
    'This is an empty api page! Please enter the correct filename and dimensions to begin the process!'
  );
});
module.exports = routes;
exports.default = routes;
