'use client'

import CalendarWidget from "../_components/CalendarWidget"
import { useEffect, useState, useRef } from "react";
import moment from 'moment-timezone';
import { momentLocalizer } from 'react-big-calendar'
import { useDispatch, useSelector } from "react-redux";
import { getEvents, setCalendar, getCalendars, toggleCreateEventModal, toggleCreateCalendarModal, setEndDate, setStartDate, toggleCalendarAction, setCurrentCalendarId, toggleInviteModal } from "../../lib/features/events/eventSlice";
import CreateEventModal from "./_components/CreateEventModal";
import EditAppointmentModal from "../profile/components/EditAppointmentModal";
import EditEventModal from "./_components/EditEventModal";
import CreateCalendarModal from "./_components/CreateCalendarModal";
import InviteCollaboratorsModal from "./_components/InviteCollaboratorsModal";


const CalendarPage = () => {
    const { timezone } = useSelector((state) => state.profile)
    moment.tz.setDefault(timezone)

    const localizer = momentLocalizer(moment)

    const dispatch = useDispatch()

    // Retrieve initial state from redux
    const { calendar, calendars, currentCalendarId, calendarActionOpen, loading, error } = useSelector((state) => state.events)

    // Grab state from db, this updates the events variable above
    useEffect(() => {
        // dispatch(getEvents())
        dispatch(getCalendars())

        if (typeof window !== 'undefined') {

            const calendar_id = localStorage.getItem('current_calendar')
            dispatch(setCurrentCalendarId(calendar_id));
            // Check if `calendars` is truthy and has at least one item before proceeding
        }

    }, [dispatch])

    useEffect(() => {
        if (calendars && calendars.length > 0) {
            const foundCalendar = calendars.find(it => String(it.id) === String(currentCalendarId)) || calendars[0]

            dispatch(setCalendar(foundCalendar))
        }
    }, [currentCalendarId, calendars, dispatch]);

    const handleCreateEventClick = () => {
        dispatch(setStartDate(new Date().toISOString()))
        dispatch(setEndDate(new Date().toISOString()))
        dispatch(toggleCreateEventModal())
    }

    // store calendar selection in local storage
    const handleCalendarSelection = (calendar_id) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('current_calendar', calendar_id)
            dispatch(setCurrentCalendarId(calendar_id))
        }
        dispatch(toggleCalendarAction())
    }

    // tap outisde close dropdown
    const calActionRef = useRef(null)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarActionOpen && calActionRef.current && !calActionRef.current.contains(event.target)) {
                dispatch(toggleCalendarAction());
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dispatch, calendarActionOpen]);

    return (
        <div className="flex justify-around">
            <div className="w-full">
                <div className=" flex justify-between w-full place-items-center sm:px-8">
                    <button className="p-2 border border-[#cccccc] hover:bg-[#e6e6e6] max-sm:rounded-l-none rounded-md my-3 text-black" onClick={handleCreateEventClick}>Create Event</button>
                    <h1 className="font-bold max-sm:text-center sm:pr-16">{calendar ? calendar.name : 'Calendar Loading...'}</h1>
                    <div ref={calActionRef} className="relative flex flex-row place-items-center">
                        <button onClick={() => dispatch(toggleCalendarAction())} title="Click to see other calendars" className="p-2 border border-[#cccccc] hover:bg-[#e6e6e6] rounded-md max-sm:rounded-r-none my-3 text-black">{'Switch Calendar'}</button>
                        {/* Dropdown */}
                        <div id="calendarDropdown" className={`${calendarActionOpen ? '' : 'hidden'} absolute right-0 p-2 top-full z-10 bg-white divide-y divide-gray-100 rounded-lg max-sm:rounded-r-none shadow w-44 text-gray-700 `}>
                            <ul className="py-1 text-sm overflow-y-scroll max-sm:max-h-[30vh] max-h-[50vh]" aria-labelledby="calendarDropdownButton">
                                {calendars.map((cal) => (
                                    <li key={cal.id}>
                                        <button onClick={() => handleCalendarSelection(cal.id)} className="block px-4 py-2 w-full text-left hover:bg-gray-100 rounded-lg  ">{cal?.name}</button>
                                    </li>
                                ))}

                            </ul>
                            <div className="py-1">
                                <button className="text-sm p-2 px-4 rounded-lg hover:bg-gray-100 w-full text-left" onClick={() => dispatch(toggleCreateCalendarModal())}>Create New</button>
                                <button className="text-sm p-2 px-4 rounded-lg hover:bg-gray-100 w-full text-left" onClick={() => dispatch(toggleInviteModal())}>Invite</button>
                            </div>


                        </div>
                    </div>
                </div>
                <CalendarWidget localizer={localizer} />
            </div>
            <CreateEventModal />
            <EditEventModal />
            <CreateCalendarModal />
            <InviteCollaboratorsModal />
        </div>
    )
}

export default CalendarPage