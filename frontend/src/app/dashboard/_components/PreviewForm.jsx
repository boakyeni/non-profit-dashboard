'use client'
import DOMPurify from 'dompurify';
import { useEffect, useState, useRef } from 'react';
import apiClient from '../../../apiClient';
import { useDispatch, useSelector } from 'react-redux';
import { getHTML } from '../../lib/features/newsletter/newsletterSlice';
import { useSearchParams } from 'next/navigation'
import SubscriberTable from './SubscriberTable';
import SortOrFilterModal from './SortOrFilterModal';
import UploadContactsModal from './UploadContactsModal';
import ContactModal from './ContactModal';

const PreviewForm = () => {
    const dispatch = useDispatch()
    const { rawHTML } = useSelector((state) => state.newsletter)
    const { selectedContacts } = useSelector((state) => state.contact)

    const searchParams = useSearchParams()
    const template_id = searchParams.get('template_id')

    const [safeHTML, setSafeHTML] = useState('');
    useEffect(() => {
        dispatch(getHTML(template_id))
        setSafeHTML(DOMPurify.sanitize(rawHTML));
        console.log(safeHTML)
    }, [rawHTML, template_id, safeHTML]);

    const [subject, setSubject] = useState('');
    const [emailSent, setEmailSent] = useState(false); // State to track if email is sent
    const [sendingError, setSendingError] = useState(''); // State to store sending error if any
    const fileInputRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSendingError(''); // Reset sending error on new submission
        const formData = new FormData();
        formData.append('subject', subject);

        // Append multiple files
        const files = fileInputRef.current?.files || [];
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        // Append recipient IDs
        // Append each ID separately (server needs to handle multiple values with the same key)
        selectedContacts.forEach(id => formData.append('recipientIds', id));
        formData.append('template_id', template_id)


        try {
            const response = await apiClient.post('http://localhost:8000/api/donor-management/send-newsletter/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setEmailSent(true); // Update state to indicate email has been sent
        } catch (error) {
            setEmailSent(false); // Ensure emailSent is false on error
            setSendingError('Failed to send email.'); // Update sending error state
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit} className='lg:m-auto max-lg:w-full'>
                <div id="createEventModal" tabIndex="-1" aria-hidden="true" className={` p-4 h-max lg:m-auto max-lg:w-full`}>
                    <div className="relative w-full lg:w-[70vw] ">
                        {/* // Modal Content */}
                        <div className="relative bg-white rounded-2xl shadow ">
                            {/* //Modal Header */}
                            <div className="flex items-start justify-between p-4 border-b rounded-t ">
                                <h3 className="text-xl font-semibold text-gray-900 ">
                                    Preview Email
                                </h3>

                            </div>
                            {/* // Modal Body */}
                            {(emailSent || sendingError) ? (<div className={`p-4 mb-4 text-sm rounded-lg ${sendingError ? 'text-red-700 bg-red-100' : 'text-green-700 bg-green-100'}`} role="alert">
                                {sendingError ? sendingError : 'Email successfully sent!'}
                            </div>) : (<div className="p-6 min-h-[300px] max-h-[calc(100vh-20rem)] overflow-x-auto ">
                                <div className="flex flex-col md:flex-row md:space-x-6">
                                    <div className=" md:w-1/2 2xl:w-3/4 space-y-6">
                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Subject</label>
                                            <input type="text" name="title" id="title" value={subject} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Bonnie" required="" onChange={(e) => setSubject(e.target.value)} />
                                        </div>
                                        <div className="max-w-lg">
                                            <label className="block text-sm font-medium text-gray-900" htmlFor="user_avatar">Upload Attachments</label>
                                            <input ref={fileInputRef} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2.5" aria-describedby="user_avatar_help" id="user_avatar" type="file" multiple />
                                            <div className="mt-1 text-sm text-gray-500 " id="user_avatar_help">Please limit file size to 10MB</div>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Preview</label>
                                            <div dangerouslySetInnerHTML={{ __html: safeHTML }}></div>
                                        </div>


                                    </div>
                                    <div className="md:w-1/2 2xl:w-1/4">
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 border-b border-gray-300 pb-2">Recipients</label>
                                        <SubscriberTable itemsPerPage={5} />

                                    </div>
                                </div>
                            </div>)}
                            {/* // Modal Footer */}
                            <div className="flex items-center p-6 space-x-3 border-t border-gray-200 rounded-b justify-end">
                                {emailSent ?
                                    (<button type="button" onClick={() => { window.location.href = "http://localhost:3000/dashboard" }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Go to Dashboard</button>
                                    ) : !sendingError ? (<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Send Email</button>
                                    ) : (<button onClick={() => { window.location.reload() }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Try Again</button>)}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <SortOrFilterModal />
            <UploadContactsModal />
            <ContactModal />
        </>
    )
}

export default PreviewForm