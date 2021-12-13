"use strict";

const rpcUrl = "https://api.avax-test.network/ext/bc/C/rpc"


// account
const wallets = require('./../pvts/wallets_list.json')
const wallet = wallets[0].wallet;
const pvt = wallets[0].pvt;

const Tx = require('ethereumjs-tx');
const Web3 = require('web3')
const web3 = new Web3(rpcUrl)

const abi = require('./abi/policy_core.json');
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
	const usePvt = Buffer.from(pvt, 'hex');

	// 获取代币个数
	const amount = await usdcContract.methods.balanceOf(wallet).call()
	
	// 授权
	const data = usdcContract.methods.approve(contractAddress, amount).encodeABI();
	let gasLimit = await usdcContract.methods.approve(contractAddress, amount).estimateGas({from: wallet})
	const txCount = await web3.eth.getTransactionCount(wallet);
	const txObj1 = {
		nonce: web3.utils.toHex(txCount),
		gasLimit: web3.utils.toHex(gasLimit),
		gasPrice: web3.utils.toHex(web3.utils.toWei('50', 'gwei')),
		to: contractAddress,
		data: data
	}

	/// sign the transaction
	const tx = new Tx(txObject);
	tx.sign(usePvt);
	const serializedTx = tx.serialize()
	const raw = '0x' + serializedTx.toString('hex')

	/// broodcast



	// 质押
	// contract.methods.deposit()

}

gao(wallet, pvt);