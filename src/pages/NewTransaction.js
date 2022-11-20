import React, { Component } from 'react'
import Api from '../api/Api'

class NewTransaction extends Component {
    api = new Api();

    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            contacts: [],
            userId: 1,
            fee: 0,
            transactions : {}
        };
        this.state.transactions[0] = {receiverWalletAddress: '', amount: 0}
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

    handleSubmit = event => {
        this.sendTransaction()
      }

    sendTransaction(){
        this.api
        .postTransaction(this.state.userId, this.state.fee, this.state.transactions)
        .then(response => {
            console.log(response.data)
        })
        .catch(err => {
            console.log(err);
        })
    }

    getTransactionsInput = () => {
        return (
            Object.entries(this.state.transactions).map((entry) => 
                <div>
                    <label>
                        Recipient:
                        <select value={this.state.transactions[entry[0]].receiverWalletAddress} 
                            onChange={(e)=> {
                                let key = entry[0];
                                let transaction = entry[1];
                                let transactions = this.state.transactions;
                                transaction.receiverWalletAddress = e.target.value;
                                transactions[key] = transaction;
                                this.setState({...this.state,transactions: transactions});
                            }}>
                        {this.state.contacts.map(contact =>
                            <option value={contact.address}>{contact.username + " " + contact.email}</option>
                        )}
                        </select>
                    </label>
                    <label>
                        Amount:
                        <input type="text" value={this.state.transactions[entry[0]].amount} 
                            onChange={(e)=> {
                                let key = entry[0];
                                let transaction = entry[1];
                                let transactions = this.state.transactions;
                                transaction.amount = e.target.value;
                                transactions[key] = transaction;
                                this.setState({...this.state,transactions: transactions});
                            }}
                        />
                    </label>
                </div>        
            )
        )
    }

    render() {
        if(!this.state.isFetching){
            return (
                <div className="tile">
                    <h1>New Transaction</h1>
                    <form onSubmit={this.handleSubmit}>
                        <this.getTransactionsInput/>
                        <button type="button" onClick={(e)=>{
                            let transactionsCount = Object.keys(this.state.transactions).length;
                            console.log(transactionsCount)
                            let transactions = this.state.transactions;
                            transactions[transactionsCount] = {address:'', amount: 0}
                            this.setState({...this.state,transactions:transactions})
                            console.log(this.state.transactions)
                            }}>+</button>
                        <label>
                            Fee:
                            <input type="text" value={this.state.fee} onChange={
                                (e)=>{
                                    this.setState({...this.state, fee: e.target.value});
                                    console.log(this.state)
                                }
                        
                            }/>
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            )
        }
    }
}

export default NewTransaction