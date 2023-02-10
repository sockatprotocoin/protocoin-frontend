import ContactsList from './ContactsList'
import UserInviter from './UserInviter';
import Invitations from './Invitations'

function Contacts() {
    return (
        <>
            <ContactsList/>
            <Invitations/>
            <UserInviter/>
        </>
    )
}

export default Contacts;