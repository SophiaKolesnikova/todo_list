import React from "react";
import { Box } from "@mui/material";
import InputAdd from "../InputAdd";
import InputTask from "../InputTask";
import styles from './index.module.scss';


const App: React.FC = () => {

    return (
        <Box className={styles.box}>
            <h1 className={styles.boxTitle}>To Do App</h1>
            <InputAdd/>
            <InputTask/>
        </Box>
    )
}

export default App
