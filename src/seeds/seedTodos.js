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
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../../ormconfig");
const Todo_1 = require("../models/Todo");
const User_1 = require("../models/User");
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield ormconfig_1.AppDataSource.initialize();
        const todoRepo = ormconfig_1.AppDataSource.getRepository(Todo_1.Todo);
        const userRepo = ormconfig_1.AppDataSource.getRepository(User_1.User);
        const users = ['Alice', 'Bob', 'Charlie'].map((name) => userRepo.create({ name }));
        for (const user of users) {
            yield userRepo.save(user);
            const todos = [
                { title: 'Write docs', completed: false },
                { title: 'Study TypeORM', completed: false },
                { title: 'Push to GitHub', completed: true },
            ];
            for (const t of todos) {
                const todo = todoRepo.create(t);
                yield todoRepo.save(todo);
            }
        }
        console.log('✅ Seeding completed!');
        process.exit();
    });
}
seed().catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
});
