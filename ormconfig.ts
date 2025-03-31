// MySQL への接続設定

import 'reflect-metadata';
import { DataSource } from "typeorm";
import { Todo } from './src/models/Todo';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost', // Docker service name
    port: 3306, // Internal port in the container
    username: 'root',
    password: 'password',
    database: 'todo_db',
    entities: [Todo],
    synchronize: false,
    logging: true,
    migrations: ['src/migrations/*.ts'],
})