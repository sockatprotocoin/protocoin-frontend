import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Api from '../api/Api'
import './Blockchain.css'

function Blockchain() {
    const api = new Api();
    const [isFetching, setFetching] = useState(true)
    const [blocks, setBlocks] = useState([])
    const sidebarOpened = useSelector((state) => state.sidebarOpened)
    const [mode, setMode] = useState("normal")

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
            <button className='investigate' onClick={e=> mode === 'normal' ? setMode("investigate") : setMode("normal")  }>{mode === 'normal' ? 'INVESTIGATE' : 'MINIMIZE'} </button>
            <div className='blocklist'>
                {blocks.map((block, blockIndex)  =>
                    <div key={blockIndex} className='block'>
                        <div className={mode == 'investigate' ? 'blockHash blockElement' :'blockComponent'}>
                        {mode == 'investigate' ? <div><p className='blockElementTitle'>BLOCK HASH </p></div> : <div></div>}
                            <div className='blockHash tooltip highlight'>
                                {block.blockHash}
                                <span className='tooltiptext'>block hash</span>
                            </div>
                        </div>
                        <div className={mode == 'investigate' ?'blockHeader blockElement': 'blockComponent'}>
                        {mode == 'investigate' ? <div><p className='blockElementTitle'>BLOCK HEADER </p></div> : <div></div>}
                            <div className='prevBlockHash tooltip highlight'>
                                {block.header.previousBlockHash}
                                <span className='tooltiptext'>previous block hash</span>
                            </div>
                            <div className='timestamp tooltip highlight'>{block.header.timestamp}
                                <span className='tooltiptext'>timestamp</span>
                            </div>
                            <div className='targetCompressed tooltip highlight'>{block.header.targetCompressed}
                                <span className='tooltiptext'>targetCompressed</span>
                            </div>
                            <div className='nonce tooltip highlight'>{block.header.nonce}
                                <span className='tooltiptext'>nonce</span>
                            </div>
                       </div >
                        <div className={mode == 'investigate' ? 'transactions' :'blockComponent'}>
                            {block.blockTransactions.map((transaction, transactionIndex) =>
                                <div key={transactionIndex} className={mode == 'investigate' ? 'transaction blockElement' : ''}>
                                    {mode == 'investigate' ? <div><p className='blockElementTitle'>TRANSACTION</p></div> : <div></div>}
                                    <div className='txid tooltip highlight'>{transaction.txId}
                                        <span className='tooltiptext'>transaction id</span>
                                    </div>
                                    {transaction.transactionInputs.map((transactionInput,transactionInputIndex) =>
                                        <div className={mode == 'investigate' ?'transactionInput transactionElement' : ''}>
                                            {mode == 'investigate' ? <div><p className='blockElementTitle'>TRANSACTION INPUT</p></div> : <div></div>}

                                            <div className='txid tooltip highlight'>{transactionInput.txid}
                                                <span className='tooltiptext'>transaction id for input</span>
                                            </div>
                                            <div className='vout tooltip highlight'>{transactionInput.vout}
                                                <span className='tooltiptext'>vout</span>
                                            </div>
                                            <div className='scriptSignature tooltip highlight'>{transactionInput.scriptSignature}
                                                <span className='tooltiptext'>scriptSignature</span>
                                            </div>
                                        </div>
                                    )}
                                    {transaction.transactionOutputs.map((transactionOutput, outputIndex) =>
                                        <div key={outputIndex} className={mode == 'investigate' ?'transactionOutput transactionElement':''}>
                                            {mode == 'investigate' ? <div><p className='blockElementTitle'>TRANSACTION OUTPUT</p></div> : <div></div>}
                                            <div className='amount tooltip highlight'>{transactionOutput.amount}
                                                <span className='tooltiptext'>amount: {parseInt(transactionOutput.amount, 16) / 100000000}🥫</span>
                                            </div>
                                            <div className='scriptSize tooltip highlight'>{transactionOutput.scriptSize}
                                                <span className='tooltiptext'>scriptSize</span>
                                            </div>
                                            <div className='script tooltip highlight'>{transactionOutput.script}
                                                <span className='tooltiptext'>script</span>
                                            </div>
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