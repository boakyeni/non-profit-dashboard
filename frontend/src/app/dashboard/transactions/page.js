'use client'
import { useSearchParams } from "next/navigation"
import TransactionsDataTable from "../_components/TransactionsDataTable"


const TransactionsPage = () => {
    return (
        <div className="flex flex-row w-full justify-around lg:gap-4 lg:px-8">
            <TransactionsDataTable itemsPerPage={10} />
        </div>
    )
}

export default TransactionsPage