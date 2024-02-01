'use client'
import ProfitChart from "../../components/ProfitChart"
import AnalyticsBlock from "../_components/AnalyticsBlock"
const AnalyticsPage = () => {
    return (
        <>
            <div>
                <h1 className="text-2xl p-4">Overview</h1>
                <div className="w-full p-4 flex flex-row space-x-4">
                    <div className="bg-white h-max w-1/5">
                        <p className="text-slate-300 text-sm">Auto Date Range</p>
                        <p className="text-lg">This Month</p>
                    </div>
                    <div className="bg-white h-max w-1/5">
                        <p className="text-slate-300 text-sm">Auto Date Range</p>
                        <p className="text-lg">This Month</p>
                    </div>
                    <div className="bg-white h-max w-1/5">
                        <p className="text-slate-300 text-sm">Auto Date Range</p>
                        <p className="text-lg">This Month</p>
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
        </>
    )
}

export default AnalyticsPage