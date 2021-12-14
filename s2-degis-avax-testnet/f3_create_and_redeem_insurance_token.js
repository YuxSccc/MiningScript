"use strict";

import { web3, wallet, wallets, pvt } from './index';
import { createTx } from './utils/createTx';
import { approve } from './utils/approve';

const gao = async (wallet, pvt) => {
  try {
    const contractAddress = "0x556b49d67d0a02aab02a61004aad2e9d363f1ebd";
    const tokenAddress = "0xF886dDc935E8DA5Da26f58f5D266EFdfDA1AD260";

    // 授权
    const amount = await approve(tokenAddress, contractAddress, wallet, pvt);

    // 购入期权
    console.log("Create Naughty Price")
    /// 2w 颗 usdc
    const data = "0x2a48ac9a0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000f886ddc935e8da5da26f58f5d266efdfda1ad26000000000000000000000000000000000000000000000043c33c19375648000000000000000000000000000000000000000000000000000000000000000000010415641585f3130365f485f323131323200000000000000000000000000000000"
    
    const txCount = await web3.eth.getTransactionCount(wallet);
    
    const txObj = {
      chainId: 43113,
			nonce: web3.utils.toHex(txCount),
			gasLimit: web3.utils.toHex(60000 * 1.5),
			gasPrice: web3.utils.toHex(web3.utils.toWei('55', 'gwei')),
			to: contractAddress,
			data: data
    }
    
    const raw = createTx(txObj, pvt);

		/// broodcast
		const txHash = await web3.eth.sendSignedTransaction(raw)

		console.log(`[ACCOUNT] ${wallet}`)
		console.log(`[OK] SCAN URL: https://testnet.avascan.info/blockchain/c/tx/${txHash.blockHash}`)

    // reedom
    /// reedom 500 usdc
    const data2 = "0x7336c38d0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000f886ddc935e8da5da26f58f5d266efdfda1ad26000000000000000000000000000000000000000000000001b1ae4d6e2ef5000000000000000000000000000000000000000000000000000000000000000000010415641585f3130365f485f323131323200000000000000000000000000000000"
    
    const txCount2 = await web3.eth.getTransactionCount(wallet);

    const txObj2 = {
      chainId: 43113,
			nonce: web3.utils.toHex(txCount2),
			gasLimit: web3.utils.toHex(60000 * 1.5),
			gasPrice: web3.utils.toHex(web3.utils.toWei('55', 'gwei')),
			to: contractAddress,
			data: data2
    }

    const raw2 = createTx(txObj2, pvt);
    const txHash2 = await web3.eth.sendSignedTransaction(raw2)

    console.log(`[ACCOUNT] ${wallet}`)
		console.log(`[OK] SCAN URL: https://testnet.avascan.info/blockchain/c/tx/${txHash2.blockHash}`)

  } catch (error) {
    console.log("failured")
    console.log(error)
  }
}

gao(wallet, pvt)