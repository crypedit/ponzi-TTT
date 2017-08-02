var PonziTTT = artifacts.require("./PonziTTT.sol");

contract('PonziTTT', function(accounts) {

    it("should register correctly", function() {
        var ponzi;

        var account_one = accounts[0];
        var account_two = accounts[1];

        return PonziTTT.new().then(function(instance) {
            ponzi = instance;
            return ponzi.register({from: account_one, value: web3.toWei(2,'ether') });
        }).then(function() {
            return ponzi.isTrainee(account_one);
        }).then(function(res) {
            assert.equal(res.valueOf(), true, "");
        }).then(function() {
            return ponzi.balanceOf(account_one);
        }).then(function(res) {
            assert.equal(res.valueOf(), web3.toWei(2,'ether'), "");
        }).then(function() {
            return ponzi.isTrainee(account_two);
        }).then(function(res) {
            assert.equal(res.valueOf(), false, "");
        });
    });

    it("should confirm and check correctly", function() {
        var ponzi;

        var trainer = accounts[0];
        var trainer_two = accounts[1];
        var trainee = accounts[2];

        return PonziTTT.new([trainer, trainer_two]).then(function(instance) {
            ponzi = instance;
            return ponzi.register({from: trainee, value: web3.toWei(2,'ether')});
        }).then(function() {
            return ponzi.isOwner(trainer);
        }).then(function(res) {
            assert.equal(res.valueOf(), true, "");
        }).then(function() {
            return ponzi.isTrainee(trainee);
        }).then(function(res) {
            assert.equal(res.valueOf(), true, "");
        }).then(function() {
            return ponzi.balanceOf(trainee);
        }).then(function(res) {
            assert.equal(res.valueOf(), web3.toWei(2,'ether'), "");
        }).then(function() {
            return ponzi.checkProgress({from: trainee});
        }).then(function(res) {
            assert.equal(res.valueOf(), 0, "");
        }).then(function() {
            ponzi.confirmOnce(trainee, {from: trainer});
        }).then(function() {
            return ponzi.checkProgress({from: trainee});
        }).then(function(res) {
            assert.equal(res.valueOf(), 1, "");
        }).then(function() {
            ponzi.confirmOnce(trainee, {from: trainer_two});
        }).then(function() {
            return ponzi.checkProgress({from: trainee});
        }).then(function(res) {
            assert.equal(res.valueOf(), 2, "");
        }).then(function() {
            return ponzi.checkBalance();
        }).then(function(res) {
            assert.equal(res.valueOf(), web3.toWei(2,'ether'), "");
        });
    });

});
