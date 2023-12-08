'use client'
import StatsBlock from "./StatsBlock";
import { LuHeartHandshake, LuCalendarClock, LuGalleryVerticalEnd, LuUser2 } from 'react-icons/lu'
import AreaChartPlot from "./PatientChart";
import ProfitChart from "./ProfitChart";
import ActivePieChart from "./PieChart";

import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Charts = () => {

    const needDominantBaselineFix = 0
    return (
        <div className="lg:h-screen max-md:grid max-md:grid-cols-1">
            <section className="pt-6 ">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 xl:gap-0 xl:grid-cols-4 2xl:gap-7.5">
                    <StatsBlock icon={<LuGalleryVerticalEnd className='scale-[2.5]' />} />
                    <StatsBlock icon={<LuHeartHandshake className='scale-[2.5]' />} />
                    <StatsBlock icon={<LuCalendarClock className='scale-[2.5]' />} />
                    <StatsBlock icon={<LuUser2 className='scale-[2.5]' />} />
                </div>
            </section>

            <section className="flex flex-col sm:flex-row my-4 px-4 gap-3 ">
                <div className="sm:w-1/2 h-[300px] bg-white drop-shadow-xl rounded-2xl">
                    <ProfitChart />
                </div>

                <div className="sm:w-1/2 h-[300px] bg-white drop-shadow-xl rounded-2xl">
                    <AreaChartPlot />
                </div>
            </section>

            <section className="flex my-4 px-4 gap-2 max-md:grid max-md:grid-cols-1 mx-auto">
                <div className=" md:w-1/3 h-[250px] bg-white drop-shadow-xl rounded-2xl">
                    <ActivePieChart />
                </div>
                <div className=" md:w-1/3 h-[250px] bg-white drop-shadow-xl rounded-2xl flex place-items-center">
                    <div className="w-1/2 mx-auto my-2 text-sm">
                        <CircularProgressbarWithChildren
                            value={67} styles={{
                                root: {
                                    transformOrigin: 'center center',
                                },
                                path: {
                                    // Path color
                                    stroke: `rgba(136, 132, 216, ${67 / 100})`,
                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',
                                    // Customize transition animation
                                    transition: 'stroke-dashoffset 0.5s ease 0s',
                                    // Rotate the path
                                    transformOrigin: 'center center',
                                },
                            }}
                        >
                            <p className="text-2xl font-bold">₵ 10,234</p>
                            <p className="text-xl">Campaign 1</p>
                            <br></br>
                            <p>67% to goal</p>
                        </CircularProgressbarWithChildren>

                    </div>

                </div>
                <div className=" md:w-1/3 h-[250px] bg-white drop-shadow-xl rounded-2xl flex place-items-center">
                    <div className="w-1/2 mx-auto my-2 ">
                        <CircularProgressbarWithChildren
                            value={32} styles={{
                                root: {
                                    transformOrigin: 'center center',
                                },
                                path: {
                                    // Path color
                                    stroke: `rgba(202, 232, 213, ${32 / 100})`,
                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',
                                    // Customize transition animation
                                    transition: 'stroke-dashoffset 0.5s ease 0s',
                                    // Rotate the path
                                    transformOrigin: 'center center',
                                },
                            }}
                        >
                            <p className="text-2xl font-bold">₵ 4,321</p>
                            <p>Campaign 2</p>
                            <br></br>
                            <p>32% to goal</p>
                        </CircularProgressbarWithChildren>
                    </div>

                </div>
            </section >
        </div>
    );
};

export default Charts;