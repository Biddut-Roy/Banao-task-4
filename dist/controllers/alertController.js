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
exports.checkAlerts = exports.createAlert = void 0;
const Alert_1 = __importDefault(require("../models/Alert"));
const cryptoService_1 = require("../services/cryptoService");
const createAlert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, symbol, targetPrice, direction } = req.body;
    const alert = new Alert_1.default({ id, symbol, targetPrice, direction });
    yield alert.save();
    res.status(201).send(alert);
});
exports.createAlert = createAlert;
const checkAlerts = () => __awaiter(void 0, void 0, void 0, function* () {
    const alerts = yield Alert_1.default.find({ notified: false });
    for (const alert of alerts) {
        const currentPrice = yield (0, cryptoService_1.fetchCryptoPrice)(alert.id);
        if ((alert.direction === 'above' && currentPrice > alert.targetPrice) ||
            (alert.direction === 'below' && currentPrice < alert.targetPrice)) {
            // Notify the user (this could be via email, SMS, etc.)
            alert.notified = true;
            yield alert.save();
            console.log(`Alert triggered for ${alert.id}: ${alert.symbol} is  ${alert.targetPrice} and current prices ${currentPrice}`);
        }
    }
});
exports.checkAlerts = checkAlerts;
