import React, { useEffect, useRef, useState } from 'react';
import { IconButton, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import styles from './index.module.scss';

interface InputTaskProps {
    id: string,
    title: string,
    onDone: (id: string) => void,
    onEdited: (id: string, title: string) => void,
    onRemoved: (id: string) => void,
}

const InputTask: React.FC<InputTaskProps> = ({id, title, onDone, onEdited, onRemoved}) => {

    const [checked, setChecked] = useState(false);
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(title);
    const editInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (edit) {
            editInputRef?.current?.focus();
        }
    }, [edit]);

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
        if (e.target.checked) {
            setTimeout(() =>{
                onDone(id);
            }, 500);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onEdited(id, value);
            setEdit(false);
        }
    };

    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input
                    className={styles.inputTaskCheckbox}
                    type='checkbox'
                    disabled={edit}
                    checked={checked}
                    onChange={handleCheckbox}
                />
                {edit ? (
                    <TextField
                        inputRef={editInputRef}
                        className={styles.inputTaskInput}
                        variant="filled"
                        size="small"
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
            {edit ? (
                <IconButton
                    aria-label="Save"
                    color="primary"
                    className={styles.inputTaskSave}
                    onClick={() => {
                        onEdited(id, value);
                        setEdit(false);
                    }}
                >
                    <CheckIcon/>
                </IconButton>
            ) : (
                <IconButton
                    aria-label="edit"
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
                aria-label="delete"
                color="primary"
                className={styles.inputTaskRemove}
                onClick={() => {
                    onRemoved(id);
                }}
            >
                <DeleteIcon/>
            </IconButton>
        </div>
    );
};

export default InputTask;