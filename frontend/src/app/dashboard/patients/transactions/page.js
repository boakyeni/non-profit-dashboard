'use client'

import ContactCard from "../../_components/ContactCard"
import ContactModal from "../../_components/ContactModal"
import DeleteContactConfirm from "../../_components/DeleteContactConfirm"
import PatientSortOrFilter from "../../_components/PatientSortOrFilter"
import TrackFundsModal from "../../_components/TrackFundsModal"
import PatientTransactionsTable from "../../_components/TransactionsTable"

const PatientTransactionsPage = () => {
    return (
        <div className="flex flex-row w-full justify-around lg:gap-4 lg:px-8">
            <PatientTransactionsTable itemsPerPage={10} />
            <ContactCard />
            <PatientSortOrFilter />
            <TrackFundsModal />
            <ContactModal />
            <DeleteContactConfirm />
        </div>
    )
}

export default PatientTransactionsPage