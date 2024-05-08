'use client'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const CircularProgressBar = ({ progress }) => {
    return (
        <CircularProgressbarWithChildren
            value={32} styles={{
                root: {
                    transformOrigin: 'center center',
                },
                path: {
                    // Path color
                    stroke: `rgba(202, 232, 213, ${32 / 100})`,
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'butt',
                    // Customize transition animation
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                    // Rotate the path
                    transformOrigin: 'center center',
                },

            }}
        >
            <p className="text-2xl font-bold">₵ 4,321</p>
            <p>Campaign 2</p>
            <br></br>
            <p>32% to goal</p>
        </CircularProgressbarWithChildren>
    )
}

export default CircularProgressBar