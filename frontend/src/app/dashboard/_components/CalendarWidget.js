'use client'
import React, { Fragment, useCallback, useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import moment from 'moment-timezone';
// Storybook cannot alias this, so you would use 'react-big-calendar/lib/addons/dragAndDrop'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { setEvents, editEvent, setEndDate, setStartDate, toggleCreateEventModal, toggleEditEventModal, setSelectedEvent, toggleEdit, getEvents, setEndTimeRange, setStartTimeRange } from '../../lib/features/events/eventSlice';
// Storybook cannot alias this, so you would use 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import { useDispatch, useSelector } from 'react-redux';



const DragAndDropCalendar = withDragAndDrop(Calendar)

const events = [
    {
        id: 0,
        title: 'All Day Event very long title',
        allDay: true,
        start: new Date(2024, 0, 23),
        end: new Date(2024, 0, 24),
    },]



const formatName = (name, count) => `${name} ID ${count}`

export default function CalendarWidget({ localizer }) {
    const { events, calendar, currentCalendarId } = useSelector((state) => state.events)
    const isValidDate = date => !isNaN(Date.parse(date));
    const adjEvents = useMemo(() => events
        .filter((it) => it.calendar?.id === Number(currentCalendarId)) // change to calendar.id
        .map((it) => ({
            ...it,
            start: isValidDate(it.start) ? new Date(it.start) : null,
            end: isValidDate(it.end) ? new Date(it.end) : null,
            isDraggable: true,
        })), [events, calendar, currentCalendarId])
    const [date, setDate] = useState(new Date());
    const [view, setView] = useState('month');
    const [draggedEvent, setDraggedEvent] = useState()
    const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true)
    const [counters, setCounters] = useState({ item1: 0, item2: 0 })

    const dispatch = useDispatch()
    const { selectedDates, selectedEvent, startTimeRange, endTimeRange } = useSelector((state) => state.events)

    const eventPropGetter = useCallback(
        (event) => ({
            ...(event.isDraggable
                ? { className: 'isDraggable' }
                : { className: 'nonDraggable' }),
        }),
        []
    )

    /* This grabs the date that the user dragged on the Calendar,
        Only one event can be created or edited at a time, so whenever we are
        setting the properties of an event it is like setting the properties of the selected event or new event.
        Sometimes that is not clear in the code and I hope this comment clears that up, that the selected event is usually implied by the users most recent action
          */
    const newEvent = useCallback(
        ({ start, end }) => {
            /* Syncs date data with modal and brings up modal */
            dispatch(setStartDate(start.toISOString()));
            dispatch(setEndDate(end.toISOString()));
            dispatch(toggleCreateEventModal());

        },
        [dispatch, selectedDates]
    )

    const resizeEvent = useCallback(
        ({ event, start, end }) => {
            const updatedEvent = {
                ...event,
                start: start.toISOString(),
                end: end.toISOString(),
                cancel_start: event.start.toISOString(),
                cancel_end: event.end.toISOString(),
            };

            // add if statement to check for changes to avoid spam
            // Dispatch the action to edit (resize) the event
            dispatch(editEvent(updatedEvent))

            // Removes glitch from lag to get data from server
            const newEvents = events.map(
                e => {
                    // Check if this event matches the updatedEvent criteria
                    const uStartDate = new Date(updatedEvent.cancel_start);
                    const eventStartDate = new Date(e.start);
                    const uEndDate = new Date(updatedEvent.cancel_end);
                    const eventEndDate = new Date(e.end);
                    if (e.event === updatedEvent.event && eventStartDate.getTime() === uStartDate.getTime() && eventEndDate.getTime() == uEndDate.getTime()) {
                        // If it matches, return the updated event instead
                        return updatedEvent;
                    }
                    // Otherwise, return the event unchanged
                    return e;
                })
            dispatch(setEvents(newEvents))

        },
        [dispatch, events]
    )

    const moveEvent = useCallback(
        ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
            const updatedEvent = {
                ...event,
                start: start.toISOString(),
                end: end.toISOString(),
                allDay: event.allDay || droppedOnAllDaySlot,
                cancel_start: event.start.toISOString(),
                cancel_end: event.end.toISOString(),
            };

            // add if statement to check for changes to avoid spam
            // Dispatch the action to edit the event
            dispatch(editEvent(updatedEvent))
            const newEvents = events.map(
                e => {
                    // Check if this event matches the updatedEvent criteria
                    const uStartDate = new Date(updatedEvent.cancel_start);
                    const eventStartDate = new Date(e.start);
                    const uEndDate = new Date(updatedEvent.cancel_end);
                    const eventEndDate = new Date(e.end);
                    if (e.event === updatedEvent.event && eventStartDate.getTime() === uStartDate.getTime() && eventEndDate.getTime() == uEndDate.getTime()) {
                        // If it matches, return the updated event instead
                        return updatedEvent;
                    }
                    // Otherwise, return the event unchanged
                    return e;
                })
            dispatch(setEvents(newEvents))


        },
        [dispatch, events]
    );

    /* We explicity set the selected event here so that it can be used when viewing or editing the event*/
    const handleEventClick = useCallback(

        (event) => {
            const eventToBeEdited = {
                ...event,
                start: event.start.toISOString(),
                end: event.end.toISOString()
            }
            dispatch(setSelectedEvent(eventToBeEdited));
            dispatch(toggleEditEventModal())
        },
        [dispatch]
    );

    const onDropFromOutside = useCallback(
        ({ start, end, allDay: isAllDay }) => {
            if (draggedEvent === 'undroppable') {
                setDraggedEvent(null)
                return
            }

            const { name } = draggedEvent
            const event = {
                title: formatName(name, counters[name]),
                start,
                end,
                isAllDay,
            }
            setDraggedEvent(null)
            setCounters((prev) => {
                const { [name]: count } = prev
                return {
                    ...prev,
                    [name]: count + 1,
                }
            })
            newEvent(event)
        },
        [draggedEvent, counters, setDraggedEvent, setCounters, newEvent]
    )

    const handleDragStart = useCallback((event) => setDraggedEvent(event), [])

    const dragFromOutsideItem = useCallback(() => draggedEvent, [draggedEvent])

    const customOnDragOver = useCallback(
        (dragEvent) => {
            // check for undroppable is specific to this example
            // and not part of API. This just demonstrates that
            // onDragOver can optionally be passed to conditionally
            // allow draggable items to be dropped on cal, based on
            // whether event.preventDefault is called
            if (draggedEvent !== 'undroppable') {
                console.log('preventDefault')
                dragEvent.preventDefault()
            }
        },
        [draggedEvent]
    )

    const handleDisplayDragItemInCell = useCallback(
        () => setDisplayDragItemInCell((prev) => !prev),
        []
    )

    const defaultDate = useMemo(() => new Date(), [])

    const getDateRange = (date, view) => {
        let start, end;

        switch (view) {
            case 'month':
                start = moment(date).startOf('month').startOf('week').toDate();
                end = moment(date).endOf('month').endOf('week').toDate();
                break;
            case 'week':
                start = moment(date).startOf('week').toDate();
                end = moment(date).endOf('week').toDate();
                break;
            case 'day':
                start = moment(date).startOf('day').toDate();
                end = moment(date).endOf('day').toDate();
                break;
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

    const handleViewChange = (newView) => {
        setView(newView);
    };

    useEffect(() => {
        const { start, end } = getDateRange(date, view);
        dispatch(setStartTimeRange(start.toISOString()))
        dispatch(setEndTimeRange(end.toISOString()))
        const timeRange = {
            'start': start.toISOString(),
            'end': end.toISOString()
        }

        dispatch(getEvents(timeRange))
        // Fetch events based on this range
    }, [date, view]);


    return (
        <Fragment>
            <div className="h-screen">
                <DragAndDropCalendar
                    defaultDate={defaultDate}
                    defaultView={Views.MONTH}
                    dragFromOutsideItem={
                        displayDragItemInCell ? dragFromOutsideItem : null
                    }
                    draggableAccessor="isDraggable"
                    eventPropGetter={eventPropGetter}
                    events={adjEvents}
                    localizer={localizer}
                    onDropFromOutside={onDropFromOutside}
                    onDragOver={customOnDragOver}
                    onEventDrop={moveEvent}
                    onEventResize={resizeEvent}
                    onSelectSlot={newEvent}
                    onSelectEvent={handleEventClick}
                    onNavigate={handleNavigate}
                    onView={handleViewChange}
                    view={view}
                    date={date}
                    resizable
                    selectable
                />
            </div>
        </Fragment>
    )
}
CalendarWidget.propTypes = {
    localizer: PropTypes.instanceOf(DateLocalizer),
}