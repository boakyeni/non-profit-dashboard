'use client'
import { useState, useCallback } from "react";

import Image from "next/image";
import Link from "next/link";
import { LuAlignJustify } from "react-icons/lu";


const Navbar = () => {

    return (
        <>
            <nav className="flex flex-row justify-around items-center py-2 bg-white sticky top-0 z-50 w-full">
                <div>
                    <Image src='/assets/bsystems_logo.png' width={100} height={100} alt="Bsystems' Logo" className=" h-auto w-auto" />
                </div>
                <div className=" max-lg:hidden flex flex-row justify-between space-x-10 place-items-center">
                    <div>
                        Product
                    </div>
                    <div>
                        Resources
                    </div>
                    <div>
                        About
                    </div>
                    <div>
                        Contact
                    </div>
                    <Link href="/auth/login">
                        <button className=" bg-[#fe0304] p-3 rounded-2xl text-white drop-shadow-xl ">
                            Start Here
                        </button>
                    </Link>
                </div>
                <LuAlignJustify className="lg:hidden scale-[2.0] stroke-1 mt-3" />
            </nav>
        </>
    );
};

export default Navbar;