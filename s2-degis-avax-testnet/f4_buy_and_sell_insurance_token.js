"use strict";

import { web3, wallet, wallets, pvt } from './index';
import { createTx } from './utils/createTx';
import { approve } from './utils/approve';

const gao = async (wallet, pvt) => {
  try {
    const contractAddress = "0x3A5Ec4E77f1779901FA91dCD9e5Ad2418415f77e";
    const tokenAddress = "0xF886dDc935E8DA5Da26f58f5D266EFdfDA1AD260";
    const amount = await approve(tokenAddress, contractAddress, wallet, pvt);

    // the naughty price buy 2w USDC
    console.log("Buy Naughty Price")
    const data = "0x0a7af5c600000000000000000000000000000000000000000000043c33c19375648000000000000000000000000000000000000000000000000001076ada94b9e7223ac0000000000000000000000000f886ddc935e8da5da26f58f5d266efdfda1ad260000000000000000000000000b86d8effcb020143abf8baf8ba0653bbb28bb2c00000000000000000000000008a3522c8c11231b2923642d39d84badee511d0d90000000000000000000000000000000000000000000000000000000061b80fbe"
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
		console.log(`[OK] SCAN URL: https://testnet.avascan.info/blockchain/c/tx/${txHash.blockHash}`)


    // 后面是 sell 操作
    console.log("Sell Naughty Price")
    const token2Address = "0xB86D8EFfcb020143abF8Baf8Ba0653bBb28bB2C0"
    const amount2 = await approve(token2Address, contractAddress, wallet, pvt);
    const data2 = "0x0a7af5c6000000000000000000000000000000000000000000000007ea550b856ccaf3c0000000000000000000000000000000000000000000000015af1d78b58c400000000000000000000000000000b86d8effcb020143abf8baf8ba0653bbb28bb2c0000000000000000000000000f886ddc935e8da5da26f58f5d266efdfda1ad2600000000000000000000000008a3522c8c11231b2923642d39d84badee511d0d90000000000000000000000000000000000000000000000000000000061b811d7"
    const txCount2 = await web3.eth.getTransactionCount(wallet);

    const txObj2 = {
      chainId: 43113,
			nonce: web3.utils.toHex(txCount2),
			gasLimit: web3.utils.toHex(110000 * 1.5),
			gasPrice: web3.utils.toHex(web3.utils.toWei('55', 'gwei')),
			to: contractAddress,
			data: data2
    }

    const raw2 = createTx(txObj2, pvt);
    const txHash2 = await web3.eth.sendSignedTransaction(raw2);

    console.log(`[ACCOUNT] ${wallet}`)
		console.log(`[OK] SCAN URL: https://testnet.avascan.info/blockchain/c/tx/${txHash2.blockHash}`)

  } catch (error) {
    console.log("failured")
    console.log(error)
  }
}

gao(wallet, pvt)