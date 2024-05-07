'use client'
import StatsBlock from "./StatsBlock";
import { LuHeartHandshake, LuCalendarClock, LuGalleryVerticalEnd, LuUser2 } from 'react-icons/lu'
import AreaChartPlot from "./PatientChart";
import ProfitChart from "./ProfitChart";
import ActivePieChart from "./PieChart";
import AppointmentBlock from "./AppointmentBlock";
import Link from "next/link";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import RevenueBlock from "./RevenueBlock";
import ContactBlock from "./ContactBlock";
import ProgressProvider from "../../utils/ProgressProvider";

const Charts = () => {

    const needDominantBaselineFix = 0
    return (
        <div className=" max-md:grid max-md:grid-cols-1">
            <section className="pt-6 ">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 xl:gap-0 xl:grid-cols-4 2xl:gap-7.5">
                    <AppointmentBlock icon={<LuCalendarClock className='scale-[2.5] stroke-1' />} />
                    <StatsBlock icon={<LuGalleryVerticalEnd className='scale-[2.5] stroke-1' />} number={10} message={"Incomplete Tasks"} submessage={"3 Due this week"} href={'/dashboard/kanban/'} />
                    <RevenueBlock icon={<LuHeartHandshake className='scale-[2.5] stroke-1' />} href={"/dashboard/contacts/"} rate={2.59} />

                    <ContactBlock icon={<LuUser2 className='scale-[2.5] stroke-1' />} rate={25} href={"/dashboard/contacts"} />
                </div>
            </section>

            <section className=" mt-4 mb-8 px-4 w-full grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className=" mx-auto w-full h-[300px] bg-white drop-shadow-xl rounded-2xl">
                    <ProfitChart />
                </div>

                <div className=" mx-auto w-full h-[300px] bg-white drop-shadow-xl rounded-2xl">
                    <AreaChartPlot />
                </div>
            </section>

            <section className="flex my-4 px-4 gap-8 max-md:grid max-md:grid-cols-1 mx-auto">
                <div className=" md:w-1/3 bg-white drop-shadow-xl rounded-2xl">
                    <ActivePieChart />
                </div>
                <Link href={`/dashboard/campaigns/1`} className=" md:w-1/3 bg-white drop-shadow-xl rounded-2xl flex flex-col place-items-center py-3">
                    <div className="w-1/2 mx-auto my-2">
                        <div className="flex flex-row space-x-2 justify-around mb-2">
                            <p className="">Campaign 1</p>
                            <p>67% to goal</p>
                        </div>
                        <ProgressProvider valueStart={0} valueEnd={67}>
                            {value => (
                                <CircularProgressbarWithChildren
                                    value={value} text={`₵ 10,234`} styles={{
                                        root: {
                                            transformOrigin: 'center center',
                                        },
                                        path: {
                                            // Path color
                                            stroke: `rgba(70, 130, 180, ${67 / 100})`,
                                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                            strokeLinecap: 'butt',
                                            // Customize transition animation
                                            transition: 'stroke-dashoffset 0.5s ease 0s',
                                            // Rotate the path
                                            transformOrigin: 'center center',
                                        },
                                    }}
                                >
                                    {/* <div className="text-center">
                                        <p className="text-[28px] font-bold">₵ 10,234</p>
                                    </div> */}
                                </CircularProgressbarWithChildren>)}
                        </ProgressProvider>

                    </div>


                </Link>
                <Link href={`/dashboard/campaigns/2`} className=" md:w-1/3  bg-white drop-shadow-xl rounded-2xl flex flex-col place-items-center py-3">
                    <div className="w-1/2 mx-auto my-2">
                        <div className="flex flex-row space-x-2 justify-around mb-2">
                            <p className="text-md">Campaign 2</p>
                            <p>32% to goal</p>
                        </div>
                        <ProgressProvider valueStart={0} valueEnd={32} >
                            {value => (
                                <CircularProgressbarWithChildren
                                    value={value} text={`₵ 4,321`} styles={{
                                        root: {
                                            transformOrigin: 'center center',
                                        },
                                        path: {
                                            // Path color
                                            stroke: `rgba(70, 130, 180, ${32 / 100})`,
                                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                            strokeLinecap: 'butt',
                                            // Customize transition animation
                                            transition: 'stroke-dashoffset 0.5s ease 0s',
                                            // Rotate the path
                                            transformOrigin: 'center center',
                                        },
                                    }}
                                >
                                    {/* <p className="text-[28px] font-bold">₵ 4,321</p> */}

                                </CircularProgressbarWithChildren>)}
                        </ProgressProvider>

                    </div>

                </Link>
            </section >
        </div>
    );
};

export default Charts;