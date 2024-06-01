"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCryptoPrice = void 0;
const axios_1 = __importDefault(require("axios"));
const cache_1 = require("../utils/cache");
const config_1 = __importDefault(require("../app/config"));
const fetchCryptoPrice = (symbol) => __awaiter(void 0, void 0, void 0, function* () {
    const cachedPrice = yield (0, cache_1.getCache)(symbol);
    if (cachedPrice) {
        return parseFloat(cachedPrice);
    }
    const response = yield axios_1.default.get(`${config_1.default.coin_api}?ids=${symbol}&vs_currencies=usd`);
    const price = response.data[symbol].usd;
    yield (0, cache_1.setCache)(symbol, price.toString(), 60); // Cache for 60 seconds
    return price;
});
exports.fetchCryptoPrice = fetchCryptoPrice;
