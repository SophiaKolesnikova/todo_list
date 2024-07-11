import {create} from 'zustand';
import {generateId} from "../helpers.ts";
import {devtools} from "zustand/middleware";

export interface Task{
    id: string,
    title: string,
    completed: boolean,
}

export interface Tasks {
    [key: string]: Task[]
}

export interface CalendarStore {
    tasks: Tasks,
    selectedDay: string | null,
    setSelectedDay: (day: string | null) => void,
    setTasks: (tasks: Tasks) => void,
    createTask: (title: string, day: string) => void,
    updateTask: (id: string, title: string, day: string) => void,
    toggleTask: (id: string, completed: boolean, day: string) => void,
    removeTask: (id: string, day: string) => void,
}

const dateToKey = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
};

const saveStateToLocalStorage = (state: CalendarStore) => {
    window.localStorage.setItem('calendar', JSON.stringify(state));
};

const loadStateFromLocalStorage = (): CalendarStore => {
    const savedState = window.localStorage.getItem('calendar');
    try {
        return savedState ? JSON.parse(savedState) : {tasks: {}, selectedDay: null};
    } catch {
        return {
            createTask() {
            },
            removeTask() {
            },
            setSelectedDay() {
            },
            setTasks() {
            },
            toggleTask() {
            },
            updateTask() {
            },
            tasks: {},
            selectedDay: null,
        };
    }
};

export const useCalendarStore = create<CalendarStore>()(devtools((set, get) => ({
    ...loadStateFromLocalStorage(),
    setSelectedDay: (day) => {
        set({selectedDay: day});
        saveStateToLocalStorage(get());
    },
    setTasks: (tasks) => {
        set({tasks});
        saveStateToLocalStorage(get());
    },

    createTask: (title, day) => {
        if (!title.trim()) return;
        const dayKey = dateToKey(new Date(day));
        const newTask = {
            id: generateId(),
            title: title.trim(),
            completed: false,
        };
        set((state) => {
            const dayTasks = state.tasks[dayKey] || [];
            const updatedTasks = {...state.tasks, [dayKey]: [...dayTasks, newTask]};
            saveStateToLocalStorage({...state, tasks: updatedTasks});
            return {...state, tasks: updatedTasks};
        });
    },
    updateTask: (id, newTitle, day) => {
        if (!newTitle.trim()) return;
        const dayKey = dateToKey(new Date(day));
        set((state) => {
            const dayTasks = state.tasks[dayKey] || [];
            const updatedTasks = dayTasks.map((task) =>
                task.id === id ? {...task, title: newTitle.trim()} : task
            );
            const newState = {...state, tasks: {...state.tasks, [dayKey]: updatedTasks}};
            saveStateToLocalStorage(newState);
            return newState;
        });
    },
    toggleTask: (id, _completed, day) => {
        const dayKey = dateToKey(new Date(day));
        set((state) => {
            const dayTasks = state.tasks[dayKey] || [];
            const updatedTasks = dayTasks.map((task) =>
                task.id === id ? {...task, completed: !task.completed} : task
            );
            const newState = {...state, tasks: {...state.tasks, [dayKey]: updatedTasks}};
            saveStateToLocalStorage(newState);
            return newState;
        });
    },
    removeTask: (id, day) => {
        const dayKey = dateToKey(new Date(day));
        set((state) => {
            const filteredTasks =( state.tasks[dayKey] || []).filter((task) => task.id !== id);
            const newState = {...state, tasks: {...state.tasks, [dayKey]: filteredTasks}};
            saveStateToLocalStorage(newState);
            return newState;
        });
    },
})));

