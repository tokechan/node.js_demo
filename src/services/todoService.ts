let todos: { id: number; text: string }[] = [];

export const getAll = async () => todos;

export const create = async (text: string) => {
    const todo = { id: Date.now(), text };
    todos.push(todo);
    return todo;
};
