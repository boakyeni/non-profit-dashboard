'use client'
import { LuAlignLeft } from "react-icons/lu";
import { LuUserSquare2 } from "react-icons/lu";
import AccountDropdown from "./AccountDropdown";
import { useDispatch, useSelector } from "react-redux";
import { toggleAccountDropdown } from "../../lib/features/dropdown/dropdownSlice";
import { toggleSidebar } from "../../lib/features/dropdown/dropdownSlice";
import useOutsideClickHandler from "../../../utils/useOutsideClickHandler";
import { useRef } from "react";
const Navbar = () => {
    const dispatch = useDispatch()

    const { sidebarOpen, accountDropdownOpen } = useSelector((state) => state.dropdowns)

    const accountDropdownRef = useRef(null)

    useOutsideClickHandler(accountDropdownRef, accountDropdownOpen, () => dispatch(toggleAccountDropdown()))

    return (

        <>
            <nav className="flex flex-row justify-around items-center py-2 rounded-tl-3xl h-[70px] sticky top-0 z-20 bg-slate-100 border-b">
                <LuAlignLeft className="lg:hidden scale-[2] stroke-1 cursor-pointer" onClick={() => dispatch(toggleSidebar())} />
                <div className="w-1/2 ml-3">

                    <input
                        type="text"
                        className="w-full bg-white text-slate-900 px-4 py-2 border rounded-full"
                        placeholder="Search..."
                    />
                </div>

                <div ref={accountDropdownRef} className="flex items-center relative cursor-pointer">
                    <LuUserSquare2 className="scale-[2.0] stroke-1 z-50" onClick={() => dispatch(toggleAccountDropdown())} />
                    <AccountDropdown />
                </div>



            </nav>
        </>
    );
};

export default Navbar;