'use client'

import CalendarWidget from "../components/CalendarWidget"
import { useState } from "react";
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar'



const CalendarPage = () => {

    const [events, setEvents] = useState([
        // Sample initial events or empty array
        // Make sure each event has a unique 'id' property
        // Sample event data
        {
            start: moment().toDate(),
            end: moment().add(1, 'days').toDate(),
            title: 'Some title',
        },
    ]);

    // Handler for updating events
    const handleEventChange = (updatedEvents) => {
        setEvents(updatedEvents);
    };

    const localizer = momentLocalizer(moment)

    return (
        <div>
            <CalendarWidget localizer={localizer} />
        </div>
    )
}

export default CalendarPage