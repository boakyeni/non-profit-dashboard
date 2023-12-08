'use client'


const StatsBlock = ({ icon }) => {
    return (
        <>
            <div className="overflow-visible flex flex-row bg-white border-slate-300 border drop-shadow-md justify-between h-[166px] m-4 p-6 rounded-2xl">
                <div className="flex flex-col justify-end">
                    <div className="bg-slate-200  py-6 px-6 absolute -top-6 left-6 rounded-2xl">
                        {icon}
                    </div>
                    <div>
                        2.450
                    </div>
                    <div>
                        <p>Total { }</p>
                    </div>
                </div>

                <div className="flex flex-col h-full text-lime-600">
                    2.59 %
                </div>

            </div>
        </>
    )
}

export default StatsBlock