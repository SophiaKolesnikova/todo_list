import React from "react";
import { Box } from "@mui/material";
import InputAdd from "../InputAdd";
import InputTask from "../InputTask";
import { useToDoStore } from "../../store/useToDoStore";
import styles from './index.module.scss';


const App: React.FC = () => {
    const [
        tasks,
        createTask,
        updateTask,
        removeTask,
        toggleTask
    ] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
        state.toggleTask
    ]);


    return (
        <Box className={styles.app}>
            <h1 className={styles.appTitle}>To Do App</h1>
            <InputAdd
                onAdd={(title) => {
                    if (title) {
                        createTask(title)
                }
                }}
            />
            {!tasks.length && (
                <p className={styles.appText}>There is no task.</p>
            )}
            {tasks.map((task) => (
                <InputTask
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    onDone={toggleTask}
                    onEdited={updateTask}
                    onRemoved={removeTask}
                />
            ))}
        </Box>
    )
}

export default App
