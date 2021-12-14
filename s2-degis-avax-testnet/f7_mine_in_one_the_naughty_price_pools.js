"use strict";

import { web3, wallet, wallets, pvt } from './index';
import { createTx } from './utils/createTx';
import { approve } from './utils/approve';

const gao = async (wallet, pvt) => {
  try {
    const contractAddress = "0x7C824EC3eff695ffbBBb44410144fDeB00862A69"
    const nlpAddress = "0xdb6F149FC1ae56DB2b565C88a58da7f4284A65d4"

    console.log("Approve Token")
    let nlpAmount = await approve(nlpAddress, contractAddress, wallet, pvt);

    console.log("Deposit NLP to mine")
    const data = "0x7b0472f0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000006c6b935b8bbd400000"
    
    const txCount = await web3.eth.getTransactionCount(wallet);
    const txObj = {
      chainId: 43113,
			nonce: web3.utils.toHex(txCount),
			gasLimit: web3.utils.toHex(100000 * 1.5),
			gasPrice: web3.utils.toHex(web3.utils.toWei('55', 'gwei')),
			to: contractAddress,
			data: data
    }
    const raw = createTx(txObj, pvt);
    const txHash = await web3.eth.sendSignedTransaction(raw);

    console.log(`[ACCOUNT] ${wallet}`)
		console.log(`[OK] SCAN URL: https://testnet.avascan.info/blockchain/c/tx/${txHash.transactionHash}`)
  } catch (error) {
    console.log("failured in f7")
    console.log(error)
  }
}

gao(wallet, pvt)