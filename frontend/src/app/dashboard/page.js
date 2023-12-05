'use client'

import CustomSidebar from '../components/CustomSidebar'
import Navbar from '../components/Navbar'
import Charts from '../components/Charts'



const Dashboard = () => {


    return (
        <>
            <div className="flex flex-row bg-[#f1f5f9]">
                <CustomSidebar />
                <main className="flex-grow sm:ml-6 h-screen overflow-scroll relative">
                    <Navbar />
                    <Charts />
                    <Charts />
                </main>
            </div>
        </>
    )
}


export default Dashboard