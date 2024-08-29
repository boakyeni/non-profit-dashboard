'use client'

import CauseModal from "../../_components/CauseModal"
import ContactCard from "../../_components/ContactCard"
import ContactModal from "../../_components/ContactModal"
import DeleteContactConfirm from "../../_components/DeleteContactConfirm"
import PatientSortOrFilter from "../../_components/PatientSortOrFilter"
import TrackFundsModal from "../../_components/TrackFundsModal"
import PatientTransactionsTable from "../../_components/TransactionsTable"
import AddPatientsModal from "../../campaigns/components/AddPatientsModal"

const PatientTransactionsPage = () => {
    return (
        <div className="flex flex-row w-full justify-around lg:gap-4 lg:px-8">
            <PatientTransactionsTable itemsPerPage={10} />
            <AddPatientsModal />
            <ContactCard />
            <PatientSortOrFilter />
            <TrackFundsModal />
            <ContactModal />
            <DeleteContactConfirm />
            <CauseModal />
        </div>
    )
}

export default PatientTransactionsPage