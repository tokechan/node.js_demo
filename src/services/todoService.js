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
exports.create = exports.getAll = void 0;
const ormconfig_1 = require("../../ormconfig");
const Todo_1 = require("../models/Todo");
const todoRepo = ormconfig_1.AppDataSource.getRepository(Todo_1.Todo);
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield todoRepo.find();
});
exports.getAll = getAll;
const create = (title, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = todoRepo.create({ title, completed: false, user: { id: userId } });
    return yield todoRepo.save(todo);
});
exports.create = create;
