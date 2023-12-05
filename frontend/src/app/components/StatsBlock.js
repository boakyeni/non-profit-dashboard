'use client'


const StatsBlock = ({ icon }) => {
    return (
        <>
            <div className="flex flex-row bg-white border-slate-300 border drop-shadow-md justify-between h-[166px] m-4 p-6 ">
                <div className="flex flex-col justify-between">
                    <div className="bg-slate-200 rounded-full py-6 px-6">
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