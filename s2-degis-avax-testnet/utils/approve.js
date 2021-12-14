"use strict";


const erc20Abi = require('./../abi/erc20.json');
const Tx = require('ethereumjs-tx');
import { web3 } from '../index'

export async function approve(erc20, contract, wallet, pvt) {
  try {
    console.log(`为合约 ${contract} 授权 ${erc20}`);
  
    const usePvt = Buffer.from(pvt, 'hex');
    const tokenContract = new web3.eth.Contract(
      erc20Abi,
      erc20
    )
    const amount = await tokenContract.methods.balanceOf(wallet).call()
    const data = tokenContract.methods.approve(contract, amount).encodeABI();
    let gasLimit = await tokenContract.methods.approve(contract, amount).estimateGas({from: wallet})
    const txCount = await web3.eth.getTransactionCount(wallet);

    console.log("授权 amount", amount)
    console.log(gasLimit)

    const txObj1 = {
      chainId: 43113,
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(gasLimit * 2),
      gasPrice: web3.utils.toHex(web3.utils.toWei('50', 'gwei')),
      to: erc20,
      data: data
    }

    /// sign the transaction
    const tx = new Tx(txObj1);
    tx.sign(usePvt);
    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')


    /// broodcast
    const txHash = await web3.eth.sendSignedTransaction(raw)

    console.log(`[ACCOUNT] ${wallet}`)
    console.log(`[OK] SCAN URL: https://testnet.avascan.info/blockchain/c/tx/${txHash.blockHash}`)

    return amount;
  } catch (error) {
    console.log("授权失败")
    console.log(error);
  }
}