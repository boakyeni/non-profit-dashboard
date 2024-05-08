'use client'
import { useSelector, useDispatch } from "react-redux"
import { addCause, toggleCauseModal, togglePatientSortModal, reset } from "../../lib/features/contacts/contactSlice"
import { LuX } from "react-icons/lu"
import { toggleCheckbox, applyFilters, removeAllFilters } from "../../lib/features/contacts/contactSlice"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

const CauseModal = () => {
    const dispatch = useDispatch()
    const { causeModalOpen, checkboxes, cause_success, loading, cause_error } = useSelector((state) => state.contact)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const handleCheckboxChange = (checkboxName) => () => {
        dispatch(toggleCheckbox({ checkbox: checkboxName }));
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title) {
            toast.error('Please give the cause a title')
            return
        }
        if (!description) {
            toast.error('Please give the cause a description')
            return
        }
        const data = {
            title,
            description
        }
        dispatch(addCause(data))
        dispatch(toggleCauseModal())
        setTitle('')
        setDescription('')
    }

    useEffect(() => {
        if (cause_success) {
            toast.success('Cause Successfully Created')
        }
        if (cause_error) {
            toast.error("There was an issue with creating a cause with that name")
        }
        dispatch(reset())

    }, [cause_error, cause_success, dispatch])

    return (
        <>
            <div className={`${causeModalOpen ? 'fixed inset-0 bg-black bg-opacity-50 z-40' : 'hidden'}`}></div>
            <div id="editUserModal" tabIndex="-1" aria-hidden="true" className={`${causeModalOpen ? '' : 'hidden'} fixed max-sm:inset-0 z-50 items-center place-items-center justify-center p-4 h-max m-auto`}>
                <div className="relative w-full max-w-2xl  ">
                    {/* // Modal Content */}
                    <form className="relative bg-white rounded-2xl shadow ">
                        {/* //Modal Header */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                {`Add Cause`}
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="editUserModal">
                                <LuX className="scale-[1.5] stroke-2" onClick={() => dispatch(toggleCauseModal())} />
                            </button>
                        </div>
                        {/* // Modal Body */}
                        <div className="p-6 space-y-6 max-h-[calc(100vh-15rem)] overflow-auto">
                            <div className="grid grid-cols-6 gap-6">

                                <div className="col-span-6 sm:col-span-3 flex flex-col ">
                                    <div htmlFor="donor-type" className="block mb-2 text-sm font-medium text-gray-900 ">Name of Cause</div>
                                    <input type="text" name="title" id="first-name" value={title} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder={'Title'} onChange={(e) => setTitle(e.target.value)} required="" />

                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                                    <textarea name="first-name" id="first-name" value={description} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 resize-none" placeholder={'Description'} onChange={(e) => setDescription(e.target.value)} required=""></textarea>
                                </div>

                            </div>
                        </div>
                        {/* // Modal Footer */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
                            <button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " >Save</button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CauseModal