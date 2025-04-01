"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//DB接続してサーバー起動（app.listen()）
//index.ts が「その設計図から実行する建築作業」みたいなもの
require("reflect-metadata");
const ormconfig_1 = require("../ormconfig");
const app_1 = __importDefault(require("./app"));
ormconfig_1.AppDataSource.initialize().then(() => {
    console.log('✅ Database connected!');
    app_1.default.listen(3000, () => {
        console.log('🚀 Server running at http://localhost:3000');
    });
})
    .catch((error) => {
    console.error('❌ Database connection failed:', error);
});
