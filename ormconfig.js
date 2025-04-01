"use strict";
// MySQL への接続設定
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Todo_1 = require("./src/models/Todo");
const User_1 = require("./src/models/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'db', // Docker service name
    port: 3306, // Internal port in the container
    username: 'root',
    password: 'password',
    database: 'todo_db',
    entities: [Todo_1.Todo, User_1.User],
    synchronize: false,
    logging: true,
    migrations: ['src/migrations/*.ts'],
});
