import React from 'react';
import styles from './styles.module.scss';

interface CalendarProps {
    month: number;
    year: number;
    onClick: (day: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({ month, year, onClick }) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const daysArray = Array.from(Array(daysInMonth), (_, index) => index + 1);

    return (
        <section className={styles.calendar}>
            <h2 className={styles.calendarHeader}>{`${month}/${year}`}</h2>
            <ul className={styles.calendarDays}>
                {daysArray.map((day) => (
                    <li key={day} className={styles.dayItem} onClick={() => onClick(day)}>{day}</li>
                ))}
            </ul>
        </section>
    );
};

export default Calendar;