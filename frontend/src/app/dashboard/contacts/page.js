
import ContactCard from "../_components/ContactCard"
import ContactsTable from "../_components/ContactsTable"
import ContactModal from "../_components/ContactModal"
import DeleteContactConfirm from "../_components/DeleteContactConfirm"
const ContactPage = () => {
    return (
        <div className="flex flex-row w-full justify-around lg:gap-4 lg:px-8">
            <ContactsTable itemsPerPage={10} />
            <ContactCard />
            <ContactModal />
            <DeleteContactConfirm />
        </div>
    )
}

export default ContactPage