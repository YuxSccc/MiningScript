
"use strict";

import { web3, wallet, wallets, pvt } from './index';
import { createTx } from './utils/createTx';
import Tx from 'ethereumjs-tx';
import { approve } from './utils/approve';

const abi = require('./abi/mock_usd.json');

const contractAddress = "0xF886dDc935E8DA5Da26f58f5D266EFdfDA1AD260"

const contract = new web3.eth.Contract(
    abi,
    contractAddress
)

// {
//     "type": "CALL",
//     "from": "0x97aa098205cc4f50eeb2cdbfa095f4ab239fd82b",
//     "to": "0xf886ddc935e8da5da26f58f5d266efdfda1ad260",
//     "value": "0x0",
//     "gas": "0xa1dd",
//     "gasUsed": "0x4fb6",
//     "input": "0x40c10f1900000000000000000000000097aa098205cc4f50eeb2cdbfa095f4ab239fd82b00000000000000000000000000000000000000000000021e19e0c9bab2400000",
//     "output": "0x"
//   }

let amount = new web3.utils.toBN("0x152d02c7e14af6000000");
const data = contract.methods.mint(wallet, amount).encodeABI();

console.log(wallet, amount.toString())

// for (let i = 0; i < wallets.length(); ++ i) {
//     const wallet = wallets[i]['address'];
//     const pvt = wallets[i]['pvt'];
// }

gao(wallet, pvt);

async function gao(wallet, pvt) {
    const txCount = await web3.eth.getTransactionCount(wallet)
    //10828000000000000basetcro
    //108280000000000000basetcro
    //create transaction object
    const usePvt = Buffer.from(pvt, 'hex');
    const gasLimit = await contract.methods.mint(wallet, amount).estimateGas({from: wallet})

    console.log(gasLimit)

    const txObject = {
        chainId: 43113,
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(gasLimit * 2),
        gasPrice: web3.utils.toHex(web3.utils.toWei('50', 'gwei')),
        to: contractAddress,
        data: data
    }

    //sign the transaction
    const tx = new Tx(txObject);
    tx.sign(usePvt);
    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    // Broodcast the transaction
    const txHash = await web3.eth.sendSignedTransaction(raw)
    console.log(txHash.transactionHash);
    console.log(`https://testnet.avascan.info/blockchain/c/tx/${txHash.transactionHash}`)
    // web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    //     if (err) {
    //         console.log(`[Failured] ${wallet}`);
    //         console.log(err)
    //     } else {
    //         console.log(`[ACCOUNT] ${wallet}`)
    //         console.log(`[OK] SCAN URL: https://testnet.avascan.info/blockchain/c/tx/${txHash}`)
    //     }
    // }) 
}



