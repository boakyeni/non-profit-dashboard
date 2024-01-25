'use client'
import Image from "next/image"
import Link from "next/link"
const LoginPage = () => {

    return (
        <div className="h-screen flex place-items-center bg-slate-100">

            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-2xl shadow-2xl lg:max-w-4xl">

                <div className="hidden bg-cover lg:block lg:w-1/2 text-2xl my-auto pl-10" >
                    <h2 className="font-bold">No need for another account</h2>
                    <p>Login as you would with any Bsystems Account</p>
                </div>

                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                    <div className="flex justify-center mx-auto">
                        <Image width={50} height={50} className="w-auto h-7 sm:h-8" src="/assets/bsystems_logo.png" alt="" />
                    </div>

                    <p className="mt-3 text-xl text-center text-gray-600">
                        Welcome back!
                    </p>



                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                        <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">login
                            with email</a>

                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                    </div>

                    <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="LoggingEmailAddress">Email Address</label>
                        <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" />
                    </div>

                    <div className="mt-4">
                        <div className="flex justify-between">
                            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="loggingPassword">Password</label>
                            <a href="#" className="text-xs text-gray-500 dark:text-gray-300 hover:underline">Forgot Password?</a>
                        </div>

                        <input id="loggingPassword" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" />
                    </div>

                    <div className="mt-6">
                        <Link href={'/dashboard'}>
                            {/* Remove link, this needs toast and checks and then redirect*/}
                            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-slate-700 rounded-lg hover:bg-[#fe0304] focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                Sign In
                            </button>
                        </Link>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                        <a href="/auth/register/" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">Don't have a Bsystems Account? Register Here</a>

                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LoginPage