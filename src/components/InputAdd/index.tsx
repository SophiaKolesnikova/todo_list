import React, { useCallback, useState } from 'react';
import { Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import styles from './index.module.scss';

interface InputAddProps{
    onAdd: (title: string) => void,
}

const InputAdd: React.FC<InputAddProps> = ({onAdd}) => {
    const [inputValue, setInputValue] = useState('');
    const addTask = useCallback(() => {
        onAdd(inputValue);
        setInputValue('');
    }, [inputValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
              addTask();
        }
    };



    return (
        <div className={styles.inputAdd}>
            <TextField
                className={styles.inputAddInput}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleOnKeyDown}
                placeholder='Type here...'
            />
            <Button
                className={styles.inputAddButton}
                variant="outlined"
                startIcon={<AddIcon/>}
                onClick={addTask}
            >Add</Button>
        </div>
    );
};

export default InputAdd;