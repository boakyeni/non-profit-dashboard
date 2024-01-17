'use client'
import { useSearchParams } from "next/navigation"
import { LuHeartHandshake } from "react-icons/lu"
import CurrencyInput from 'react-currency-input-field'
const EmbededCampaignPage = ({ params }) => {
    const searchParams = useSearchParams()

    const theme = searchParams.get('theme')

    return (
        <div className="flex">
            <div className={`flex-grow from-slate-50 to-slate-400 bg-gradient-to-br  rounded-2xl`}>
                <div className={`flex flex-col sm:flex-row h-full`}>
                    <div className={`max-sm:mx-auto flex items-center w-[137px] h-[137px] xs:w-[160px] xs:h-[160px] sm:h-[160px] md:w-[200px] md:h-[200px]`}>
                        <LuHeartHandshake className="m-auto scale-[10.0] stroke-[0.5px]" />
                    </div>
                    <div className={`flex flex-grow h-full place-items-center sm:max-w-[75%]`}>
                        <div className={`flex flex-col`}>
                            <h1 className="">Campaign</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a lorem et augue blandit pulvinar at id lorem. Integer sed ipsum sed dolor ornare laoreet. Curabitur ut tristique mauris, porta dictum arcu. Duis vitae dui porta ante bibendum euismod quis sed ipsum. Morbi efficitur sodales venenatis. Duis elementum nunc quis lorem luctus efficitur. Aenean facilisis eu orci in bibendum. Vivamus commodo interdum tellus. Pellentesque pretium porttitor leo, vel vehicula massa vehicula quis. </p>
                            <div className="flex flex-row justify-between w-full mb-2">
                                <button className="rounded-full w-[30%] py-2 border border-blue-500">
                                    ₵ 10
                                </button>
                                <button className="rounded-full w-[30%] py-2 border border-blue-500">
                                    ₵ 15
                                </button>
                                <button className="rounded-full w-[30%] py-2 border border-blue-500">
                                    ₵ 20
                                </button>
                            </div>
                            <div className="flex flex-row mb-2">
                                <CurrencyInput
                                    className="w-3/4 rounded-full pl-3 py-2 border border-blue-500"
                                    name="donation-amount"
                                    placeholder="Enter Amount"
                                    decimalsLimit={2}
                                    prefix={`₵`}
                                    onValueChange={(value, name) => console.log(value, name)} />
                                <button className="text-white rounded-full w-1/4 py-2 border bg-blue-500 border-blue-500">
                                    Donate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmbededCampaignPage