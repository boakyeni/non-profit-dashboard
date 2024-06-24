'use client'
import ProfitChart from "../../../components/ProfitChart"
import CircularProgressBar from "../../../components/CircularProgressBar"
import Link from "next/link"
import NavButton from "../../../components/navButton"
import { LuBarChart3, LuMailCheck, LuCode2 } from "react-icons/lu"
import { useDispatch, useSelector } from "react-redux"
import { toggleEmbedModal } from "../../../lib/features/dropdown/dropdownSlice"
import EmbedModal from "../components/EmbedModal"
import { TbHeartPlus } from 'react-icons/tb'
import AddPatientsModal from "../components/AddPatientsModal"
import { toggleAddPatientModal } from "../../../lib/features/campaigns/campaignSlice"

const CampaignDetails = ({ params }) => {
    const dispatch = useDispatch()
    const { embedModalOpen } = useSelector((state) => state.dropdowns)
    const handlePreviewClick = (e) => {
        e.preventDefault(); // Prevent default anchor link behavior

        // Convert selectedContacts array to a JSON string and store it
        localStorage.setItem('selectedCampaigns', JSON.stringify([params.campaign_id]));

        // Redirect to the URL
        window.location.href = 'http://localhost:8000/mosaico';
    };
    return (
        <>
            <EmbedModal />
            <div className="w-full flex justify-around">
                <AddPatientsModal />
            </div>

            <div>
                <h1 className="text-2xl p-4">{params.campaign_id} Campaign Fundraising Progress</h1>
                <section className="max-sm:grid max-sm:grid-cols-1 flex my-4 px-4 gap-3">

                    <div className="max-sm:order-last w-full md:w-3/4 h-[300px] bg-white drop-shadow-xl rounded-xl">
                        <ProfitChart />
                    </div>
                    <div>
                        <CircularProgressBar />
                    </div>
                </section>
                <section className="flex my-4 px-4 gap-3 h-[250px]">
                    <div className="flex-grow relative overflow-x-auto shadow-md sm:rounded-lg ">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                            <caption className=" p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white ">
                                Overall Donors
                                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400"></p>
                            </caption>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Type
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
                                        3
                                    </td>
                                    <td className="px-6 py-4">
                                        ₵ 33,000
                                    </td>
                                    <td className="px-6 py-4">
                                        57.14 %
                                    </td>

                                </tr>
                                <tr className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        Mid Range
                                    </th>
                                    <td className="px-6 py-4">
                                        ₵ 50,000
                                    </td>
                                    <td className="px-6 py-4">
                                        200
                                    </td>
                                    <td className="px-6 py-4">
                                        ₵ 250
                                    </td>
                                    <td className="px-6 py-4">
                                        28.57 %
                                    </td>
                                </tr>
                                <tr className="bg-white ">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        Broad Base
                                    </th>
                                    <td className="px-6 py-4">
                                        ₵ 25,000
                                    </td>
                                    <td className="px-6 py-4">
                                        800
                                    </td>
                                    <td className="px-6 py-4">
                                        ₵ 31.25
                                    </td>
                                    <td className="px-6 py-4">
                                        14.29%
                                    </td>
                                </tr>

                            </tbody>
                            <tfoot>
                                <tr className="font-semibold">
                                    <th scope="row" className="px-6 py-3 text-base">Totals</th>
                                    <td className="px-6 py-3">₵ 175,000</td>
                                    <td className="px-6 py-3">1,003</td>

                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </section>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-4 px-4 gap-3 bottom-0 justify-between">
                    <div className=" h-[200px] pt-6 bg-white shadow-md rounded-xl flex flex-col">
                        <h3 className="h-1/4 px-4 font-bold text-center">Send an Update Email to Donors</h3>
                        <div className="flex h-1/4 justify-around p-6"><LuMailCheck className="scale-[1.75]" /></div>

                        <div className="w-full h-1/2 flex flex-row justify-around" onClick={handlePreviewClick}>
                            <button className="mt-5 hover:bg-blue-700 h-1/2 bg-blue-500 px-10 drop-shadow-sm rounded-xl text-white">Preview</button>
                        </div>

                    </div >
                    <div className=" h-[200px] bg-white shadow-md rounded-xl flex flex-col relative overflow-visible">
                        <h3 className="h-1/4 pt-6 px-4 font-bold text-center pb-10">View Subscribers</h3>
                        <div className="flex h-1/4 justify-around p-6">
                            <LuBarChart3 className="scale-[1.75] " />
                        </div>
                        <div className="w-full h-1/2 flex flex-row justify-around">
                            <NavButton section={`section-2`}>
                                <div className="flex place-items-center hover:bg-blue-700 bg-blue-500 h-1/2 px-10 drop-shadow-sm rounded-xl text-white">View</div>
                            </NavButton>
                        </div>

                    </div >
                    <div className=" h-[200px] bg-white shadow-md rounded-xl flex flex-col relative overflow-visible">
                        <h3 className="h-1/4 pt-6 px-4 font-bold text-center pb-10">Add Beneficiaries to Campaign</h3>
                        <div className="flex h-1/4 justify-around p-6">
                            <TbHeartPlus className="scale-[1.75]" />
                        </div>
                        <div className="w-full h-1/2 flex flex-row justify-around">
                            <button onClick={() => dispatch(toggleAddPatientModal())}>
                                <div className="flex place-items-center hover:bg-blue-700 bg-blue-500 h-1/2 px-10 drop-shadow-sm rounded-xl text-white">View</div>
                            </button>
                        </div>

                    </div >
                    <div className=" h-[200px] bg-white shadow-md rounded-xl flex flex-col relative overflow-visible">
                        <h3 className="h-1/4 pt-6 px-4 font-bold text-center pb-10 ">Embed Donation Widget</h3>
                        <div className="flex h-1/4 justify-around p-6">
                            <LuCode2 className="scale-[1.75] " />
                        </div>
                        <div className="w-full h-1/2 flex flex-row justify-around">
                            <button onClick={() => dispatch(toggleEmbedModal())}>
                                <div className="flex place-items-center hover:bg-blue-700 bg-blue-500 h-1/2 px-10 drop-shadow-sm rounded-xl text-white">Preview</div>
                            </button>
                        </div>

                    </div >
                </section >
                <section id="section-2" className="h-screen">

                </section>


            </div>

        </>

    )
}

export default CampaignDetails