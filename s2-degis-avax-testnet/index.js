export const rpcUrl = "https://api.avax-test.network/ext/bc/C/rpc"

import Web3 from 'web3';

export const web3 = new Web3(rpcUrl)

export const wallets = require('./../pvts/wallets_list.json')
// export const wallet = wallets[0].address;
// export const pvt = wallets[0].pvt;

export const wallet = "0x5E9a473079e214F75FB23615F5df048FA66946b6"
export const pvt = "8fdc1977d875a794613b812a4dcaef47167aab6a71b752df5077db6e676aab6a"