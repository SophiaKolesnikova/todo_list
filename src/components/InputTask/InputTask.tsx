import React, { useEffect, useRef, useState } from 'react';
import { IconButton, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import styles from './styles.module.scss';

interface InputTaskProps {
    id: string,
    title: string,
    completed: boolean,
    day: string | null,
    onDone: (id: string, completed: boolean, day: string) => void,
    onEdited: (id: string, title: string, day: string) => void,
    onRemoved: (id: string, day: string) => void,
}

const InputTask: React.FC<InputTaskProps> = ({id, title, completed, onDone, onEdited, onRemoved, day}) => {

    const [checked, setChecked] = useState(completed);
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(title);
    const editInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (edit) {
            editInputRef?.current?.focus();
        }
    }, [edit]);

    useEffect(() => {
        setChecked(completed)
    }, [completed]);

    const handleCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = e.target.checked;
        setChecked(newChecked);
        if (day !== null) {
                onDone(id, newChecked, day);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && day !== null) {
            onEdited(value, id, day);
            setEdit(false);
        }

    };

    return (
        <section className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input
                    className={styles.inputTaskCheckbox}
                    type='checkbox'
                    disabled={edit}
                    checked={checked}
                    onChange={handleCompleted}
                />
                {edit ? (
                    <TextField
                        inputRef={editInputRef}
                        className={styles.inputTaskInput}
                        variant="filled"
                        size="small"
                        fullWidth={true}
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleOnKeyDown}
                    />
                ) : (
                    <h3
                        className={styles.inputTaskTitle}
                        style={checked ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}
                    >{title}</h3>
                )}
            </label>
            <div className={styles.actions}>
                {edit && value ? (
                    <IconButton
                        aria-label="Save"
                        color="primary"
                        className={styles.inputTaskSave}
                        onClick={() => {
                            if (day !== null) {
                                onEdited(value, id, day);
                                setEdit(false);
                            }
                        }}
                    >
                        <CheckIcon/>
                    </IconButton>
                ) : (
                    <IconButton
                        aria-label="Edit"
                        color="primary"
                        className={styles.inputTaskEdit}
                        onClick={() => {
                            setEdit(true);
                        }}
                    >
                        <EditIcon/>
                    </IconButton>
                )}
                <IconButton
                    aria-label="Delete"
                    color="primary"
                    className={styles.inputTaskRemove}
                    onClick={() => {
                        onRemoved(id, day!);
                    }}
                >
                    <DeleteIcon/>
                </IconButton>
            </div>
        </section>
    );
};

export default InputTask;