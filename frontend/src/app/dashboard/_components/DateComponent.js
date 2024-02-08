'use client'
import { useState } from "react"
import { LuCalendar } from "react-icons/lu"
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";


// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DateComponent = ({ selected, setDate, read }) => {

    const dispatch = useDispatch()
    const selectedDate = new Date(selected)
    return (
        <DatePicker selected={selectedDate}
            onChange={setDate}
            showTimeSelect
            dateFormat="d MMMM yyyy h:mm aa"
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
            readOnly={read || false} />
    );
};

export default DateComponent