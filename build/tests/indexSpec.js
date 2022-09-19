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
const supertest_1 = __importDefault(require('supertest'));
const index_1 = __importDefault(require('../index'));
const request = (0, supertest_1.default)(index_1.default);
describe('GET endpoint', function () {
  it('responds with image', function () {
    return __awaiter(this, void 0, void 0, function* () {
      const response = yield request.get(
        '/api/images?filename=encenadaport&width=200&height=200'
      );
      expect(response.status).toBe(200);
    });
  });
  it('responds with image', function () {
    return __awaiter(this, void 0, void 0, function* () {
      const response = yield request.get(
        '/api/images?filename=fjord&width=200&height=200'
      );
      expect(response.status).toBe(200);
    });
  });
  it('responds with an error', () =>
    __awaiter(this, void 0, void 0, function* () {
      const response = yield request.get(
        '/api/images?filename=invalid&width=150&height=160'
      );
      expect(response.status).toBe(400);
    }));
  it('responds with an error', () =>
    __awaiter(this, void 0, void 0, function* () {
      const response = yield request.get(
        '/api/images?filename=invalid&width=a&height=b'
      );
      expect(response.status).toBe(400);
    }));
  it('retrieves image from cache', () =>
    __awaiter(this, void 0, void 0, function* () {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = yield request.get(
        '/api/images?filename=palmtunnel&width=100&height=100'
      );
      if (response.status == 200) {
        const response1 = yield request.get(
          '/api/images?filename=palmtunnel&width=100&height=100'
        );
        expect(response1.status).toBe(304);
      }
    }));
});
