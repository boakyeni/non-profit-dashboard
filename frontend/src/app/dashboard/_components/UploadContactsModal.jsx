'use client'
import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LuX } from "react-icons/lu"
import { toggleUploadContactModal, fetchContacts } from "../../lib/features/contacts/contactSlice"


const UploadContactsModal = () => {
    const dispatch = useDispatch()
    const { uploadContactOpen } = useSelector((state) => state.contact)
    const fileInputRef = useRef(null);
    const [fileUploaded, setFileUploaded] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        const files = fileInputRef.current?.files || [];
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
        try {
            const response = await apiClient.post('http://localhost:8000/your-api-endpoint2/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFileUploaded(true); // Update state to indicate file has been sent
            dispatch(fetchContacts())
        } catch (error) {
            setFileUploaded(false); // Ensure is false on error
        }

        dispatch(toggleUploadContactModal())

    }

    return (
        <>
            <div className={`${uploadContactOpen ? 'fixed inset-0 bg-black bg-opacity-50 z-40' : 'hidden'}`} onClick={() => dispatch(toggleUploadContactModal())}></div>
            <div id="editUserModal" tabIndex="-1" aria-hidden="true" className={`${uploadContactOpen ? '' : 'hidden'} fixed max-sm:inset-0 z-50 items-center place-items-center justify-center p-4 h-max m-auto`}>
                <div className="relative w-full max-w-2xl  ">
                    {/* // Modal Content */}
                    <form className="relative bg-white rounded-2xl shadow ">
                        {/* //Modal Header */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Upload Contacts from .csv file
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="editUserModal">
                                <LuX className="scale-[1.5] stroke-2" onClick={() => dispatch(toggleUploadContactModal())} />
                            </button>
                        </div>
                        {/* // Modal Body */}
                        <div className="p-6 space-y-6 max-h-[calc(100vh-15rem)] overflow-auto">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="dislaimer" className="block mb-2 text-sm font-medium text-red-900 ">Disclaimer</label>
                                    <p>For proper upload and to prevent corruption of data, please only upload .csv files and ensure column labels are as follows: </p>
                                    <div className="flex flex-row max-sm:flex-wrap space-x-1 font-bold">
                                        <p>name</p><span>|</span><p>given_names</p><span>|</span><p>last_names</p><span>|</span><p>phone_number</p><span>|</span><p>email</p><span>|</span><p>organisation</p>
                                    </div>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="upload-contacts" className="block mb-2 text-sm font-medium text-gray-900 ">Upload Document</label>
                                    <input ref={fileInputRef} type="file" accept=".csv" name="upload-contacts" id="upload-contacts" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " />
                                </div>
                                <div className="col-span-6 sm:col-span-3">

                                </div>
                            </div>
                        </div>
                        {/* // Modal Footer */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Save all</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default UploadContactsModal