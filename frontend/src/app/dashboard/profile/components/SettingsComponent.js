'use client'
import { useDispatch, useSelector } from "react-redux"
import { toggleProfileEdit } from "../../../lib/features/profile/profileSlice"
import { useState, useEffect } from "react"
import { set_password } from "../../../lib/features/auth/authSlice"
import { toast } from "react-toastify"
import { reset } from "../../../lib/features/auth/authSlice"
const SettingsComponent = () => {

    const dispatch = useDispatch()
    const { editProfileFormEditable } = useSelector((state) => state.profile)

    const [current_password, setCurrentPassword] = useState('')
    const [new_password, setNewPassword] = useState('')
    const [re_new_password, setReNewPassword] = useState('')

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)

        }
        if (isSuccess) {
            toast.success("Password Changed")
            setCurrentPassword('')
            setNewPassword('')
            setReNewPassword('')
        }
        dispatch(reset())

    }, [isError, isSuccess, message, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (new_password != re_new_password) {
            toast.error("Passwords do not match")
            return
        }

        const data = {
            current_password,
            new_password,
            re_new_password,
        }
        dispatch(set_password(data))
    }


    return (
        <>
            <div id="createEventModal" tabIndex="-1" aria-hidden="true" className={` p-4 h-max lg:m-auto max-lg:w-full`}>
                <div className="relative w-full lg:w-[70vw] ">
                    {/* // Modal Content */}
                    <div className="relative bg-white rounded-2xl shadow ">
                        {/* //Modal Header */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Settings
                            </h3>

                        </div>
                        {/* // Modal Body */}
                        <div className="p-6  max-h-[calc(100vh-20rem)] overflow-x-auto ">
                            <div className="flex flex-col md:flex-row space-x-6">
                                <div className=" md:w-1/2 2xl:w-3/4 space-y-6">
                                    <h2 className="text-lg">Change Password</h2>
                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="current_password" className="block mb-2 text-sm font-medium text-gray-900 ">Current Password</label>
                                        <input type="password" value={current_password} name="current_password" id="current_password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " onChange={(e) => setCurrentPassword(e.target.value)} placeholder="⏺⏺⏺⏺⏺⏺⏺⏺" required="" />
                                    </div>

                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="new_password" className="block mb-2 text-sm font-medium text-gray-900 ">New Password</label>
                                        <input type="password" name="new_password" id="new_password" value={new_password} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setNewPassword(e.target.value)} placeholder="⏺⏺⏺⏺⏺⏺⏺⏺" required="" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="re_new_password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
                                        <input type="password" name="re_new_password" id="re_new_password" value={re_new_password} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setReNewPassword(e.target.value)} placeholder="⏺⏺⏺⏺⏺⏺⏺⏺" required="" />
                                    </div>




                                </div>
                                {/* <div className="md:w-1/2 2xl:w-1/4">
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Add guests</label>
                                    <input type="text" name="first-name" id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Add Email" required="" />

                                </div> */}
                            </div>
                        </div>
                        {/* // Modal Footer */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">

                            <button onClick={handleSubmit} type="submit" className="text-white bg-green-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SettingsComponent