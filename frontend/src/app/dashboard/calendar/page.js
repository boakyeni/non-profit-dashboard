'use client'

import CalendarWidget from "../_components/CalendarWidget"
import { useEffect, useState } from "react";
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar'
import { useDispatch, useSelector } from "react-redux";
import { addEvent, getEvents, editEvent, toggleCreateEventModal } from "../../lib/features/events/eventSlice";
import CreateEventModal from "./_components/CreateEventModal";
import EditAppointmentModal from "../profile/components/EditAppointmentModal";
import EditEventModal from "./_components/EditEventModal";



const CalendarPage = () => {


    // Handler for updating events
    const handleEventChange = (updatedEvents) => {
        setEvents(updatedEvents);
    };

    const localizer = momentLocalizer(moment)

    const dispatch = useDispatch()

    // Retrieve initial state from redux
    const { events, loading, error } = useSelector((state) => state.events)

    // Grab state from db, this updates the events variable above
    useEffect(() => {
        dispatch(getEvents())
    }, [dispatch])

    return (
        <div className="flex justify-around">
            <div className="w-full">
                <div className="flex justify-start w-full">
                    <button className="p-2 border border-[#cccccc] hover:bg-[#e6e6e6] rounded-md mx-5 my-3 text-black" onClick={() => dispatch(toggleCreateEventModal())}>Create Event</button>
                </div>
                <CalendarWidget localizer={localizer} events={events} />
            </div>
            <CreateEventModal />
            <EditEventModal />
        </div>
    )
}

export default CalendarPage