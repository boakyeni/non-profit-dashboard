'use client'
import React from "react";
const Tag = (props) => {
    return (
        // <div className='tag'>
        <span className="bg-[#d7e1fe] w-fit px-2 rounded-lg mt-auto text-sm text-white h-5" style={{ backgroundColor: `${props?.color}` }}>
            {props?.tagName}
        </span>
        // </div>
    );
};

export default Tag;