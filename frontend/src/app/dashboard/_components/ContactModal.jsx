'use client'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LuX } from "react-icons/lu"
import { toggleEditUser, addContact, editContact, setSelectedContact, reset, toggleContactCard } from "../../lib/features/contacts/contactSlice"
import { toast } from "react-toastify"


const ContactModal = () => {
    const dispatch = useDispatch()
    const { selectedContact, editUserOpen, causes, isSuccess } = useSelector((state) => state.contact)

    const [firstName, setFirstName] = useState(selectedContact?.given_name || '');
    const [lastName, setLastName] = useState(selectedContact?.last_name || '');
    const [email, setEmail] = useState(selectedContact?.email || '');
    const [contactType, setContactType] = useState(selectedContact?.contact_type || '')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [company, setCompany] = useState(selectedContact?.company || '')
    const [hospital, setHospital] = useState(selectedContact?.hospital || '')
    const [profilePhoto, setProfilePhoto] = useState(selectedContact?.profile_photo || '');
    const [donorType, setDonorType] = useState(selectedContact?.donor_type || '');
    const [notes, setNotes] = useState(selectedContact?.notes || '')
    const [cause, setCause] = useState('')

    useEffect(() => {

        setFirstName(selectedContact?.given_name || selectedContact?.name || '');
        setLastName(selectedContact?.last_name || '');
        setEmail(selectedContact?.email || '');
        setContactType(selectedContact?.contact_type || '');
        setPhoneNumber(selectedContact?.phone_number[0] || '');
        setCompany(selectedContact?.company || '');
        setHospital(selectedContact?.hospital || '');
        setProfilePhoto(selectedContact?.profile_photo || '');
        setDonorType(selectedContact?.donor_type || '');
        setNotes(selectedContact?.notes || '');
        setCause(selectedContact?.causes?.length > 0 ? selectedContact.causes[0] : '');
    }, [selectedContact]); // This effect depends on selectedContact



    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setProfilePhoto(event.target.files[0]);
            // Optionally, create a URL for preview
            // const filePreview = URL.createObjectURL(event.target.files[0]);
            // setProfilePhotoPreview(filePreview);
        } else {
            setProfilePhoto(null);
            // setProfilePhotoPreview(null);
        }
    };
    const handleDonorTypeChange = (event) => {

        setDonorType(event.target.value);
    };
    const handleCauseChange = (e) => {
        setCause(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // if (!isValidEmail(email)) {
        //     /* replace with react toastify */
        //     alert('Invalid email');
        //     return;
        // }
        const contactData = new FormData();
        contactData.append('id', selectedContact?.id || '')
        contactData.append('given_name', firstName);
        contactData.append('last_name', lastName);
        contactData.append('email', email);
        contactData.append('contact_type', contactType);
        contactData.append('company', company);
        contactData.append('phone_number', phoneNumber);
        contactData.append('hospital', hospital)
        contactData.append('notes', notes)
        contactData.append('donor_type', donorType)
        contactData.append('cause', cause)

        if (profilePhoto) {
            contactData.append('profile_photo', profilePhoto); // Ensure your backend expects this field
        }
        if (selectedContact) {

            dispatch(editContact(contactData))

        } else {
            if (!contactType) { // Assuming 'contactType' is your state variable for tracking this
                toast.error('Please select a contact type (Donor or Patient)');
                return;
            }
            if (!firstName && !lastName) {
                toast.error('Please give either a given name or last name')
            }
            dispatch(addContact(contactData))
        }

    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('Changes Successfull!')
            // So that Add Contact becomes available
            dispatch(setSelectedContact(null))

            setFirstName('');
            setLastName('');
            setEmail('');
            setContactType('');
            setPhoneNumber('');
            setCompany('');
            setHospital('');
            setProfilePhoto('');
            setDonorType('');
            setNotes('');
            setCause('');

        }
        dispatch(reset())
    }, [dispatch, isSuccess])

    return (
        <>
            <div className={`${editUserOpen ? 'fixed inset-0 bg-black bg-opacity-50 z-40' : 'hidden'}`}></div>
            <div id="editUserModal" tabIndex="-1" aria-hidden="true" className={`${editUserOpen ? '' : 'hidden'} fixed max-sm:inset-0 z-50 items-center place-items-center justify-center p-4 h-max m-auto`}>
                <div className="relative w-full max-w-2xl  ">
                    {/* // Modal Content */}
                    <form className="relative bg-white rounded-2xl shadow ">
                        {/* //Modal Header */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                {selectedContact ? 'Edit Contact' : "Add Contact"}
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="editUserModal">
                                <LuX className="scale-[1.5] stroke-2" onClick={() => dispatch(toggleEditUser())} />
                            </button>
                        </div>
                        {/* // Modal Body */}
                        <div className="p-6 space-y-6 max-h-[calc(100vh-15rem)] overflow-auto">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900 ">Given Names</label>
                                    <input type="text" name="first-name" id="first-name" value={firstName} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder={selectedContact ? selectedContact.first_name : "Bonnie"} onChange={(e) => setFirstName(e.target.value)} required="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900 ">Last Names</label>
                                    <input type="text" name="last-name" id="last-name" value={lastName} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Green" onChange={(e) => setLastName(e.target.value)} required="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                    <input type="email" name="email" id="email" value={email} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="example@company.com" onChange={(e) => setEmail(e.target.value)} required="" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="phone-number" className="block mb-2 text-sm font-medium text-gray-900 ">Phone Number</label>
                                    <input type="tel" name="phone-number" id="phone-number" value={phoneNumber} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="e.g. +(12)3456 789" onChange={(e) => setPhoneNumber(e.target.value)} required="" />
                                    {/* Needs better UI */}
                                    <ul className="flex flex-wrap">
                                        {/* {selectedContact?.phone_number.map((number) => (
                                            <li key={number}>
                                                {number}
                                            </li>
                                        ))} */}
                                    </ul>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    {contactType === 'donor' ? <><label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Organization</label>
                                        <input type="text" name="company" id="company" value={company} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Accra Company Limited" onChange={(e) => setCompany(e.target.value)} required="" /></> :

                                        <><label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Hospital</label>
                                            <input type="text" name="company" id="company" value={hospital} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Legon Hospital" onChange={(e) => setHospital(e.target.value)} required="" /></>}
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <div>Contact Type</div>
                                    <div className="flex flex-row space-x-2">
                                        <input type="radio" id="donor" name="donor_patient" value="Donor" checked={selectedContact?.type === 'donor' || contactType === 'donor'} onChange={() => setContactType('donor')} />
                                        <label htmlFor="donor">{selectedContact?.type || 'Donor'}</label>
                                    </div>
                                    <div className="flex space-x-2">
                                        <input type="radio" id="patient" name="donor_patient" value="Patient" checked={selectedContact?.type === 'patient' || contactType === 'patient'} onChange={() => setContactType('patient')} />
                                        <label htmlFor="patient">{selectedContact?.type || 'Patient'}</label>
                                    </div>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="current-password" className="block mb-2 text-sm font-medium text-gray-900 " >Upload Profile Photo</label>
                                    <input key={selectedContact ? selectedContact.id : 'no-contact'} type="file" name="current-password" id="current-password" accept="image/png, image/jpeg" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " onChange={handleFileChange} />
                                </div>
                                {contactType === 'donor' ? <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="donor_type" className="block mb-2 text-sm font-medium text-gray-900 ">Donor Type</label>
                                    <select name="donor_type" id="donor_type" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="" required="" value={donorType} onChange={handleDonorTypeChange}>
                                        <option value="">Select a donor type</option>
                                        <option value="broad_base_donor">Broad Base Donor</option>
                                        <option value="mid_range_donor">Mid Range Donor</option>
                                        <option value="major_donor">Major Donor</option>
                                    </select>
                                </div> : null}
                                {contactType === 'patient' ? <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="cause" className="block mb-2 text-sm font-medium text-gray-900 ">Cause</label>
                                    <select name="cause" id="cause" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="" required="" value={cause} onChange={handleCauseChange}>
                                        <option value="">Select a Cause</option>
                                        {causes.map((cause) => (
                                            <option key={cause?.id} value={cause?.title}>{cause?.title}</option>
                                        ))}
                                    </select>
                                </div> : null}
                                <div className="col-span-6">
                                    <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 ">Notes</label>
                                    <textarea type="text" name="last-name" id="notes" value={notes} className="resize-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Notes about the individual" onChange={(e) => setNotes(e.target.value)} required=""></textarea>
                                </div>
                            </div>
                        </div>
                        {/* // Modal Footer */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " onClick={handleSubmit}>Save all</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default ContactModal