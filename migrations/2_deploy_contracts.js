var PonziTTT = artifacts.require("./PonziTTT.sol");

module.exports = function(deployer) {
  // Change following address list when deploy to production
  // The deploy account will be owner by default
  var owners = [];
  deployer.deploy(PonziTTT, owners, 4, 2, 100000000000000);
};
