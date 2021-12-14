"use strict";

import { web3, wallet, wallets, pvt } from './index';
import { createTx } from './utils/createTx';
import { approve } from './utils/approve';

const gao = async (wallet, pvt) => {
  try {
    const contractAddress = "0x3A5Ec4E77f1779901FA91dCD9e5Ad2418415f77e"
    const usdcAddress = "0xF886dDc935E8DA5Da26f58f5D266EFdfDA1AD260"
    const avaxAddress = "0xB86D8EFfcb020143abF8Baf8Ba0653bBb28bB2C0"

    console.log("Approve Token");
    const usdcAmount = await approve(usdcAddress, contractAddress, wallet, pvt);
    const avaxAmount = await approve(avaxAddress, contractAddress, wallet, pvt);

    console.log("Provide on Naughty Price Pool");
    const data = "0xe8e33700000000000000000000000000b86d8effcb020143abf8baf8ba0653bbb28bb2c0000000000000000000000000f886ddc935e8da5da26f58f5d266efdfda1ad2600000000000000000000000000000000000000000000001c564fb56a3f610bb8000000000000000000000000000000000000000000000043c33c1937564800000000000000000000000000000000000000000000000000071593ed5a8fd85b58000000000000000000000000000000000000000000000010f0cf064dd592000000000000000000000000000008a3522c8c11231b2923642d39d84badee511d0d90000000000000000000000000000000000000000000000000000000061b8d274"

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
    console.log("failured in f5")
    console.log(error)
  }
}

gao(wallet, pvt)