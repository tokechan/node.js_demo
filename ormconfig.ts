// MySQL への接続設定

import 'reflect-metadata';
import { DataSource } from "typeorm";
import { Todo } from './src/models/Todo';
import { User } from './src/models/User';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'db', // Docker service name
    port: 3306, // Internal port in the container
    username: 'root',
    password: 'password',
    database: 'todo_db',
    entities: [Todo, User],
    synchronize: false,
    logging: true,
    migrations: ['src/migrations/*.ts'],
});

export default AppDataSource;
