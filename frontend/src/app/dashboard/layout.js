import CustomSidebar from "../components/CustomSidebar"
import Navbar from "./_components/Navbar"
export default function DashboardLayout({
    children, // will be a page or nested layout
}) {
    return (
        <section className="flex flex-row bg-slate-800">
            {/* Include shared UI here e.g. a header or sidebar */}
            <CustomSidebar />
            <main className="flex-grow h-screen overflow-scroll relative rounded-tl-3xl rounded-bl-3xl bg-gradient-to-b from-slate-50 to-slate-300">
                <Navbar />
                {children}
            </main>


        </section>
    )
}