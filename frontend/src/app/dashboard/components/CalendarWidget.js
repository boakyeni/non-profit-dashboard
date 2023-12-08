import React, { Fragment, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'

// Storybook cannot alias this, so you would use 'react-big-calendar/lib/addons/dragAndDrop'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
// Storybook cannot alias this, so you would use 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'


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

export default function CalendarWidget({ localizer }) {
    const [myEvents, setMyEvents] = useState(adjEvents)
    const [draggedEvent, setDraggedEvent] = useState()
    const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true)
    const [counters, setCounters] = useState({ item1: 0, item2: 0 })

    const eventPropGetter = useCallback(
        (event) => ({
            ...(event.isDraggable
                ? { className: 'isDraggable' }
                : { className: 'nonDraggable' }),
        }),
        []
    )
    //,
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

    const moveEvent = useCallback(
        ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
            const { allDay } = event
            if (!allDay && droppedOnAllDaySlot) {
                event.allDay = true
            }

            setMyEvents((prev) => {
                const existing = prev.find((ev) => ev.id === event.id) ?? {}
                const filtered = prev.filter((ev) => ev.id !== event.id)
                return [...filtered, { ...existing, start, end, allDay }]
            })
        },
        [setMyEvents]
    )

    const newEvent = useCallback(
        (event) => {
            setMyEvents((prev) => {
                const idList = prev.map((item) => item.id)
                const newId = Math.max(...idList) + 1
                return [...prev, { ...event, id: newId }]
            })
        },
        [setMyEvents]
    )

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

    const resizeEvent = useCallback(
        ({ event, start, end }) => {
            setMyEvents((prev) => {
                const existing = prev.find((ev) => ev.id === event.id) ?? {}
                const filtered = prev.filter((ev) => ev.id !== event.id)
                return [...filtered, { ...existing, start, end }]
            })
        },
        [setMyEvents]
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