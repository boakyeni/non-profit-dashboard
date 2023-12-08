'use client'
import ProfitChart from "../../../components/ProfitChart"
import CircularProgressBar from "../../../components/CircularProgressBar"
import Link from "next/link"
import NavButton from "../../../components/navButton"
import { LuBarChart3, LuMailCheck } from "react-icons/lu"

const CampaignDetails = ({ params }) => {
    return (
        <>
            <h1 className="text-2xl p-4">{params.campaign_id} Campaign Fundraising Progress</h1>
            <section className="max-sm:grid max-sm:grid-cols-1 flex my-4 px-4 gap-3">

                <div className="w-full md:w-3/4 h-[300px] bg-white drop-shadow-xl rounded-xl">
                    <ProfitChart />
                </div>
                <div>
                    <CircularProgressBar />
                </div>
            </section>
            <section className="flex my-4 px-4 gap-3 h-[250px]">
                <div className="flex-grow relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white ">
                            Overall Donors
                            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400"></p>
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">

                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Number of Donors
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Average Revenue
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Percent of Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    Major Donors
                                </th>
                                <td className="px-6 py-4">
                                    ₵ 100,000
                                </td>
                                <td className="px-6 py-4">
                                    Laptop
                                </td>
                                <td className="px-6 py-4">
                                    $2999
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    Mid Range
                                </th>
                                <td className="px-6 py-4">
                                    White
                                </td>
                                <td className="px-6 py-4">
                                    Laptop PC
                                </td>
                                <td className="px-6 py-4">
                                    $1999
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                            <tr className="bg-white ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    Broad Base
                                </th>
                                <td className="px-6 py-4">
                                    Black
                                </td>
                                <td className="px-6 py-4">
                                    Accessories
                                </td>
                                <td className="px-6 py-4">
                                    $99
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>

                        </tbody>
                        <tfoot>
                            <tr className="font-semibold">
                                <th scope="row" className="px-6 py-3 text-base">Total</th>
                                <td className="px-6 py-3">3</td>
                                <td className="px-6 py-3">21,000</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </section>
            <section className="flex flex-row my-4 px-4 gap-3 bottom-0">
                <div className="lg:w-1/5 h-[200px] pt-6 bg-white shadow-md rounded-xl flex flex-col">
                    <h3 className="h-1/4 px-4 font-bold text-center">Send an Update Email to Donors</h3>
                    <div className="flex h-1/4 justify-around p-6"><LuMailCheck className="scale-[1.75]" /></div>

                    <div className="w-full h-1/2 flex flex-row justify-around">
                        <button className="mt-5 hover:bg-blue-700 h-1/2 bg-blue-500 px-10 drop-shadow-sm rounded-xl text-white">Preview</button>
                    </div>

                </div >
                <div className="lg:w-1/5 h-[200px] bg-white shadow-md rounded-xl flex flex-col relative overflow-visible">
                    <h3 className="h-1/4 pt-6 px-4 font-bold text-center pb-10">View Other Statistics</h3>
                    <div className="flex h-1/4 justify-around p-6">
                        <LuBarChart3 className="scale-[1.75] " />
                    </div>
                    <div className="w-full h-1/2 flex flex-row justify-around">
                        <NavButton section={`section-2`}>
                            <div className="flex place-items-center hover:bg-blue-700 bg-blue-500 h-1/2 px-10 drop-shadow-sm rounded-xl text-white">View</div>
                        </NavButton>
                    </div>

                </div >
            </section >
            <section id="section-2" className="h-screen">

            </section>

        </>
    )
}

export default CampaignDetails