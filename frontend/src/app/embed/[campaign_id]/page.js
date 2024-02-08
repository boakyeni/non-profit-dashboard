'use client'
import { useSearchParams } from "next/navigation"
import { LuHeartHandshake } from "react-icons/lu"
import CurrencyInput from 'react-currency-input-field'
import ReactCardFlip from 'react-card-flip';
import { useState } from "react";

const EmbededCampaignPage = ({ params }) => {
    const searchParams = useSearchParams()
    const [isFlipped, setIsFlipped] = useState(false);
    const [donated, setDonated] = useState(false);
    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };
    const showThanks = () => {
        setDonated(true)
        setIsFlipped(!isFlipped);
    };
    const theme = searchParams.get('theme')

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div className=" h-[352px]" >
                <div className={`flex-grow from-slate-50 to-slate-400 bg-gradient-to-br rounded-2xl h-full py-3 `}>
                    <div className={`flex flex-col sm:flex-row`}>
                        <div className={`max-sm:mx-auto flex items-center w-[137px] h-[137px] xs:w-[160px] xs:h-[160px] sm:h-[160px] md:w-[200px] md:h-[200px]`} onClick={handleClick}>
                            <LuHeartHandshake className="m-auto scale-[10.0] stroke-[0.5px]" />
                        </div>
                        <div className={`flex flex-grow h-max place-items-center sm:max-w-[75%]`}>
                            <div className={`flex flex-col w-full h-max space-y-3`}>
                                <h1 className="">Campaign</h1>
                                <div className=" sm:h-[175px] overscroll-none" >
                                    <button onClick={handleClick} className="sm:hidden">Click To See More Info</button>
                                    <p className="hidden xs:inline-block bg-transparent resize-none w-full  overscroll-none ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a lorem et augue blandit pulvinar at id lorem. Integer sed ipsum sed dolor ornare laoreet. Curabitur ut tristique mauris, porta dictum arcu. Duis vitae dui porta ante bibendum euismod quis sed ipsum. Morbi efficitur sodales venenatis. Duis elementum nunc quis lorem luctus efficitur. Aenean facilisis eu orci in bibendum. Vivamus commodo interdum tellus. Pellentesque pretium porttitor leo </p>
                                </div>
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
                                    <button className="text-white rounded-full w-1/4 py-2 border bg-blue-500 border-blue-500" onClick={showThanks}>
                                        Donate
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex overflow-hidden ">
                {!donated ?
                    <div className={`flex-grow from-slate-50 to-slate-400 bg-gradient-to-br rounded-2xl py-3 overscroll-none overflow-hidden h-[352px]`}>
                        <div className={`flex flex-col sm:flex-row overflow-hidden`}>
                            <div className={`flex flex-grow h-max place-items-center sm:max-w-[75%] overflow-hidden`}>
                                <div className={`flex flex-col w-full h-max space-y-3 overflow-hidden`}>
                                    <button onClick={handleClick}>{'Click to Donate'}</button>
                                    <h1 className="">Campaign</h1>
                                    <div className=" sm:h-[175px]" >

                                        <p className="xs:inline-block bg-transparent resize-none">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a lorem et augue blandit pulvinar at id lorem. Integer sed ipsum sed dolor ornare laoreet. Curabitur ut tristique mauris, porta dictum arcu. Duis vitae dui porta ante bibendum euismod quis sed ipsum. Morbi efficitur sodales venenatis. Duis elementum nunc quis lorem luctus efficitur. Aenean facilisis eu orci in bibendum. Vivamus commodo interdum tellus. Pellentesque pretium porttitor leo </p>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div> : <div className={`flex-grow from-slate-50 to-slate-400 bg-gradient-to-br rounded-2xl h-[352px] py-3 overscroll-none overflow-hidden`}>
                        <div className={`flex flex-col sm:flex-row overflow-hidden`}>
                            <div className={`flex flex-grow h-max place-items-center sm:max-w-[75%] overflow-hidden`}>
                                <div className={`flex flex-col w-full h-max space-y-3 overflow-hidden`}>
                                    <h1 className="">Campaign</h1>
                                    <div className=" sm:h-[175px]" >

                                        <p className="xs:inline-block bg-transparent resize-none">Thank You </p>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </ReactCardFlip >
    )
}

export default EmbededCampaignPage