"use strict";

import { web3, wallet, wallets, pvt } from './index';
import { createTx } from './utils/createTx';
import { approve } from './utils/approve';

const gao = async (wallet, pvt) => {
  try {
    const contractAddress = "0xdaDBED62C861F036f9214D75491216557d806d0F"
    const dbtAddress = "0x0944729C5125576a7DB450F7F730dC5A2a1E1359"

    console.log("Approve Token")
    const dbtAmount = await approve(dbtAddress, contractAddress, wallet, pvt);

    console.log("Deposit DBT to mine")
    const data = "0x88a11d1400000000000000000000000000000000000000000000001b1ae4d6e2ef500000"
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
    console.log("failured in f8")
    console.log(error)
  }
}

gao(wallet, pvt)