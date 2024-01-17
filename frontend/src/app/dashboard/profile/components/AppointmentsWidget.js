import { Calendar } from 'react-big-calendar'
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { toggleAppointmentModal } from '../../../lib/features/events/eventSlice';

const AppointmentsWidget = ({ localizer }) => {

    const dispatch = useDispatch()

    const myEvents = [
        {
            title: 'Big Meeting',
            start: new Date(2024, 0, 24, 10, 0), // Note: Months are 0-based in JavaScript Dates
            end: new Date(2024, 0, 24, 10, 30),
        },

        // ... more events
    ];

    const defaultDate = new Date()

    const handleEventSelect = (event) => {
        dispatch(toggleAppointmentModal())
    }





    return (
        <div>
            <Calendar
                localizer={localizer}
                events={myEvents}
                startAccessor="start"
                endAccessor="end"
                defaultView={'agenda'}
                views={['agenda']}
                style={{ height: 500, }}
                onSelectEvent={handleEventSelect}
                defaultDate={defaultDate}
            />
        </div>
    )
}

export default AppointmentsWidget