
"use strict";

import { web3 } from './index';
import { wallets, wallet, pvt } from './index';
import { createTx } from './utils/createTx';
import Tx from 'ethereumjs-tx';
import { approve } from './utils/approve';

// const wallet = wallets[1].address;
// const pvt = wallets[1].address;

console.log(wallet)

const abi = require('./abi/mock_usd.json');

const contractAddress = "0xF886dDc935E8DA5Da26f58f5D266EFdfDA1AD260"

const contract = new web3.eth.Contract(
    abi,
    contractAddress
)

let amount = new web3.utils.toBN("0x152d02c7e14af6000000");
const data = contract.methods.mint(wallet, amount).encodeABI();



async function gao(wallet, pvt) {

    try {
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

        // 授权

        const contracts = [
            "0xfAa5961cE2090C7cc5602AA7bDA75401bD47fB32",
            "0x556b49d67d0a02aab02a61004aad2e9d363f1ebd",
            "0x3A5Ec4E77f1779901FA91dCD9e5Ad2418415f77e",
            "0x7C824EC3eff695ffbBBb44410144fDeB00862A69",
            "0xdaDBED62C861F036f9214D75491216557d806d0F",
            "0x904C30be1D840334B346E13DA4Cb93f5D8277358",
        ]
    
        const usdcAddress = "0xF886dDc935E8DA5Da26f58f5D266EFdfDA1AD260"
        const token2Address = "0xB86D8EFfcb020143abF8Baf8Ba0653bBb28bB2C0"
        const dlpAddress = "0x904C30be1D840334B346E13DA4Cb93f5D8277358"
        const nlpAddress = "0xdb6F149FC1ae56DB2b565C88a58da7f4284A65d4"
        const dbtAddress = "0x0944729C5125576a7DB450F7F730dC5A2a1E1359"
    
        const tokens = [
            usdcAddress,
            token2Address,
            dlpAddress,
            nlpAddress,
            dbtAddress
        ]
    
        for (const cc of contracts) {
            for (const tt of tokens) {
                await approve(tt, cc, wallet, pvt)
            }
        }
    } catch (error) {
        console.log("fail")
        console.log(error)
    }
    
}

gao(wallet, pvt);

