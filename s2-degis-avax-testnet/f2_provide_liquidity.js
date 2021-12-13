"use strict";

const rpcUrl = "https://api.avax-test.network/ext/bc/C/rpc"


// account
const wallets = require('./../pvts/wallets_list.json')
const wallet = wallets[0].address;
const pvt = wallets[0].pvt;

const Tx = require('ethereumjs-tx');
const Web3 = require('web3')
const web3 = new Web3(rpcUrl)

const abi = require('./abi/insurance_pool.json');
const erc20Abi = require('./abi/erc20.json');

// https://degis-degis.vercel.app/#/flight-provide
const contractAddress = '0x904C30be1D840334B346E13DA4Cb93f5D8277358'
const contract = new web3.eth.Contract(
	abi,
	contractAddress
)

const usdcAddress = '0xF886dDc935E8DA5Da26f58f5D266EFdfDA1AD260';
const usdcContract = new web3.eth.Contract(
	erc20Abi,
	usdcAddress
)


const gao = async (wallet, pvt) => {

	try {
		// 先进行代币授权
		console.log("先进行代币授权")
		const usePvt = Buffer.from(pvt, 'hex');

		// 获取代币个数
		const amount = await usdcContract.methods.balanceOf(wallet).call()
		
		// 授权
		const data = usdcContract.methods.approve(contractAddress, amount).encodeABI();
		let gasLimit = await usdcContract.methods.approve(contractAddress, amount).estimateGas({from: wallet})
		const txCount = await web3.eth.getTransactionCount(wallet);
		const txObj1 = {
			chainId: 43113,
			nonce: web3.utils.toHex(txCount),
			gasLimit: web3.utils.toHex(gasLimit * 2),
			gasPrice: web3.utils.toHex(web3.utils.toWei('55', 'gwei')),
			to: contractAddress,
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
		console.log(`[OK] SCAN URL: https://testnet.avascan.info/blockchain/c/tx/${txHash}`)

		// 质押
		console.log("进行质押操作")
		const data2 = contract.methods.stake(wallet, amount).encodeABI();
		let gasLimit2 = await contract.methods.stake(wallet, amount).estimateGas({from: wallet});
		const txCount2 = await web3.eth.getTransactionCount(wallet);
		const txObj2 = {
			chainId: 43113,
			nonce: web3.utils.toHex(txCount2),
			gasLimit: web3.utils.toHex(gasLimit2 * 2),
			gasPrice: web3.utils.toHex(web3.utils.toWei('55', 'gwei')),
			to: contractAddress,
			data: data2
		}

		/// sign the transaction
		const tx2 = new Tx(txObj2);
		tx2.sign(usePvt);
		const serializedTx2 = tx2.serialize()
		const raw2 = '0x' + serializedTx2.toString('hex')

		/// broodcast
		const txHash2 = await web3.eth.sendSignedTransaction(raw2)

		console.log(`[ACCOUNT] ${wallet}`)
		console.log(`[OK] SCAN URL: https://testnet.avascan.info/blockchain/c/tx/${txHash2}`)

	} catch (error) {
		console.log("failured")
		console.log(error)
	}
	

}

gao(wallet, pvt);