'use client'
import Link from "next/link"


const CampaignCard = ({ title, icon, link }) => {
    return (

        <div className="h-[30%] my-auto xl:h-[50vh] w-[80%] lg:w-[380px] mx-auto">
            <Link href={link}>
                <div className="bg-white rounded-2xl drop-shadow-xl h-full flex flex-col justify-around w-full hover:scale-[1.05] transition-all duration-500 ease-in-out">
                    <h1 className="text-2xl text-center p-3">
                        {title}
                    </h1>
                    <button className="w-full mb-6">
                        {icon}
                    </button>


                </div>
            </Link>
        </div>
    )
}

export default CampaignCard