import React, { Component } from 'react'
import Api from '../api/Api'
import './ContactList.css'

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
        this.api.getContacts(1)
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

        return (
            <div className="tile">
                <h1>Contacts list</h1>
                <ul>
                    {this.state.contacts.map(contact =>
                        <ol key={contact.user.id}>
                            {contact.user.username + " "}
                            {contact.user.email}
                            <button onClick={(e) => deleteContact(e, contact.id)}>delete</button>
                        </ol>
                    )}
                </ul>
            </div>
        )
    }
}

export default ContactsList;