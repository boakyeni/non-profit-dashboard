'use client'
import Link from "next/link"
import Image from "next/image"

const ContactFooter = () => (
    <footer className="font-Montserrat font-extralight flex flex-col gap-8 items-center justify-between text-black px-16 border-t py-5 bg-white">
        {/* <Image src='/assets/logo.svg' width={18} height={18} alt="logo"/> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between items-center gap-8 w-full">
            <div>
                <Image src='/assets/bsystems_logo.png' width={100} height={100} alt="Bsystems' Logo" className=" h-auto w-auto" />
            </div>
            <div className="flex flex-col place-items-start h-40 ">
                <h2 className="font-Montserrat pb-6 text-sm font-bold text-xs tracking-[0.1em] font-extralight">ABOUT US</h2>
                <h3 className="text-sm">Address</h3>
                <p className="text-zinc-400 text-xs sm:text-sm sm:pr-16 leading-relaxed flex flex-col"><span>6 Eseefoo St.</span> Asylum Down, Accra, Ghana </p>
                <h3 className="text-sm">Phone</h3>
                <p className="text-zinc-400 text-xs sm:text-sm sm:pr-16 leading-relaxed flex flex-col">Sales: 233(0)302 254340</p>

            </div>
            <div className="flex flex-col gap-4 h-40">
                <h2 className=" font-Montserrat pb-2 text-sm text-xs tracking-[0.1em] font-extralight">FOOTER MENU</h2>
                <Link href="/terms" className="text-zinc-400 text-sm">Terms</Link>
                <Link href="/privacy_policy" className="text-zinc-400 text-sm">Privacy Policy</Link>
            </div>
            <div className="flex flex-col gap-4 h-40">
                <h2 className="font-Montserrat pb-6 text-sm font-bold text-xs tracking-[0.1em] font-extralight">Get Connected</h2>
            </div>
        </div>

    </footer>
)
export default ContactFooter