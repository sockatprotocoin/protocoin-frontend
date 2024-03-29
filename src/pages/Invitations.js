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
                {this.state.invitations.length > 0 ?
                    <table>
                        <tbody>
                            {this.state.invitations.map(invitation => 
                                <tr key={invitation.inviter.id}>
                                    <td className='form-element'>
                                        {invitation.inviter.username + " "}
                                    </td>
                                    <td className='form-element'>
                                        {invitation.inviter.email}
                                    </td>
                                    <td className='form-element'>
                                        <button className='action' onClick={(e) => this.acceptInvitation(e, invitation.id)}>✔</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                : "You have no penidng invitations"}
            </div> 
        )
    }
}

export default Invitation