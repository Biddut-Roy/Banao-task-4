"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_route_1 = require("./app/cryptocurrency/crypto.route");
const alertController_1 = require("./controllers/alertController");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/alerts', alertController_1.createAlert);
setInterval(alertController_1.checkAlerts, 60);
app.use('/crypto', crypto_route_1.cryptoRoute);
app.get('/', (req, res) => {
    res.send('server is starting');
});
exports.default = app;
