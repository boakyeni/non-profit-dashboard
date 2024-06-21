'use client'
import Image from "next/image"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { register, reset } from "../../lib/features/auth/authSlice"
import { useState, useEffect } from "react"
const RegisterPage = () => {
    const [phone_number, setPhoneNumber] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [re_password, setRePassword] = useState("")
    const [institution_admin, setInstitutionAdmin] = useState(false)
    const [institution_name, setInstitutionName] = useState("")

    const dispatch = useDispatch();


    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            /* Eliminates Redux vulnerability with password being seen after login */
            window.location.href = "/dashboard"
        }
        dispatch(reset())
    }, [isError, isSuccess, message, user, dispatch])


    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) {
            toast.error("An email must be provided")
        }
        if (password !== re_password) {
            toast.error("Passwords do not match")
        } else {
            const userData = { phone_number, first_name, last_name, email, password, re_password, institution_admin, institution_name }

            dispatch(register(userData))
        }
    }
    return (



        <section className="w-screen h-screen flex  bg-slate-100 ">
            <div className="flex flex-row justify-center rounded-2xl shadow-2xl m-auto md:w-2/3 bg-white w-full">
                <div className="hidden bg-cover lg:block lg:w-2/5 m-8">
                    <Image width={50} height={50} className="w-auto h-7 sm:h-8" src="/assets/bsystems_logo.png" alt="" />
                </div>

                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize ">
                            Bsystems<sup className="text-xs">®</sup> NGO Donation App
                        </h1>

                        <p className="mt-4 text-gray-500 ">
                            Let’s get you all set up so you can verify your personal account and begin setting up your profile.
                        </p>

                        {/* <div className="mt-6">
                            <h1 className="text-gray-500 ">Select type of account</h1>

                            <div className="mt-3 md:flex md:items-center md:-mx-2">
                                <button className="flex justify-center w-full px-6 py-3 text-white bg-blue-500 rounded-lg md:w-auto md:mx-2 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>

                                    <span className="mx-2">
                                        client
                                    </span>
                                </button>

                                <button className="flex justify-center w-full px-6 py-3 mt-4 text-blue-500 border border-blue-500 rounded-lg md:mt-0 md:w-auto md:mx-2  focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>

                                    <span className="mx-2">
                                        worker
                                    </span>
                                </button>
                            </div>
                        </div> */}

                        <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 w-full" onSubmit={handleSubmit}>
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block mb-2 text-sm text-gray-600 ">First Name</label>
                                <input type="text" placeholder="John" value={first_name} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg     focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setFirstName(e.target.value)} />
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                                <label className="block mb-2 text-sm text-gray-600 ">Last name</label>
                                <input type="text" placeholder="Snow" value={last_name} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg   focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setLastName(e.target.value)} />
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                                <label className="block mb-2 text-sm text-gray-600 ">Phone number</label>
                                <input type="tel" placeholder="XXX-XX-XXXX-XXX" value={phone_number} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                                <label className="block mb-2 text-sm text-gray-600 ">Email address</label>
                                <input type="text" placeholder="johnsnow@example.com" value={email} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                                <label className="block mb-2 text-sm text-gray-600">Password</label>
                                <input type="password" placeholder="⏺⏺⏺⏺⏺⏺⏺⏺" value={password} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                                <label className="block mb-2 text-sm text-gray-600 ">Confirm password</label>
                                <input type="password" placeholder="⏺⏺⏺⏺⏺⏺⏺⏺" value={re_password} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setRePassword(e.target.value)} />
                            </div>
                            <div className="col-span-2 sm:col-span-1 my-6 sm:mt-6 sm:mb-0 ">
                                <div className="flex flex-row items-center space-x-4 ml-1 w-full ">
                                    <input type="checkbox" className="block text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 w-6 h-6 hover:cursor-pointer" checked={institution_admin} onChange={() => setInstitutionAdmin(!institution_admin)} />
                                    <label className="text-md text-gray-600 w-full">Create Institution</label>
                                </div>
                                <p className="text-xs mx-1 text-gray-400 pt-2">Creates an account as an institution admin</p>
                            </div>

                            <div className={`col-span-2 sm:col-span-1 ${institution_admin ? '' : 'hidden sm:block sm:collapse'}`}>
                                <label className="block mb-2 text-sm text-gray-600 ">Institution Name</label>
                                <input type="text" placeholder="Company Name" value={institution_name} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setInstitutionName(e.target.value)} />
                            </div>

                            <div className={`col-span-2 ${institution_admin ? '' : 'hidden'}`}>
                                <label htmlFor="business_cert" className="block mb-2 text-sm font-medium text-gray-900 " >Upload Business Certificate</label>
                                <input type="file" name="business_cert" id="business_cert" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " />
                            </div>

                            {/* Remove link, this needs toast and checks and then redirect*/}
                            <button
                                className="col-span-2 sm:col-span-1 h-12 md:mt-6 flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-slate-700 rounded-lg hover:bg-[#fe0304] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                <span>Sign Up </span>

                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd" />
                                </svg>
                            </button>

                            <div className="flex items-center justify-between mt-4">
                                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                                <a href="/auth/login/" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">Already have a Bsystems Account? Login Here</a>

                                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>





    )
}

export default RegisterPage