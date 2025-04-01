"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Expressアプリの設定・初期化だけ　純粋にアプリの設定だけ
//app.ts が「Expressアプリの設計図」、index.ts が「その設計図から実行する建築作業」
const express_1 = __importDefault(require("express"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/todos', todoRoutes_1.default);
exports.default = app;
