import React, { Component } from 'react'
import Api from '../api/Api'
import './Blockchain.css'

class Blockchain extends Component {
    api = new Api();

    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            blocks: []
        }
    }

    componentDidMount() {
        this.fetchBlockchain();
    }

    fetchBlockchain() {
        this.setState({ ...this.state, isFetching: true });
        this.api.getBlockchain()
            .then(response => {
                console.log(response.data)
                this.setState({ blocks: response.data, isFetching: false })
            })
            .catch(err => {
                console.log(err);
                this.setState({ ...this.state, isFetching: false });
            })
    }

    render() {
        if (!this.state.isFetching) {
            return (
            <div className="tile">
                <h1>Blockchain</h1>
                <div className='blockchain'>
                    {this.state.blocks.map(block =>
                        <div className='block'>
                            <div className='blockHash tooltip'>{block.blockHash}
                                <span className='tooltiptext'>block hash</span>
                                </div>
                            <div className='blockHeader'>
                                {block.header.previousBlockHash}
                                {block.header.merkleRoot}
                                {block.header.timestamp}
                                {block.header.targetCompressed}
                                {block.header.nonce}
                            </div>
                            <div className='transactions'>
                                {block.blockTransactions.map(transaction =>
                                    <div className='transaction'>
                                        {transaction.transactionInputs.map(transactionInput =>
                                            <div className='transactionInput'>
                                                {transactionInput.txid}
                                                {transactionInput.vout}
                                                {transactionInput.scriptSignature}
                                            </div>
                                        )}
                                        {transaction.transactionOutputs.map(transactionOutput =>
                                            <div className='transactionOutput'>
                                                <div className='amount tooltip'>{transactionOutput.amount}
                                                    <span className='tooltiptext'>amount: {parseInt(transactionOutput.amount, 16) / 100000000}🥫</span>
                                                </div>
                                                {transactionOutput.amount}
                                                {transactionOutput.scriptSize}
                                                {transactionOutput.script}
                                                {transactionOutput.parent}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            )
        }
    }
}

export default Blockchain