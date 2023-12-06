'use client'
import StatsBlock from "./StatsBlock";
import { LuHeartHandshake, LuCalendarClock, LuGalleryVerticalEnd, LuUser2 } from 'react-icons/lu'
import AreaChartPlot from "./PatientChart";
import ProfitChart from "./ProfitChart";
import ActivePieChart from "./PieChart";

const Charts = () => {
    return (
        <>
            <section className="pt-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 xl:gap-0 xl:grid-cols-4 2xl:gap-7.5">
                    <StatsBlock icon={<LuGalleryVerticalEnd className='scale-[2.5]' />} />
                    <StatsBlock icon={<LuHeartHandshake className='scale-[2.5]' />} />
                    <StatsBlock icon={<LuCalendarClock className='scale-[2.5]' />} />
                    <StatsBlock icon={<LuUser2 className='scale-[2.5]' />} />
                </div>
            </section>

            <section className="flex my-4 px-4 gap-3">
                <div className="w-1/2 h-[300px] bg-white drop-shadow-xl rounded-xl">
                    <ProfitChart />
                </div>

                <div className="w-1/2 h-[300px] bg-white drop-shadow-xl rounded-xl">
                    <AreaChartPlot />
                </div>
            </section>

            <section className="flex my-4 px-4 gap-2">
                <div className=" w-1/3 h-[250px] bg-white drop-shadow-xl rounded-xl">
                    <ActivePieChart />
                </div>
                <div className=" w-1/3 h-[250px] bg-white drop-shadow-xl rounded-xl">
                    <ProfitChart />
                </div>
                <div className=" w-1/3 h-[250px] bg-white drop-shadow-xl rounded-xl">
                    <ProfitChart />
                </div>
            </section>
        </>
    );
};

export default Charts;