'use client'
import Link from "next/link"

const CustomSidebarLink = ({ title, icon, href }) => {
    return (
        <>
            <Link href={href} className="text-white">
                <div className="flex flex-row place-items-center py-3">
                    {icon}
                    <p className="pl-3 text-lg font-bold">{title}</p>
                </div>
            </Link>
        </>
    )
}

export default CustomSidebarLink