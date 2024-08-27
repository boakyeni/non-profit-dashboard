"use client";
import { useDispatch, useSelector } from "react-redux";
import { LuX } from "react-icons/lu";
import {
  toggleCreateEventModal,
  setEndDate,
  setStartDate,
  addEvent,
  getEvents,
} from "../../../lib/features/events/eventSlice";
import DateComponent from "../../_components/DateComponent";
import { useState, useEffect } from "react";
import moment from "moment-timezone";

const CreateEventModal = () => {
  const dispatch = useDispatch();
  const { createEventModalOpen, selectedEvent, startTimeRange, endTimeRange } =
    useSelector((state) => state.events);
  const { timezone } = useSelector((state) => state.profile);
  const [localTitle, setLocalTitle] = useState("");
  const [localStartDate, setLocalStartDate] = useState(
    selectedEvent?.start || ""
  );
  const [localEndDate, setLocalEndDate] = useState(selectedEvent?.end || "");
  const [localDescription, setLocalDescription] = useState("");
  const [localFrequency, setLocalFrequency] = useState("");

  useEffect(() => {
    setLocalTitle("");
    setLocalStartDate(selectedEvent?.start || "");
    setLocalEndDate(selectedEvent?.end || "");
    setLocalDescription("");
    setLocalFrequency("");
  }, [selectedEvent]);

  const handleTitleChange = (e) => {
    setLocalTitle(e.target.value);
  };

  const handleStartDateChange = (date) => {
    if (!date || !timezone) {
      console.error("Invalid date or timezone", { date, timezone });
      return;
    }
    const local_time = moment(date).tz(timezone).format("YYYY-MM-DDTHH:mm:ssZ");
    setLocalStartDate(local_time);
  };

  const handleEndDateChange = (date) => {
    if (!date || !timezone) {
      console.error("Invalid date or timezone", { date, timezone });
      return;
    }
    const local_time = moment(date).tz(timezone).format("YYYY-MM-DDTHH:mm:ssZ");
    setLocalEndDate(local_time);
  };

  const handleDescriptionChange = (e) => {
    setLocalDescription(e.target.value);
  };

  const handleFrequencyChange = async (e) => {
    setLocalFrequency(e.target.value);
  };

  const handleAddNewEvent = () => {
    const newEvent = {
      ...selectedEvent,
      cal_id: localStorage.getItem("current_calendar"),
      title: localTitle,
      start: localStartDate,
      end: localEndDate,
      description: localDescription,
      rule: localFrequency,
    };
    dispatch(addEvent(newEvent)).then(() => {
      dispatch(toggleCreateEventModal());
      dispatch(getEvents({ start: startTimeRange, end: endTimeRange }));
    });
  };

  return (
    <>
      <div
        className={`${
          createEventModalOpen
            ? "fixed inset-0 bg-black bg-opacity-50 z-40"
            : "hidden"
        }`}
        onClick={() => dispatch(toggleCreateEventModal())}
      ></div>
      <div
        id="createEventModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          createEventModalOpen ? "" : "hidden"
        } fixed max-sm:inset-0 z-50 items-center place-items-center justify-center p-4 h-max m-auto max-lg:w-full`}
      >
        <div className="relative w-full lg:w-[70vw] ">
          <div className="relative bg-white rounded-2xl shadow ">
            <div className="flex items-start justify-between p-4 border-b rounded-t ">
              <h3 className="text-xl font-semibold text-gray-900 ">
                Create Event or Appointment
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                data-modal-hide="editUserModal"
              >
                <LuX
                  className="scale-[1.5] stroke-2"
                  onClick={() => dispatch(toggleCreateEventModal())}
                />
              </button>
            </div>
            <div className="p-6 max-h-[calc(100vh-20rem)] overflow-x-auto">
              <div className="flex flex-col lg:flex-row space-x-6">
                <div className="lg:w-1/2 2xl:w-3/4 space-y-6">
                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      value={localTitle}
                      name="title"
                      id="title"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                      placeholder="Bonnie"
                      required=""
                      onChange={handleTitleChange}
                    />
                  </div>
                  <div className="flex flex-row w-full space-x-3">
                    <div className="max-sm:w-1/2">
                      <label
                        htmlFor="select-date"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Select Start
                      </label>
                      <DateComponent
                        selected={localStartDate}
                        setDate={handleStartDateChange}
                      />
                    </div>
                    <div className="max-sm:w-1/2">
                      <label
                        htmlFor="select-date"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Select End
                      </label>
                      <DateComponent
                        selected={localEndDate}
                        setDate={handleEndDateChange}
                      />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="countries"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Select a Frequency
                    </label>
                    <select
                      id="countries"
                      value={localFrequency}
                      onChange={handleFrequencyChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    >
                      <option value="">One Time Event</option>
                      <option value="YEARLY">Yearly</option>
                      <option value="MONTHLY">Monthly</option>
                      <option value="WEEKLY">Weekly</option>
                      <option value="DAILY">Daily</option>
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      value={localDescription}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                      placeholder="Write a description here"
                      required=""
                      onChange={handleDescriptionChange}
                    />
                  </div>
                  <div className="max-w-lg">
                    <label
                      className="block text-sm font-medium text-gray-900"
                      htmlFor="user_avatar"
                    >
                      Upload file
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2.5"
                      aria-describedby="user_avatar_help"
                      id="user_avatar"
                      type="file"
                      multiple={true}
                    />
                    <div
                      className="mt-1 text-sm text-gray-500 "
                      id="user_avatar_help"
                    >
                      Please limit file size to 10MB
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                onClick={handleAddNewEvent}
              >
                Add New Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateEventModal;
