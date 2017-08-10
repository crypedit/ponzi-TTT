var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "couch solve unique spirit wine fine occur rhythm foot feature glory away";
var provider = new HDWalletProvider(mnemonic, "https://ropsten.infura.io/9Z7FghSDOuqQHxK3rk3B");

module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*"
        },
        ropsten: {
            network_id: 3,    // Official ropsten network id
            provider: provider,
            gas: 4712388 * 1
        },
    }
};
