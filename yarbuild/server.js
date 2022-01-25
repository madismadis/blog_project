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
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const db_1 = require("./db/db");
// const server = http.createServer((req, res) =>{
//     res.statusCode = 200;
//     res.setHeader('Content-Type','text/plain');
//     res.end('Hello!');
// });
// let message: String = 'Hello!';
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const httpServer = (0, http_1.createServer)(app_1.default);
    yield (0, db_1.openDatabaseConnection)();
    httpServer.listen(3000, () => {
        console.log('Server started on http://localhost:3000');
    });
});
startServer();
