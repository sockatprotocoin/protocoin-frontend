import React, { useEffect, useState } from 'react'
import Api from '../api/Api'
import './TransactionHistory.css'

function TransactionHistory() {
    const api = new Api();
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        fetchTransactionHistory()
    }, [])

    function fetchTransactionHistory() {
        api.getTransactionHistory()
            .then(response => {
                setTransactions(response.data.reverse())
            })
            .catch(err => console.log(err))
    }

    return(
        <div className='container'>
            <h1>Transaction History</h1>
            {transactions.length > 0 ? 
                <table>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Recipient</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, transactionIndex) => 
                            <>
                                <tr key={transactionIndex}>
                                    <td className='transaction-number'>#{transactionIndex}</td>
                                </tr>
                                {transaction.transactionRecords.map((record, recordIndex) => {
                                const isIncome = transaction.transactionType == "INCOME";
                                    return (
                                        <tr key={recordIndex}>
                                            <td className={transaction.transactionType.toLowerCase() + ' history-cell'}>
                                                {isIncome ? "+" : "-"}{record.amount}
                                            </td>
                                            <td className='history-cell'>
                                                {isIncome ? "You" : record.recipient.username}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </>
                        )}
                    </tbody>
                </table>
            : "You have no transactions yet"}
        </div>
    )
}

export default TransactionHistory