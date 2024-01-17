import React, { Fragment, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'

// Storybook cannot alias this, so you would use 'react-big-calendar/lib/addons/dragAndDrop'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { editEvent, setEndDate, setStartDate, toggleCreateEventModal, toggleEditEventModal, setSelectedEvent, toggleEdit } from '../../lib/features/events/eventSlice';
// Storybook cannot alias this, so you would use 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import { useDispatch, useSelector } from 'react-redux';



const DragAndDropCalendar = withDragAndDrop(Calendar)

const events = [
    {
        id: 0,
        title: 'All Day Event very long title',
        allDay: true,
        start: new Date(2023, 11, 7),
        end: new Date(2023, 11, 8),
    },]

const adjEvents = events.map((it, ind) => ({
    ...it,
    isDraggable: ind % 2 === 0,
}))

const formatName = (name, count) => `${name} ID ${count}`

export default function CalendarWidget({ localizer, events }) {
    const [myEvents, setMyEvents] = useState(adjEvents)
    const [draggedEvent, setDraggedEvent] = useState()
    const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true)
    const [counters, setCounters] = useState({ item1: 0, item2: 0 })

    const dispatch = useDispatch()
    const { selectedDates } = useSelector((state) => state.events)

    const eventPropGetter = useCallback(
        (event) => ({
            ...(event.isDraggable
                ? { className: 'isDraggable' }
                : { className: 'nonDraggable' }),
        }),
        []
    )
    //,


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
                start,
                end
            };

            // Dispatch the action to edit (resize) the event
            dispatch(editEvent(updatedEvent));
        },
        [dispatch]
    )

    const moveEvent = useCallback(
        ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {

            const updatedEvent = {
                ...event,
                start,
                end,
                allDay: event.allDay || droppedOnAllDaySlot,
            };

            // Dispatch the action to edit the event
            dispatch(editEvent(updatedEvent));
        },
        [dispatch]
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



    const defaultDate = useMemo(() => new Date(2023, 11, 7), [])

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
                    events={myEvents}
                    localizer={localizer}
                    onDropFromOutside={onDropFromOutside}
                    onDragOver={customOnDragOver}
                    onEventDrop={moveEvent}
                    onEventResize={resizeEvent}
                    onSelectSlot={newEvent}
                    onSelectEvent={handleEventClick}
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