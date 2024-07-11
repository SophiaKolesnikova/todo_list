import React, {useCallback, useEffect, useState} from "react";
import {useCalendarStore} from "../../store/useCalendarStore.ts";
import Modal from '../Modal/Modal';
import InputTask from "../InputTask/InputTask.tsx";
import InputAdd from "../InputAdd/InputAdd.tsx";
import Calendar from "../Calendar/Calendar.tsx";
import styles from './styles.module.scss';

const App: React.FC = () => {
    const {
        tasks,
        selectedDay,
        createTask,
        updateTask,
        removeTask,
        setSelectedDay,
        setTasks,
        toggleTask,
    } = useCalendarStore((state) => ({
        tasks: state.tasks,
        selectedDay: state.selectedDay,
        createTask: state.createTask,
        updateTask: state.updateTask,
        removeTask: state.removeTask,
        setSelectedDay: state.setSelectedDay,
        setTasks: state.setTasks,
        toggleTask: state.toggleTask,
    }));

    const formatDate = (dateString: string) => {
        const [year, month, day] = dateString.split('-');
        return `${day}.${month}.${year}`;
    };

    const [modal, setModal] = useState(false);

    useEffect(() => {
        const storedData = JSON.parse(window.localStorage.getItem('calendar') || '{}');
        if (storedData.tasks) {
            setTasks(storedData.tasks);
        }
        if (storedData.selectedDay) {
            setSelectedDay(storedData.selectedDay);
        }
    }, [setTasks, setSelectedDay]);

    useEffect(() => {
        if (selectedDay !== null) {
            const newTasks = {...tasks, [selectedDay]: tasks[selectedDay] || []};
            setTasks(newTasks);
        }
    }, [selectedDay, setTasks]);

    const handleDayClick = useCallback((day: string): void => {
        setSelectedDay(day);
        setModal(true);
    }, [setSelectedDay, setModal]);

    const handleModalClose = useCallback(() => {
        setSelectedDay(null);
        setModal(false);
    }, [setSelectedDay, setModal]);

    return (
        <div className={styles.app}>
            <h1 className={styles.appTitle}>Calendar ToDo App</h1>
            <Calendar onClick={handleDayClick} tasks={tasks}/>
            {modal && (
                <Modal onClose={handleModalClose}
                       title={`Todo list ${selectedDay && formatDate(selectedDay)}`}
                >
                    <InputAdd
                        onAdd={(title) => {
                            if (title && selectedDay) {
                                createTask(title, selectedDay);
                            }
                        }}
                    />
                    <ul className={styles.tasksList}>
                        {selectedDay && tasks && tasks[selectedDay]?.map((task) => (
                            <li className={styles.taskItem} key={task.id}>
                                <InputTask
                                    id={task.id}
                                    day={selectedDay}
                                    title={task.title}
                                    completed={task.completed}
                                    onDone={() => toggleTask(task.id, task.completed, selectedDay)}
                                    onEdited={(newTitle) => updateTask(task.id, newTitle, selectedDay)}
                                    onRemoved={() => removeTask(task.id, selectedDay)}
                                />
                            </li>
                        ))}
                        {selectedDay && tasks[selectedDay]?.length === 0 && (
                            <p style={{textAlign: 'center'}}>There is no task...</p>
                        )}
                    </ul>
                </Modal>
            )}
        </div>
    )
};

export default App;
