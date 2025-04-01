"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoIdParamSchema = exports.updateTodoSchema = exports.createTodoSchema = void 0;
const zod_1 = require("zod");
exports.createTodoSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: 'Title is required' }),
    userId: zod_1.z.number({ invalid_type_error: 'userID must be a number' })
        .int()
        .positive({ message: 'Valid userID is required' }),
});
exports.updateTodoSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: 'Title is required' }).optional(),
    completed: zod_1.z.boolean().optional(),
});
exports.todoIdParamSchema = zod_1.z.object({
    id: zod_1.z
        .string()
        .regex(/^\d+$/, { message: 'Invalid ID format' })
        .transform(Number),
});
