import React, { Component } from 'react'
import Api from '../api/Api'
import './NewTransaction.css'

class NewTransaction extends Component {
    api = new Api();

    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            isFetching: true,
            contacts: [],
            fee: 0,
            transactions : []
        };
    }

    componentDidMount() {
        this.fetchContacts()
        this.fetchBalance()
    }

    fetchContacts() {
        this.setState({ ...this.state, isFetching: true });
        this.api.getContacts()
            .then(response => {
                this.setState({
                    contacts: response.data,
                    transactions: response.data.length > 0 ? [{receiverWalletAddress: response.data[0].address}] : [],
                    isFetching: false
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({ ...this.state, isFetching: false });
            })
    }


    fetchBalance() {
        this.setState({ ...this.state, isFetching: true });
        this.api.getBalance()
            .then(response => {
                this.setState({...this.state, balance: response.data, isFetching: false})
            })
            .catch(err => {
                console.log(err);
                this.setState({ ...this.state, isFetching: false });
            })
    }


    addTransaction = () => {
        this.setState({
            ...this.state,
            transactions: [...this.state.transactions, {receiverWalletAddress: this.state.contacts[0].address}]
        })
    }

    handleSubmit = event => {
        this.sendTransaction()
    }

    sendTransaction() {
        this.api
        .postTransaction(this.state.fee, this.state.transactions)
        .then(response => {
            console.log(response.data)
        })
        .catch(err => {
            console.log(err);
        })
    }

    updateTransactionReceiverWalletAddress = (event, transactionIndex) => {
        let transactions = this.state.transactions;
        let transaction = transactions[transactionIndex];
        transaction.receiverWalletAddress = event.target.value;
        transactions[transactionIndex] = transaction;
        this.setState({...this.state, transactions: transactions});
    }

    updateTransactionAmount =  (event, transactionIndex) => {
        let transactions = this.state.transactions;
        let transaction = transactions[transactionIndex];
        transaction.amount = event.target.value;
        transactions[transactionIndex] = transaction;
        this.setState({...this.state, transactions: transactions});
    }
    
    deleteTransaction = (transactionIndex) => {
        let transactions = this.state.transactions;
        transactions.splice(transactionIndex, 1)
        this.setState({
            ...this.state,
            transactions: transactions
        });
    }

    updateFee = (e) => {
        this.setState({...this.state, fee: e.target.value});
    }

    getTransactionsInput = () => {
        return (
            Object.entries(this.state.transactions).map((entry, entryIndex) => 
                <tr key={entryIndex}>
                    <td>
                        <select className='form-element'
                            value={this.state.transactions[entry[0]].receiverWalletAddress} 
                            onChange={(event) => this.updateTransactionReceiverWalletAddress(event, entry[0])}
                            >
                            {this.state.contacts.map((contact, contactIndex) =>
                                <option key={contactIndex} style={{fontFamily: 'Noto Sans Mono, monospace'}} value={contact.address}>{contact.username}</option>
                            )}
                            </select>
                    </td>
                    <td>
                        <input placeholder='Amount' className='monetary-input form-element' type="number" value={this.state.transactions[entry[0]].amount} 
                            onChange={(event) => this.updateTransactionAmount(event, entry[0])}
                        />
                    </td>
                    <td>
                        <button className='delete button form-element' type='button' onClick={(event) => this.deleteTransaction(entry[0])}>Delete</button>
                    </td>
                </tr>        
            )
        )
    }

    render() {
        if (!this.state.isFetching) {
            return (
                <div className="container">
                    <h1 className='balance'>Balance: {this.state.balance} </h1>
                    <h1>New Transaction</h1>
                    <form onSubmit={this.handleSubmit}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Recipient</th>
                                    <th>Amount</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            <this.getTransactionsInput/>
                            <tr>
                                <td>Mining fee</td>
                                <td>
                                    <input type="number" className='monetary-input form-element' value={this.state.fee} onChange={this.updateFee}/>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <button className='button action form-element' type="button" onClick={this.addTransaction}>+</button>
                                </td>
                                <td></td>
                                <td>
                                    <input className='button confirm form-element' type="submit" value="Submit" />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            )
        }
    }
}

export default NewTransaction