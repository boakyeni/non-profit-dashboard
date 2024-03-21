'use client'
import { useDispatch, useSelector } from "react-redux"
import { LuX } from "react-icons/lu"
import { toggleEmbedModal } from "../../../lib/features/dropdown/dropdownSlice"

const EmbedModal = () => {

    const { embedModalOpen } = useSelector((state) => state.dropdowns)
    const dispatch = useDispatch()
    return (
        <div className="w-full flex justify-around">
            <div className={`${embedModalOpen ? 'fixed inset-0 bg-black bg-opacity-50 z-40' : 'hidden'}`}></div>
            <div id="embedModal" tabIndex="-1" aria-hidden="true" className={`${embedModalOpen ? '' : 'hidden'} fixed max-sm:inset-0 z-50 items-center place-items-center justify-center p-4 h-max m-auto md:w-[90%]`}>
                <div className="relative w-full max-w-3xl mx-auto">
                    <div className="relative bg-white rounded-2xl shadow ">
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Embed Widget
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="editUserModal">
                                <LuX className="scale-[1.5] stroke-2" onClick={() => dispatch(toggleEmbedModal())} />
                            </button>

                        </div>
                        {/* // Modal Body */}
                        <div className="p-6 space-y-6 max-h-[calc(100vh-15rem)] overflow-auto">
                            <div className="flex flex-row justify-between">
                                <p>This will appear on your site</p>
                                {/* Remove magiv numbers replace with redux variable in campaignSlice */}
                                <p className="text-right">{450 - 20} characters left</p>
                            </div>
                            <iframe style={{ borderRadius: '12px' }} src="http://localhost:3000/embed/1" width="100%" height="352" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

                        </div>
                        <div className="flex flex-col">
                            <button className="mx-auto w-1/5 rounded-full float-right bg-blue-500 text-white py-2">Copy</button>

                            <div className="border-2 py-3 pl-2 m-3 rounded-2xl">
                                <p>{`<iframe style={{ borderRadius: '12px' }} src="http://localhost:3000/embed/1" width="100%" height="352" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`}</p>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmbedModal