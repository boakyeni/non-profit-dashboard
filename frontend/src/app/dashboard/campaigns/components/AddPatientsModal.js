'use client'
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { LuX, LuArrowDown, LuPlus } from "react-icons/lu"
import { toggleAddPatientModal, setSelectedPatient } from "../../../lib/features/campaigns/campaignSlice"
import AddPatientsTable from "./AddPatientsTable"
import { addBeneficiary, addContact } from "../../../lib/features/contacts/contactSlice"
import { useState, useEffect } from "react"
import BeneficiaryContactEntry from "./BeneficiaryContactEntry"
import BeneficiaryFields from "./BeneficiaryFields"
import { useParams } from 'next/navigation'
const AddPatientsModal = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const { addPatientModalOpen, selectedPatient } = useSelector((state) => state.campaigns)
    const [local_name, setLocalName] = useState('')
    const [local_email, setLocalEmail] = useState('')
    const [local_company, setLocalCompany] = useState('')
    const [local_website, setLocalWebsite] = useState('')
    const [local_given_name, setLocalGivenName] = useState('')
    const [local_last_name, setLocalLastName] = useState('')
    const [local_address, setLocalAddress] = useState('')
    const [local_region, setLocalRegion] = useState('')
    const [local_country, setLocalCountry] = useState('')
    const [profile_photo, setProfilePhoto] = useState(null)
    const [phone_numbers, setPhoneNumbers] = useState([{ name: '', number: '', primary_contact: false, notes: '' }]);
    const options = [
        { value: 'EDUCATIONAL_INSTITUTION', label: 'Educational Institution' },
        { value: 'HEALTHCARE_INSTITUTION', label: 'Healthcare Institution' },
        { value: 'HEALTHCARE_PATIENT', label: 'Healthcare Patient' },
        { value: 'ANIMAL', label: 'Animal' },
        { value: 'SOCIAL_WELFARE_PROGRAM', label: 'Social Welfare Program' },
        { value: 'EMERGENCY_RELIEF', label: 'Emergency Relief' },
        { value: 'ENVIRONMENTAL_PROTECTION', label: 'Environmental Protection' },
        { value: 'COMMUNITY_DEVELOPMENT', label: 'Community Development' },
        { value: 'DISABILITY_SUPPORT', label: 'Disability Support' },
    ];

    const [beneficiary_type, setBeneficiaryType] = useState('')
    const [beneficiary_data, setBeneficiaryData] = useState({})

    {/* Beneficiaries */ }

    const types_with_given_name_field = ["HEALTHCARE_PATIENT", "DISABILITY_SUPPORT", "EMERGENCY_RELIEF", "SOCIAL_WELFARE_PROGRAM"];

    const handleBeneficiaryChange = (e) => {

        setBeneficiaryData({})
        setBeneficiaryType(e.target.value)
    }

    const handleBeneficiaryDataChange = (field, value) => {
        setBeneficiaryData({ ...beneficiary_data, [field]: value });
    };


    {/* Contacts/Phone Numbers Form */ }

    const handleAddContact = (e) => {
        e.preventDefault()
        setPhoneNumbers([...phone_numbers, { name: '', number: '', primary_contact: false, notes: '' }]);
    };

    const handleRemoveContact = (index) => {
        const newContacts = phone_numbers.filter((_, idx) => idx !== index);
        // Ensure there's always at least one contact marked as primary
        if (phone_numbers[index].primary_contact && newContacts.length > 0) {
            newContacts[0].primary_contact = true;
        }
        setPhoneNumbers(newContacts);
    };


    const handlePrimaryChange = (index) => {
        const newContacts = phone_numbers.map((phone_number, idx) => ({
            ...phone_number,
            primary_contact: idx === index
        }));
        setPhoneNumbers(newContacts);
    };

    const handleInputChange = (index, field, value) => {
        const updatedContacts = phone_numbers.map((phone_number, idx) => {
            if (idx === index) {
                return { ...phone_number, [field]: value };
            }
            return phone_number;
        });
        setPhoneNumbers(updatedContacts);
    };

    {/* Profile Data Form */ }
    useEffect(() => {
        setLocalName('')

    }, [selectedPatient])

    const handleFileChange = (event) => {
        setProfilePhoto(event.target.files[0]);  // Update the state with the selected file
    };


    {/* Utils */ }

    const scrolltoHash = function (element_id) {
        if (typeof document !== 'undefined') {
            const element = document.getElementById(element_id)
            element?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (beneficiary_type === "EDUCATIONAL_INSTITUTION" && !beneficiary_data.institution_type) {
            toast.error("Please pick an institution type")
            return
        }
        if (beneficiary_type === "HEALTHCARE_INSTITUTION" && !beneficiary_data.institution_type) {
            toast.error("Please pick an institution type")
            return
        }
        if (beneficiary_type === "SOCIAL_WELFARE_PROGRAM" && !beneficiary_data.program_type) {
            toast.error("Please pick a program type")
            return
        }
        if (beneficiary_type === "EMERGENCY_RELIEF" && !beneficiary_data.relief_type) {
            toast.error("Please pick a relief type")
            return
        }
        if (beneficiary_type === "ENVIRONMENTAL_PROTECTION" && !beneficiary_data.conservation_type) {
            toast.error("Please pick a conservation type")
            return
        }
        if (beneficiary_type === "DISABILITY_SUPPORT" && !beneficiary_data.support_type) {
            toast.error("Please pick a support type")
            return
        }

        if (!local_name && !local_given_name && !local_last_name) {
            toast.error("Please enter either a full name, given name, or last name")
            return
        }




        const formData = new FormData();
        const state = {
            local_name,
            local_email,
            local_company,
            local_website,
            local_address,
            local_region,
            local_given_name,
            local_last_name,
            local_country,
        };

        Object.entries(state).forEach(([key, value]) => {
            // Only append if value is not an empty string
            if (value !== '') {
                // Remove 'local' from the key
                const cleanKey = key.replace('local', '');
                // no underscore
                const finalKey = cleanKey.slice(1);
                formData.append(finalKey, value);
            }
        });

        if (beneficiary_type) {
            formData.append('beneficiary_type', beneficiary_type)
        }


        const filteredPhoneNumbers = phone_numbers.filter(phone =>
            phone.name !== '' || phone.number !== '' || phone.notes !== ''
        );
        console.log(filteredPhoneNumbers)

        const jsonPhoneNumbers = filteredPhoneNumbers.map(phone => JSON.stringify(phone));
        if (jsonPhoneNumbers) {
            jsonPhoneNumbers.forEach((json_phone) => formData.append('phone_number', json_phone))
        }

        if (beneficiary_data) {
            formData.append("beneficiary_data", JSON.stringify(beneficiary_data))
        }


        if (params['campaign_id']) {
            formData.append("campaign_id", params['campaign_id'])
        }
        console.log(params['campaign_id'])

        if (profile_photo) {
            formData.append('profile_photo', profile_photo)
        }

        if (params['campaign_id']) {
            {/* add beneficiary to campaign*/ }
            dispatch(addBeneficiary(formData))
        } else {
            dispatch(addContact(formData))
        }

        dispatch(toggleAddPatientModal())

    }

    return (
        <>
            <div className={`${addPatientModalOpen ? 'fixed inset-0 bg-black bg-opacity-50 z-40' : 'hidden'}`} onClick={() => dispatch(toggleAddPatientModal())}></div>
            <div id="createEventModal" tabIndex="-1" aria-hidden="true" className={`${addPatientModalOpen ? '' : 'hidden'} fixed max-sm:inset-0 z-50 items-center place-items-center justify-center p-4 h-max m-auto max-lg:w-full`}>
                <div className="relative w-full lg:w-[70vw] ">
                    {/* // Modal Content */}
                    <div className="relative bg-white rounded-2xl shadow ">
                        {/* //Modal Header */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Add Beneficiary
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="editUserModal">
                                <LuX className="scale-[1.5] stroke-2" onClick={() => dispatch(toggleAddPatientModal())} />
                            </button>
                        </div>
                        {/* // Modal Body */}
                        <div className="p-6  max-h-[calc(100vh-20rem)] overflow-x-auto ">
                            <div className="flex flex-col lg:flex-row lg:space-x-6">
                                <div className="lg:w-1/2 2xl:w-3/4 [&>*]:mb-6">
                                    <div className="lg:hidden flex flex-row items-center underline w-max hover:cursor-pointer" onClick={() => scrolltoHash("beneficiary_list")}>
                                        <LuArrowDown />
                                        <p className="text-sm">Add Beneficiaries from List</p>
                                    </div>
                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Name or Title</label>
                                        <input type="text" name="title" value={local_name} id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Name of Community, Organization, Event, etc." required="" onChange={(e) => setLocalName(e.target.value)} />
                                    </div>

                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="select-date" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                        <input type="email" name="select-date" id="select-date" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="kojoboakye@email.com" required="" value={local_email} onChange={(e) => setLocalEmail(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="select-date" className="block mb-2 text-sm font-medium text-gray-900 ">Company</label>
                                        <input type="text" name="select-date" id="select-date" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Accra Limited" required="" value={local_company} onChange={(e) => setLocalCompany(e.target.value)} />
                                        <p className="text-xs text-zinc-400">Leave blank if not applicable</p>
                                    </div>
                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="select-date" className="block mb-2 text-sm font-medium text-gray-900 ">Website</label>
                                        <input type="url" name="select-date" id="select-date" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="https://www.worldwideweb.com" required="" value={local_website} onChange={(e) => setLocalWebsite(e.target.value)} />
                                    </div>
                                    {/* <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                                        <textarea name="description" id="description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Write a description here" required="" />
                                    </div> */}

                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 ">Address</label>
                                        <input type="url" name="address" id="address" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="123 Ghana Rd" required="" value={local_address} onChange={(e) => setLocalAddress(e.target.value)} />
                                    </div>
                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="region" className="block mb-2 text-sm font-medium text-gray-900 ">Region</label>
                                        <input type="text" name="region" id="region" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Greater Accra" required="" value={local_region} onChange={(e) => setLocalRegion(e.target.value)} />
                                    </div>
                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 ">Country</label>
                                        <input type="text" name="country" id="country" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Ghana" required="" value={local_country} onChange={(e) => setLocalCountry(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col max-md:w-full">
                                        <label htmlFor="dropdown" className="block mb-2 text-sm font-medium text-gray-900">Beneficiary Type</label>
                                        <select
                                            id="dropdown"
                                            name="dropdown"
                                            defaultValue={"DEFAULT"}
                                            onChange={handleBeneficiaryChange}
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                            required
                                        >
                                            <option value={"DEFAULT"} disabled> -- select an option -- </option>
                                            {options.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {types_with_given_name_field.includes(beneficiary_type) && (
                                        <div className="flex flex-col w-full 2xl:flex-row  max-2xl:space-y-6 2xl:space-x-4">
                                            <div className="flex flex-col max-md:w-full">
                                                <label htmlFor="given_name" className="block mb-2 text-sm font-medium text-gray-900 ">Given Name</label>
                                                <input type="text" name="given_name" value={local_given_name} id="given_name" className=" shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-2.5 " placeholder="Bonnie" required="" onChange={(e) => setLocalGivenName(e.target.value)} />
                                                <p className="text-xs text-zinc-400">Leave blank if not applicable</p>
                                            </div>
                                            <div className="flex flex-col ">
                                                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 ">Last Name</label>
                                                <input type="text" name="last_name" value={local_last_name} id="last_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-2.5 " placeholder="Bonnie" required="" onChange={(e) => setLocalLastName(e.target.value)} />
                                                <p className="text-xs text-zinc-400">Leave blank if not applicable</p>
                                            </div>

                                        </div>)}
                                    <BeneficiaryFields selection={beneficiary_type} beneficiary_data={beneficiary_data} handleBeneficiaryDataChange={handleBeneficiaryDataChange} />


                                    <div className="max-w-lg">
                                        <label className="block text-sm font-medium text-gray-900" htmlFor="user_avatar">Upload Profile Photo</label>
                                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2.5" aria-describedby="user_avatar_help" id="user_avatar" type="file" onChange={handleFileChange} accept="application/pddf, .jpg, .jpeg, .png" />
                                        <div className="mt-1 text-sm text-gray-500 " id="user_avatar_help">Please limit file size to 10MB</div>
                                    </div>
                                    <div>
                                        <p>Contact Information</p>
                                    </div>
                                    {phone_numbers.map((phone, index) => (
                                        <BeneficiaryContactEntry
                                            key={index}
                                            index={index}
                                            contact={phone}
                                            onPrimaryChange={() => handlePrimaryChange(index)}
                                            onRemove={() => handleRemoveContact(index)}
                                            onInputChange={handleInputChange}
                                        />
                                    ))}

                                    <button type="button" onClick={handleAddContact} className="text-white bg-zinc-400 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex flex-row items-center">Add Another Number <LuPlus className="ml-2" /></button>





                                </div>
                                <div id="beneficiary_list" className="lg:w-1/2 2xl:w-1/4 max-lg:mt-6">
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Add Current Beneficiary</label>
                                    <AddPatientsTable itemsPerPage={5} />

                                </div>
                            </div>
                        </div>
                        {/* // Modal Footer */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
                            <button type="submit" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Add Beneficiaries</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddPatientsModal