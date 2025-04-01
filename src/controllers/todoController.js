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
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const ormconfig_1 = require("../../ormconfig");
const Todo_1 = require("../models/Todo");
const User_1 = require("../models/User");
const errorMessages_1 = require("./errorMessages");
const successMessage_1 = require("./successMessage");
const httpStatusCodes_1 = require("../constants/httpStatusCodes");
const todoSchema_1 = require("../validations/todoSchema");
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoRepo = ormconfig_1.AppDataSource.getRepository(Todo_1.Todo);
        const todos = yield todoRepo.find({
            relations: ['user']
        });
        res.json({
            message: successMessage_1.successMessages.TODO_FETCHED,
            todos
        });
    }
    catch (error) {
        console.error('Failed to fetch todos', error);
        res.status(httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: errorMessages_1.errorMessages.FAILED_TO_FETCH_TODOS });
    }
});
exports.getTodos = getTodos;
const createTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = todoSchema_1.createTodoSchema.safeParse(req.body);
        if (!parsed.success) {
            const errors = parsed.error.flatten().fieldErrors;
            return res.status(httpStatusCodes_1.HttpStatusCode.BAD_REQUEST).json({ errors });
        }
        const { title, userId } = parsed.data;
        const todoRepo = ormconfig_1.AppDataSource.getRepository(Todo_1.Todo);
        const userRepo = ormconfig_1.AppDataSource.getRepository(User_1.User);
        const user = yield userRepo.findOneBy({ id: userId });
        if (!user) {
            return res.status(httpStatusCodes_1.HttpStatusCode.NOT_FOUND).json({ error: errorMessages_1.errorMessages.USER_NOT_FOUND });
        }
        const newTodo = new Todo_1.Todo();
        newTodo.title = title;
        newTodo.completed = false;
        newTodo.user = user;
        const saved = yield todoRepo.save(newTodo);
        res.status(httpStatusCodes_1.HttpStatusCode.CREATED).json({
            message: successMessage_1.successMessages.TODO_CREATED,
            todo: saved
        });
    }
    catch (error) {
        console.error('Failed to create todo', error);
        res.status(httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: errorMessages_1.errorMessages.FAILED_TO_CREATE_TODO });
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const parsed = todoSchema_1.updateTodoSchema.safeParse(req.body);
        if (!parsed.success) {
            const errors = parsed.error.flatten().fieldErrors;
            return res
                .status(httpStatusCodes_1.HttpStatusCode.BAD_REQUEST)
                .json({ errors });
        }
        const todoRepo = ormconfig_1.AppDataSource.getRepository(Todo_1.Todo);
        const todo = yield todoRepo.findOneBy({ id: Number(id) });
        if (!todo) {
            return res
                .status(httpStatusCodes_1.HttpStatusCode.NOT_FOUND)
                .json({ error: errorMessages_1.errorMessages.TODO_NOT_FOUND });
        }
        const { title, completed } = parsed.data;
        if (title !== undefined)
            todo.title = title;
        if (completed !== undefined)
            todo.completed = completed;
        const updatedTodo = yield todoRepo.save(todo);
        res.json({
            message: successMessage_1.successMessages.TODO_UPDATED,
            todo: updatedTodo
        });
    }
    catch (error) {
        console.error('Failed to update todo', error);
        res
            .status(httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json({ error: errorMessages_1.errorMessages.FAILED_TO_UPDATE_TODO });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = todoSchema_1.todoIdParamSchema.safeParse(req.params);
        if (!parsed.success) {
            const errors = parsed.error.flatten().fieldErrors;
            return res.status(httpStatusCodes_1.HttpStatusCode.BAD_REQUEST).json({ errors });
        }
        const { id } = parsed.data;
        const todoRepo = ormconfig_1.AppDataSource.getRepository(Todo_1.Todo);
        const todo = yield todoRepo.findOneBy({ id });
        console.log('🧪 todo result:', todo); // ここで null/undefined か確認
        if (!todo) {
            return res
                .status(httpStatusCodes_1.HttpStatusCode.NOT_FOUND)
                .json({ error: errorMessages_1.errorMessages.TODO_NOT_FOUND });
        }
        yield todoRepo.remove(todo);
        res.status(httpStatusCodes_1.HttpStatusCode.NO_CONTENT).json({
            message: successMessage_1.successMessages.TODO_DELETED
        });
    }
    catch (error) {
        console.error('Failed to delete todo', error);
        res.status(httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: errorMessages_1.errorMessages.FAILED_TO_DELETE_TODO });
    }
});
exports.deleteTodo = deleteTodo;
