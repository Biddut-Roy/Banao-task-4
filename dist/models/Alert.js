"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const alertSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true },
    symbol: { type: String, required: true },
    targetPrice: { type: Number, required: true },
    direction: { type: String, enum: ['above', 'below'], required: true },
    notified: { type: Boolean, default: false },
});
const Alert = mongoose_1.default.model('Alert', alertSchema);
exports.default = Alert;
