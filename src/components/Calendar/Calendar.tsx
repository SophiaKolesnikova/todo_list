import React, {useState} from 'react';
import {IconButton} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './styles.module.scss';
import {Tasks} from "../../store/useCalendarStore.ts";

interface CalendarProps {
    onClick: (day: string) => void;
    tasks: Tasks;
}

const Calendar: React.FC<CalendarProps> = ({ onClick, tasks }) => {
    const [date, setDate] = useState(new Date());

    const handlePrevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    };

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const daysArray = Array.from(
        { length: getDaysInMonth(date.getFullYear(), date.getMonth())},
        (_, i) => {
            const day = i + 1;
            const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            return { day, dateString };
        }
    );

    const dayHasTasks = (dateString: string) => {
        return tasks[dateString] && tasks[dateString].length > 0;
    };


    return (
        <section className={styles.calendar}>
            <div className={styles.calendarHeader}>
                <IconButton
                    aria-label="Arrow-back"
                    color="inherit"
                    onClick={handlePrevMonth}
                >
                    <ArrowBackIosIcon/>
                </IconButton>
                <h2 className={styles.calendarTitle}>{date.toLocaleDateString('en-EN', { month: 'long', year: 'numeric' })}</h2>
                <IconButton
                    aria-label="Arrow-next"
                    color="inherit"
                    onClick={handleNextMonth}
                >
                    <ArrowForwardIosIcon/>
                </IconButton>
            </div>
            <ul className={styles.calendarDays}>
                {daysArray.map(({day, dateString})=> (
                    <li key={day} className={`${styles.dayItem} ${dayHasTasks(dateString) ? styles.dayWithTasks : ''}`} onClick={() => onClick(dateString)}>{day}</li>
                ))}
            </ul>
        </section>
    );
};

export default Calendar;