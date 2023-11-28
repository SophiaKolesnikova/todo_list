import React from 'react';
import { Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import styles from './index.module.scss';

const InputAdd: React.FC = () => {
    return (
        <div className={styles.div}>
            <TextField className={styles.divInput}/>
            <Button
                className={styles.divButton}
                variant="outlined"
                startIcon={<AddIcon/>}
            >Add</Button>
        </div>
    );
};

export default InputAdd;