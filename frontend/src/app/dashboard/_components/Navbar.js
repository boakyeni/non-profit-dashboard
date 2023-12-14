'use client'
import { LuAlignLeft } from "react-icons/lu";
import { LuUserSquare2 } from "react-icons/lu";

const Navbar = () => {
    return (
        <>
            <nav className="flex flex-row justify-around items-center py-2 rounded-tl-3xl">
                <LuAlignLeft className="lg:hidden scale-[2] stroke-1" />
                <div className="w-1/2 ml-3">

                    <input
                        type="text"
                        className="w-full bg-white text-slate-900 px-4 py-2 border rounded-full"
                        placeholder="Search..."
                    />
                </div>
                <div className="flex items-center">
                    <LuUserSquare2 className="scale-[2.0] stroke-1" />
                </div>
            </nav>
        </>
    );
};

export default Navbar;