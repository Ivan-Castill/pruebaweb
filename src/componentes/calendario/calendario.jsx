import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "./calendario.css"

const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());

    const onChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div style={{ margin: '20px auto', textAlign: 'center', maxWidth: '500px' }}>
        <Calendar onChange={onChange} value={date} />
        </div>
    );
};

export default CalendarComponent;
