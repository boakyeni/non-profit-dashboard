'use client'
import Link from "next/link"
import { RxTriangleDown, RxTriangleUp } from 'react-icons/rx'

const AnalyticsBlock = ({ title, value, icon, number, rate, message, submessage }) => {
    return (
        <>
            <Link href="/" className="relative overflow-visible flex flex-row bg-white border-slate-300 border drop-shadow-md justify-between w-[275px] h-[275px] rounded-2xl">
                <div className="relative flex flex-col w-full justify-between">
                    <div className="absolute font-bold text-sm text-slate-400 m-6">
                        {title}
                    </div>
                    <div className="flex flex-col m-auto overflow-hidden w-full text-center place-items-center">
                        <p className="font-bold text-slate-900 text-4xl sm:text-5xl md:text-6xl break-words" >
                            {value}
                        </p>
                        {rate < 0 ?
                            <div className="flex flex-row text-red-500 items-center">
                                <RxTriangleDown />
                                <p>{rate}</p>
                            </div>
                            :
                            <div className="flex flex-row text-lime-500 items-center">
                                <RxTriangleUp />
                                <p>{rate}</p>
                            </div>}
                    </div>
                    <div className="absolute bottom-12 w-full text-center text-sm">vs previous 30 days</div>
                </div>


            </Link>
        </>
    )
}

export default AnalyticsBlock