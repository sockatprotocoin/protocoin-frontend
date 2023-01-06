import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Api from '../api/Api'
import './Blockchain.css'

function Blockchain() {
    const api = new Api();
    const [isFetching, setFetching] = useState(true)
    const [blocks, setBlocks] = useState([])
    const sidebarOpened = useSelector((state) => state.sidebarOpened)

    useEffect(() => {
        fetchBlockchain()
    })

    function fetchBlockchain() {
        api.getBlockchain()
            .then(response => {
                setBlocks(response.data)
                setFetching(false)
            })
            .catch(err => {
                console.log(err);
                setFetching(false)
            })
    }

    return (
        !isFetching ?
        <div className="container blockchain" style={{maxWidth: sidebarOpened ? 'calc(100vw - 350px)' : '100%'}}>
            <h1 className='blockchain'>Blockchain</h1>
            <div className='blocklist'>
                {blocks.map((block, blockIndex)  =>
                    <div key={blockIndex} className='block'>
                        <div className='blockHash tooltip highlight'>{block.blockHash}
                            <span className='tooltiptext'>block hash</span>
                            </div>
                        <div className='blockHeader highlight'>
                            {block.header.previousBlockHash}
                            {block.header.merkleRoot}
                            {block.header.timestamp}
                            {block.header.targetCompressed}
                            {block.header.nonce}
                        </div>
                        <div className='transactions'>
                            {block.blockTransactions.map((transaction, transactionIndex) =>
                                <div key={transactionIndex} className='transaction'>
                                    {transaction.transactionInputs.map(transactionInput =>
                                        <div className='transactionInput highlight'>
                                            {transactionInput.txid}
                                            {transactionInput.vout}
                                            {transactionInput.scriptSignature}
                                        </div>
                                    )}
                                    {transaction.transactionOutputs.map((transactionOutput, outputIndex) =>
                                        <div key={outputIndex} className='transactionOutput'>
                                            <div className='amount tooltip highlight'>{transactionOutput.amount}
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
        </div> : <></>
    )
}

export default Blockchain