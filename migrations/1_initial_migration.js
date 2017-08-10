var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer, network, accounts) {
  console.log(network, accounts);
  deployer.deploy(Migrations);
};
