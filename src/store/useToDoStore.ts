import { create } from 'zustand';
import { generateId } from "../helpers.ts";

interface Task {
    id: string,
    title: string,
    created: number,
    completed: boolean
}

interface ToDoStore {
    tasks: Task[],
    createTask: (title: string) => void,
    updateTask: (id: string, title: string) => void,
    toggleTask: (id: string) => void,
    removeTask: (id: string) => void,
}

export const useToDoStore = create<ToDoStore>((set, get) => ({
    tasks: [],
    createTask: (title: string) => {
        const {tasks} = get();
        const newTask = {
            id: generateId(),
            title,
            created: Date.now(),
            completed: false
        }
        set({
            tasks: [newTask].concat(tasks)
        })
    },
    updateTask: (id: string, title: string) => {
        const {tasks} = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title,
            }))
        })
    },
    toggleTask: (id: string) => {
        const {tasks} = get();
        const toggledTask = tasks.find((task) => task.id === id);
        toggledTask.completed = !toggledTask.completed
    },
    removeTask: (id: string) => {
        const {tasks} = get();
        set({
            tasks: tasks.filter((task) => task.id !== id)
        })
    }
}));