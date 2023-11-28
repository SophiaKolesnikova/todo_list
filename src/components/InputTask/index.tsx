import React from 'react';
import { TextField } from "@mui/material";
import styles from './index.module.scss';

const InputTask: React.FC = () => {
    return (
        <div className={styles.div}>
          <TextField
              className={styles.divInput}
              variant="filled"
              size="small"
          />
        </div>
    );
};

export default InputTask;