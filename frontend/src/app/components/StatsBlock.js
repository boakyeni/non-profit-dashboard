'use client'
import Link from "next/link"

const StatsBlock = ({ icon, number, rate, message, submessage, href }) => {
    return (
        <>
            <Link href={href} className="relative overflow-visible flex flex-row bg-white border-slate-300 border drop-shadow-md justify-between h-[166px] m-4 p-6 rounded-2xl">
                <div className="flex flex-col justify-end">
                    <div className="bg-slate-200 py-6 px-6 absolute -top-6 left-6 rounded-2xl">
                        {icon}
                    </div>
                    <div className="font-bold">
                        {number} {message}
                    </div>
                    <div>
                        <p>
                            {submessage ? submessage : ''}
                            <br />
                            <br />
                        </p>
                    </div>
                </div>

                <div className="flex flex-col h-full text-lime-600">

                </div>

            </Link>
        </>
    )
}

export default StatsBlock