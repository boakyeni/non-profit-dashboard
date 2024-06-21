'use client'
import { Calendar } from 'react-big-calendar'
import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEditEventModal, setSelectedEvent, getEvents, setStartTimeRange, setEndTimeRange } from '../../../lib/features/events/eventSlice';
import moment from 'moment-timezone';

const AppointmentsWidget = ({ localizer }) => {
    const { events, startTimeRange, endTimeRange } = useSelector((state) => state.events)
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch()


    const defaultDate = new Date()

    const handleEventSelect = useCallback((event) => {

        const eventToBeEdited = {
            ...event,
            start: event.start,
            end: event.end
        }

        dispatch(setSelectedEvent(eventToBeEdited))
        dispatch(toggleEditEventModal())
    }, [dispatch])

    const getDateRange = (date, view) => {
        let start, end;

        switch (view) {
            case 'agenda':
                // For 'agenda', you might define a fixed range, like the next 7 days
                start = moment(date).startOf('day').toDate();
                end = moment(date).startOf('day').add(31, 'days').toDate();
                break;
            // Add more cases for other views if needed
            default:
                start = moment(date).toDate();
                end = moment(date).toDate();
        }

        return { start, end };
    };

    const handleNavigate = (newDate) => {
        setDate(newDate);
    };

    useEffect(() => {
        const { start, end } = getDateRange(date, 'agenda');
        dispatch(setStartTimeRange(start.toISOString()))
        dispatch(setEndTimeRange(end.toISOString()))
        const timeRange = {
            'start': start.toISOString(),
            'end': end.toISOString()
        }

        dispatch(getEvents(timeRange))
        // Fetch events based on this range
    }, [date]);





    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                defaultView={'agenda'}
                views={['agenda']}
                style={{ height: 500, maxHeight: '70vh' }}
                onSelectEvent={handleEventSelect}
                defaultDate={defaultDate}
                onNavigate={handleNavigate}
                date={date}
            />
        </div>
    )
}

export default AppointmentsWidget