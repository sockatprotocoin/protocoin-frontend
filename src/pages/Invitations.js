import React, { Component } from 'react'
import Api from '../api/Api'

class Invitation extends Component {
    api = new Api();

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            invitations: []
        }
    }

    componentDidMount() {
        this.fetchInvitations();
    }

    fetchInvitations() {
        this.api.getInvitations()
            .then(response => {
                console.log(response.data)
                this.setState({ invitations: response.data, isFetching: false })
            })
            .catch(err => {
                console.log(err);
                this.setState({ ...this.state, isFetching: false });
            })
    }

    acceptInvitation(e, invitationId) {
        this.api.acceptInvitation(invitationId)
            .then(response => {
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className="container container-50">
                <h1>Invitations</h1>
                <table>
                    <tbody>
                        {this.state.invitations.map(invitation => {
                            const inviter = invitation.inviter
                            return (
                                <tr key={inviter.id}>
                                    <td>
                                        {inviter.username + " "}
                                    </td>
                                    <td>
                                        {inviter.email}
                                    </td>
                                    <td>
                                        <button className='add' onClick={(e) => this.acceptInvitation(e, invitation.id)}>✔</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Invitation