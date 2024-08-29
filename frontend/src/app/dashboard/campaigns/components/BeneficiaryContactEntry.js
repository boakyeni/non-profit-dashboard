'use client'
import { LuArrowUp, LuX } from "react-icons/lu"

const BeneficiaryContactEntry = ({ contact, index, onPrimaryChange, onRemove, onInputChange }) => {
    return (
        <div className="flex flex-col 2xl:flex-row max-2xl:space-y-6 2xl:space-x-4 max-2xl:pb-6  border-b border-b-zinc-300">
            <div className="2xl:hidden">
                <LuX className="hover:cursor-pointer float-right" onClick={onRemove} />
            </div>
            <div className="">
                <label htmlFor="phone_name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                <input type="text" name="department" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Contact 1" required="" id={`name_${index}`} value={contact.name} onChange={(e) => onInputChange(index, 'name', e.target.value)} />
                <div className="flex items-center pt-1.5 pl-1 mt-6">
                    <label htmlFor="primary_contact" className="" />
                    <input
                        type="radio"
                        name="primary_contact"
                        checked={contact.primary_contact}
                        onChange={() => onPrimaryChange(index)}
                    />
                    <span className="text-sm text-gray-700 pl-2 flex flex-row items-center">Primary Contact <LuArrowUp className="ml-2" /> </span>

                </div>
            </div>

            <div className="">
                <label htmlFor="phone-number" className="block mb-2 text-sm font-medium text-gray-900 ">Phone Number</label>
                <input type="tel" name="phone-number" id={`phoneNumber_${index}`} value={contact.number} onChange={(e) => onInputChange(index, 'number', e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="e.g. +(12)3456 789" required="" />
            </div>

            <div>
                <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900">Notes</label>
                <textarea
                    id={`notes_${index}`}
                    value={contact.notes}
                    onChange={(e) => onInputChange(index, 'notes', e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    placeholder="Additional notes"
                    style={{ minHeight: '50px' }}
                />
            </div>
            <div>
                <LuX className="max-2xl:hidden hover:cursor-pointer float-right" onClick={onRemove} />
            </div>
        </div>
    )
}

export default BeneficiaryContactEntry