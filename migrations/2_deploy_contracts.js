var PonziTTT = artifacts.require("./PonziTTT.sol");

module.exports = function(deployer) {
  deployer.deploy(PonziTTT, [], 4);
};
