import React, { Component } from 'react'
import Api from '../api/Api'

class ContactsList extends Component {
    api = new Api();

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            contacts: []
        }
    }

    componentDidMount() {
        this.fetchContacts();
    }

    fetchContacts() {
        this.setState({ ...this.state, isFetching: true });
        this.api.getContacts()
            .then(response => {
                this.setState({ contacts: response.data, isFetching: false })
            })
            .catch(err => {
                console.log(err);
                this.setState({ ...this.state, isFetching: false });
            })
    }

    render() {
        const deleteContact = (e, id) => {
            this.api.deleteContact(id).then(() => {
                this.setState({
                    ...this.state,
                    contacts: this.state.contacts.filter(contact => contact.id != id)
                })
            }).catch(err => console.log(err))
        }

        if(!this.state.isFetching){
            return (
                <div className="container container-50">
                    <h1>Contacts list</h1>
                    <table>
                        <tbody>
                            {this.state.contacts.length > 0 ? this.state.contacts.map(contact =>
                                <tr key={contact.id}>
                                    <td>
                                        {contact.username + " "}
                                    </td>
                                    <td>
                                        {contact.email}
                                    </td>
                                    <td>
                                        <button className='delete' onClick={(e) => deleteContact(e, contact.id)}>delete</button>
                                    </td>
                                </tr>
                            ) : "You have no contacts yet"}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default ContactsList;