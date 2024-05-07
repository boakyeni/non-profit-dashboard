'use client'
import { useSelector, useDispatch } from "react-redux"
import { togglePatientSortModal } from "../../lib/features/contacts/contactSlice"
import { LuX } from "react-icons/lu"
import { toggleCheckbox, applyFilters, removeAllFilters } from "../../lib/features/contacts/contactSlice"

const PatientSortOrFilter = () => {
    const dispatch = useDispatch()
    const { patientSortModalOpen, checkboxes } = useSelector((state) => state.contact)
    const handleCheckboxChange = (checkboxName) => () => {
        dispatch(toggleCheckbox({ checkbox: checkboxName }));
    };
    const handleSortFliter = (e) => {
        e.preventDefault()
        dispatch(applyFilters())
        dispatch(toggleContactSortModal())
    }
    const handleRemoveFilters = (e) => {
        e.preventDefault()
        dispatch(removeAllFilters())
        dispatch(applyFilters())
        dispatch(toggleContactSortModal())
    }
    return (
        <>
            <div className={`${patientSortModalOpen ? 'fixed inset-0 bg-black bg-opacity-50 z-40' : 'hidden'}`}></div>
            <div id="editUserModal" tabIndex="-1" aria-hidden="true" className={`${patientSortModalOpen ? '' : 'hidden'} fixed max-sm:inset-0 z-50 items-center place-items-center justify-center p-4 h-max m-auto`}>
                <div className="relative w-full max-w-2xl  ">
                    {/* // Modal Content */}
                    <form className="relative bg-white rounded-2xl shadow ">
                        {/* //Modal Header */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                {`Sort/Filter`}
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="editUserModal">
                                <LuX className="scale-[1.5] stroke-2" onClick={() => dispatch(togglePatientSortModal())} />
                            </button>
                        </div>
                        {/* // Modal Body */}
                        <div className="p-6 space-y-6 max-h-[calc(100vh-15rem)] overflow-auto">
                            <div className="grid grid-cols-6 gap-6">

                                <div className="col-span-6 sm:col-span-3 flex flex-col ">
                                    <div htmlFor="donor-type" className="block mb-2 text-sm font-medium text-gray-900 ">Select Cause(s)</div>
                                    <select name="cars" id="cars" multiple>
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="opel">Opel</option>
                                        <option value="audi">Audi</option>
                                    </select>

                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Sort by</label>
                                    <select name="cars" id="cars">
                                        <option value="volvo">Amount Raised High to Low</option>
                                        <option value="saab">Amount Raised Low to High</option>
                                        <option value="opel">Name</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                        {/* // Modal Footer */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " onClick={handleSortFliter}>Sort/Filter</button>
                            <button onClick={handleRemoveFilters} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Remove All Filters</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PatientSortOrFilter