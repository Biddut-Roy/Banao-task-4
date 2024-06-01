"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptoRoute = void 0;
const express_1 = __importDefault(require("express"));
const crypto_controller_1 = require("./crypto.controller");
const router = express_1.default.Router();
router.get('/data/:id?', crypto_controller_1.cryptoController.getData);
router.get('/', (req, res) => {
    console.log('cheking');
    res.send('chek');
});
exports.cryptoRoute = router;
