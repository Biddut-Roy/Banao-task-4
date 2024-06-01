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
exports.setCache = exports.getCache = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redis = new ioredis_1.default(process.env.REDIS_URL || 'redis://localhost:6379');
redis.on('error', (err) => {
    console.error('Redis error:', err);
});
const getCache = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield redis.get(key);
    }
    catch (err) {
        console.error('Error getting cache:', err);
        return null;
    }
});
exports.getCache = getCache;
const setCache = (key, value, ttl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redis.set(key, value, 'EX', ttl);
    }
    catch (err) {
        console.error('Error setting cache:', err);
    }
});
exports.setCache = setCache;
