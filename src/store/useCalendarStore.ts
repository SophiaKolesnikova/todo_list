import {create} from 'zustand';
import {generateId} from "../helpers.ts";
import {devtools} from "zustand/middleware";

interface Task {
    id: string,
    title: string,
    completed: boolean,
}

interface Tasks {
    [key: string]: Task[]
}

interface CalendarStore {
    tasks: Tasks,
    selectedDay: number | null,
    setSelectedDay: (day: number | null) => void,
    setTasks: (tasks: Tasks) => void,
    createTask: (title: string, day: number) => void,
    updateTask: (id: string, title: string, day: number) => void,
    toggleTask: (id: string, completed: boolean, day: number) => void,
    removeTask: (id: string, day: number) => void,
}

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
        const newTask = {
            id: generateId(),
            title: title.trim(),
            completed: false,
        };
        set((state) => {
            const dayTasks = state.tasks[day] || [];
            const updatedTasks = {...state.tasks, [day]: [...dayTasks, newTask]};
            saveStateToLocalStorage({...state, tasks: updatedTasks});
            return {...state, tasks: updatedTasks};
        });
    },
    updateTask: (id, newTitle, day) => {
        if (!newTitle.trim()) return;
        set((state) => {
            const dayTasks = state.tasks[day] || [];
            const updatedTasks = dayTasks.map((task) =>
                task.id === id ? {...task, title: newTitle.trim()} : task
            );
            const newState = {...state, tasks: {...state.tasks, [day]: updatedTasks}};
            saveStateToLocalStorage(newState);
            return newState;
        });
    },
    toggleTask: (id, _completed, day) => {
        set((state) => {
            const dayTasks = state.tasks[day] || [];
            const updatedTasks = dayTasks.map((task) =>
                task.id === id ? {...task, completed: !task.completed} : task
            );
            const newState = {...state, tasks: {...state.tasks, [day]: updatedTasks}};
            saveStateToLocalStorage(newState);
            return newState;
        });
    },
    removeTask: (id, day) => {
        set((state) => {
            // const dayTasks = state.tasks[day] || [];
            const filteredTasks =( state.tasks[day] || []).filter((task) => task.id !== id);
            const newState = {...state, tasks: {...state.tasks, [day]: filteredTasks}};
            saveStateToLocalStorage(newState);
            return newState;
        });
    },
})));

