import React, { Component } from 'react'
import Api from '../api/Api'

class UserInviter extends Component {
    api = new Api();

    constructor(props) {
        super(props);
        this.state = {
            searchText: undefined,
            timeout: undefined,
            searchedUsers: [],
            invitedUsersIds: []
        }
    }

    search = event => {
        const searchText = event.target.value;

        if (this.state.timeout) {
            clearTimeout(this.state.timeout)
        }
        
        this.setState({
            ...this.state,
            searchText: searchText,
            timeout: setTimeout(() => {
                if (searchText) {
                    this.api.getUsersFiltered(searchText)
                    .then(response => {
                        this.setState({
                            ...this.state,
                            searchedUsers: response.data
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
                } else {
                    this.setState({
                        ...this.state,
                        searchedUsers: []
                    })
                }
            }, 400)
        });
    }

    inviteUser = (event, userId) => {
        const alreadyInvited = this.state.invitedUsersIds;
        this.api
        .inviteUser(userId)
        .then(response => {
            this.setState({...this.state, invitedUsersIds: alreadyInvited.push(userId)})
            console.log(this.state)
            console.log(response.data)
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className='container container-50'>
                <h1>Invite user</h1>
                <input className='form-element' onChange={this.search} placeholder="Start typing to search for users.."></input>
                <table>
                    <tbody>
                        {this.state.searchedUsers.map(user =>
                            <tr key={user.id}>
                                <td>
                                    {user.username + " "}
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    <button className='action' onClick={(e) => this.inviteUser(e, user.id)}>+</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UserInviter;