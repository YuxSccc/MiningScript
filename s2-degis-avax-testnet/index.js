export const rpcUrl = "https://api.avax-test.network/ext/bc/C/rpc"

import Web3 from 'web3';

export const web3 = new Web3(rpcUrl)

export const wallets = require('./../pvts/wallets_list.json')
export const wallet = wallets[0].address;
export const pvt = wallets[0].pvt;