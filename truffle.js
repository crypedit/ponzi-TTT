var WalletProvider = require("truffle-wallet-provider");
var keystore = require('fs').readFileSync('./keystore').toString();
var pass = require('fs').readFileSync('./pass').toString();
var wallet = require('ethereumjs-wallet').fromV3(keystore, pass);

module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*"
        },
        // live: {
        //     network_id: 1,
        //     provider: new WalletProvider(wallet, "https://mewapi.epool.io")
        // },
    }
};
