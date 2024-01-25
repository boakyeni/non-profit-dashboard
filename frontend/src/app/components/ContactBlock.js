'use client'
import Link from "next/link"
import { RxTriangleUp } from 'react-icons/rx'

const ContactBlock = ({ icon, number, rate, message, submessage, href }) => {
    return (
        <>
            <Link href={href} className="relative overflow-visible flex flex-col bg-white border-slate-300 border drop-shadow-md justify-between h-[166px] m-4 p-6 rounded-2xl">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col justify-end">
                        <div className="bg-slate-200 py-6 px-6 absolute -top-6 left-6 rounded-2xl">
                            {icon}
                        </div>

                    </div>

                    <div className="flex flex-col h-full">
                        <h1 className="text-right">Contacts</h1>
                        <p className="font-bold text-xl text-right text-slate-800">100</p>
                        <div className="flex flex-wrap gap-2">
                            <p>15 Patients</p>
                            <p>85 Donors</p>
                        </div>

                    </div>
                </div>
                <div>
                    <div className="border border-b"></div>
                    <div className="">
                        <p className="text-right flex text-slate-500">
                            <span className="text-lime-600 font-bold flex place-items-center mr-3">
                                <RxTriangleUp className="" />{rate}%
                            </span>
                            increase from last week
                        </p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default ContactBlock