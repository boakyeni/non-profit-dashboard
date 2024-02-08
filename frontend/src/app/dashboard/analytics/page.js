'use client'
import ProfitChart from "../../components/ProfitChart"
import AnalyticsBlock from "../_components/AnalyticsBlock"
import { LuCalendar } from "react-icons/lu"
import AnalyticsDateRangeModal from "../_components/AnalyticsDateRange"
import { toggleDateRangeModal, toggleDateDropdown } from "../../lib/features/analytics/analyticSlice"
import { useDispatch } from "react-redux"
import AnalyticsDateDropdown from "../_components/AnalyticsDateDropdown"

const AnalyticsPage = () => {
    const dispatch = useDispatch()
    return (
        <div className="flex w-full justify-around">
            <AnalyticsDateRangeModal />
            <div className="">

                <div className=" p-4 flex flex-col sm:flex-row w-full 2xl:w-3/4 mx-auto ">
                    <div className="relative bg-white h-max flex-grow rounded-xl border border-slate-300 shadow-md font-bold p-1 w-[300px] mx-auto" onClick={() => dispatch(toggleDateDropdown())}>
                        <p className="text-slate-300 text-sm ml-4">Auto Date Range</p>
                        <p className="text-lg ml-3 font-bold flex flex-row place-items-center gap-1 hover:cursor-pointer"><LuCalendar /> This Month</p>
                        <AnalyticsDateDropdown />
                    </div>

                    <div className="bg-white h-max flex-grow rounded-xl border border-slate-300 shadow-md font-bold p-1 w-[300px] mx-auto hover:cursor-pointer" onClick={() => dispatch(toggleDateRangeModal())}>
                        <p className="text-slate-300 text-sm ml-4">Custom Date Range</p>
                        <p className="text-lg ml-3 font-bold flex flex-row place-items-center gap-1"><LuCalendar />  Enter Custom Range</p>
                    </div>
                </div>


                <div className="max-2xl:grid max-2xl:grid-cols-1 flex flex-grow w-full my-4 px-4 gap-3">
                    <section className="grid max-sm:grid-cols-1 grid-cols-2 px-4 gap-3 2xl:w-1/2 mx-auto">
                        <AnalyticsBlock title={'Total Contribution'} value={'5,139'} />
                        <AnalyticsBlock title={'Donor Retention Rate'} value={'30%'} />
                        <AnalyticsBlock title={'New Donor Acquisition'} value={'50'} />
                        <AnalyticsBlock title={'Average Donation Amount'} value={'100'} />
                        <AnalyticsBlock title={'Donor Churn Rate'} value={'33%'} />
                        <AnalyticsBlock title={'Cost Per Dollar Raised'} value={'0.55'} />
                    </section>
                    <div className="flex flex-col w-full 2xl:w-1/2 justify-between">
                        <section className=" bg-white drop-shadow-xl rounded-xl h-[300px] sm:h-[400px]">
                            <ProfitChart />
                        </section>
                        <section className=" bg-white drop-shadow-xl rounded-xl h-[300px] sm:h-[400px]">
                            <ProfitChart />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalyticsPage