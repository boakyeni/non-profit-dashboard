'use client'
import CampaignsTable from "../components/CampaignsTable"
const ViewCampaigns = () => {
    return (
        <div className="flex flex-row w-full justify-around lg:gap-4 lg:px-8">
            <CampaignsTable itemsPerPage={10} />
        </div>
    )
}

export default ViewCampaigns