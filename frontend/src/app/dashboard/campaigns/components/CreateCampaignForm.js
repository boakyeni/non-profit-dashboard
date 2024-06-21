'use client'
import ContactModal from "../../_components/ContactModal"
import SortOrFilterModal from "../../_components/SortOrFilterModal"
import SubscriberTable from "../../_components/SubscriberTable"
import DateComponent from "../../_components/DateComponent"
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createCampaign } from "../../../lib/features/campaigns/campaignSlice"
import moment from 'moment-timezone';
import CurrencyInput from 'react-currency-input-field';

const CreateCampaignForm = () => {
    const [localStartDate, setLocalStartDate] = useState(new Date())
    const [localEndDate, setLocalEndDate] = useState(new Date())
    const [localName, setLocalName] = useState('')
    const [localGoal, setLocalGoal] = useState('')
    const [localDescription, setLocalDescription] = useState('')
    const [photo, setPhoto] = useState(null)

    const dispatch = useDispatch()

    const { selectedContacts } = useSelector((state) => state.contact)

    const handleStartDateChange = (date) => {
        const local_time = moment(date).format('YYYY-MM-DDTHH:mm:ssZ')
        setLocalStartDate(local_time)
        console.log(local_time)
    }
    const handleEndDateChange = () => {

    }
    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPhoto(event.target.files[0]);
            // Optionally, create a URL for preview
            // const filePreview = URL.createObjectURL(event.target.files[0]);
            // setProfilePhotoPreview(filePreview);
        } else {
            setPhoto(null);
            // setProfilePhotoPreview(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', localName)
        formData.append('description', localDescription)
        formData.append('start_date', localStartDate)
        formData.append('goal', localGoal)
        // Don't add photo if it is null, that will throw error on backend
        if (photo) {
            formData.append('photo', photo)
        }

        selectedContacts.forEach(id => formData.append('subscribers', id));
        formData.append('is_active', true)
        console.log(localGoal)

        dispatch(createCampaign(formData))


    }

    return (
        <>
            <div id="createEventModal" tabIndex="-1" aria-hidden="true" className={` p-4 h-max lg:m-auto max-lg:w-full`}>
                {/* Currently contact will not be selected after creation, maybe add a toast to alert user*/}
                <ContactModal />
                <SortOrFilterModal />
                <div className="relative w-full lg:w-[70vw] ">

                    {/* // Modal Content */}
                    <div className="relative bg-white rounded-2xl shadow ">
                        {/* //Modal Header */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Create Campaign
                            </h3>

                        </div>

                        {/* // Modal Body */}
                        <div className="p-6  max-h-[calc(100vh-20rem)] overflow-x-auto ">
                            <div className="flex flex-col md:flex-row space-x-6">
                                <div className=" md:w-1/2 2xl:w-3/4 space-y-6">
                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                                        <input type="text" value={localName} name="title" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Bonnie" required="" onChange={(e) => setLocalName(e.target.value)} />
                                    </div>
                                    <div className="flex flex-row w-full space-x-3">
                                        <div className="max-sm:w-1/2">
                                            <label htmlFor="select-date" className="block mb-2 text-sm font-medium text-gray-900 ">Select Start</label>
                                            <DateComponent selected={localStartDate} setDate={handleStartDateChange} />
                                        </div>
                                        {/* <div className="max-sm:w-1/2">
                                            <label htmlFor="select-date" className="block mb-2 text-sm font-medium text-gray-900 ">Select End</label>
                                            <DateComponent selected={localEndDate} setDate={handleEndDateChange} />
                                        </div> */}
                                    </div>


                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                                        <textarea name="description" id="description" value={localDescription} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Write a description here" onChange={(e) => setLocalDescription(e.target.value)} required="" />
                                    </div>
                                    <div className="max-w-lg">
                                        <label className="block text-sm font-medium text-gray-900" htmlFor="user_avatar">Upload Image</label>
                                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2.5" accept="image/png, image/jpeg" aria-describedby="user_avatar_help" id="user_avatar" type="file" onChange={handleFileChange} />
                                        <div className="mt-1 text-sm text-gray-500 " id="user_avatar_help">Please limit file size to 10MB</div>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="currency" className="block mb-2 text-sm font-medium text-gray-900 ">Currency</label>
                                        <select name="currency" id="currency" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Development" required="">
                                            <option value="cedi">₵ GHC</option>
                                            <option value="dollar">$ USD</option>
                                            <option value="euro">€ EUR</option>
                                        </select>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="goal" className="block mb-2 text-sm font-medium text-gray-900 ">Goal</label>
                                        <CurrencyInput value={localGoal} decimalsLimit={2} name="goal" id="goal" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="10,000" required="" onValueChange={(value, name, values) => setLocalGoal(value)} />

                                    </div>

                                    <div className="col-span-6 sm:col-span-3">

                                    </div>

                                    <div className="col-span-6 sm:col-span-3">

                                    </div>
                                </div>
                                <div className="md:w-1/2 2xl:w-1/4">
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 border-b border-gray-300 pb-2">Add Subscribers</label>
                                    <p className="text-sm -mb-4 text-red-500">Please, if contact created on this page, remember to select</p>
                                    <SubscriberTable itemsPerPage={5} />

                                </div>
                            </div>
                        </div>
                        {/* // Modal Footer */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
                            <button type="submit" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Add New Campaign</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default CreateCampaignForm