"use strict";

import { web3, wallet, wallets, pvt } from './index';
import { createTx } from './utils/createTx';
import { approve } from './utils/approve';

const gao = async (wallet, pvt) => {
  try {
    const contractAddress = "0xfAa5961cE2090C7cc5602AA7bDA75401bD47fB32"
    const usdcAddress = "0xF886dDc935E8DA5Da26f58f5D266EFdfDA1AD260"

    console.log("Approve USDC")
    const usdcAmount = await approve(usdcAddress, contractAddress, wallet, pvt);

    console.log("Buy insurance");
    const data = "0x21deab0e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000482a1c73000800000000000000000000000000000000000000000000000000000000000061c42c8000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000061c4338800000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000006414131363735000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000413504b3b885171f2e29f61cda0b9ce045d7ebccda6022edcaec501ed6ece2aa0741cda0bebab44eab5741de429bc50c6ef1453f445444c1524c8cf9c4810b49ca1b00000000000000000000000000000000000000000000000000000000000000"
    const txCount = await web3.eth.getTransactionCount(wallet);
    const txObj = {
      chainId: 43113,
			nonce: web3.utils.toHex(txCount),
			gasLimit: web3.utils.toHex(800000 * 1.5),
			gasPrice: web3.utils.toHex(web3.utils.toWei('55', 'gwei')),
			to: contractAddress,
			data: data
    }
    const raw = createTx(txObj, pvt);
    const txHash = await web3.eth.sendSignedTransaction(raw);

    console.log(`[ACCOUNT] ${wallet}`)
		console.log(`[OK] SCAN URL: https://testnet.avascan.info/blockchain/c/tx/${txHash.transactionHash}`)
  } catch (error) {
    console.log("failured in f1")
    console.log(error)
  }
}

gao(wallet, pvt)

//0x8a3522C8c11231b2923642d39d84BAdEE511D0D9