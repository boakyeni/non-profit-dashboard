'use client'
import Link from "next/link"

const CustomSidebarLink = ({ title, icon, href }) => {
    return (
        <div className="hover:bg-black hover:bg-opacity-25 px-6">
            <Link href={href} className="text-white">
                <div className="flex flex-row place-items-center py-3">
                    {icon}
                    <p className="pl-3 text-lg font-bold">{title}</p>
                </div>
            </Link>
        </div>
    )
}

export default CustomSidebarLink