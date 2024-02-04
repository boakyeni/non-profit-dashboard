'use client'
import CampaignCard from "./components/CampaignCard"
import { LuPlusCircle, LuArrowRightCircle } from "react-icons/lu"

const Campaign = () => {
    return (
        <div className="flex flex-col xl:flex-row place-items-center w-full h-[85vh]">
            <CampaignCard title={'Create a New Campaign'} icon={<LuPlusCircle className="scale-[3.0] mx-auto stroke-1" />} link='/dashboard/campaigns/create' />
            <CampaignCard title={'View Campaign Analytics'} icon={<LuArrowRightCircle className="scale-[3.0] mx-auto stroke-1" />} link='/dashboard/campaigns/view' />
        </div>

    )
}

export default Campaign