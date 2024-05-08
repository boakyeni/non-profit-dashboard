'use client'
import React, { useRef, useContext, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { ScrollContext } from '../../utils/scroll-observer';
import Link from 'next/link';
import Navbar from './Navbar';



const Masthead = () => {

    const [imageLoaded, setImageLoaded] = useState(false)
    const refContainer = useRef(null)
    const { scrollY } = useContext(ScrollContext)

    let progress = 0;

    const { current: elContainer } = refContainer
    if (elContainer) {
        progress = Math.min(1, scrollY / elContainer.clientHeight)
    }

    const handleImageLoaded = useCallback(() => {
        setImageLoaded(true)
    }, [])


    return (
        <div ref={refContainer} className=' min-h-screen flex flex-col  justify-between sticky top-10 -z-10 bg-white'
            style={{
                transform: `translateY(-${progress * 20}vh)`
            }
            }
        >
            <div>

            </div>
            <div className='flex flex-row justify-around'>
                <div className='md:w-1/2 p-12  z-10 text-[#3f4f64] flex items-start justify-center flex-col'>
                    <h1 className='mb-6 text-4xl xl:text-5xl font-bold' >Bsystems NGO Platform</h1>
                    <h2 className='mb-2 text-2xl xl:text-3xl tracking-tight'>
                        <span>Empower Your NGO with Advanced Analytics and Donor Connectivity</span> <span></span>
                    </h2>
                </div>
                <div className='overflow-visible'>
                    Landing Image
                </div>
            </div>



            <div className={` mx-auto flex-grow-0 pb-40 md:pb-28 transition-all duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0 -translate-y-10'}`}>
                <Image className="invert-[.75]" src='/assets/scrollDown.png' width={188 / 3} height={105 / 3} alt='scroll down' onLoad={handleImageLoaded} ></Image>
            </div>
        </div >

    )

}

export default Masthead