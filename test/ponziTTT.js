var PonziTTT = artifacts.require("./PonziTTT.sol");

contract('PonziTTT', function(accounts) {

    it("should checkBalance & checkProgress correctly", function() {
        var ponzi;

        var account_one = accounts[0];

        return PonziTTT.new([], 4, 2, web3.eth.blockNumber+2).then(function(instance) {
            ponzi = instance;
            ponzi.register({from: account_one, value: web3.toWei(2,'ether') });
        }).then(function() {
            return ponzi.isTrainee(account_one);
        }).then(function(res) {
            assert.equal(res.valueOf(), true, "");
        }).then(function() {
            return ponzi.progressOf(account_one);
        }).then(function(res) {
            assert.equal(res.valueOf(), 0, "");
        });
    });

    it("should register correctly", function() {
        var ponzi;

        var account_one = accounts[0];
        var account_two = accounts[1];

        return PonziTTT.new([], 4, 2, web3.eth.blockNumber+3).then(function(instance) {
            ponzi = instance;
            return ponzi.register({from: account_one, value: web3.toWei(2,'ether') });
        }).then(function() {
            return ponzi.isTrainee(account_one);
        }).then(function(res) {
            assert.equal(res.valueOf(), true, "");
        }).then(function() {
            return ponzi.isTrainee(account_two);
        }).then(function(res) {
            assert.equal(res.valueOf(), false, "");
        }).then(function() {
            web3.eth.sendTransaction({to: ponzi.address, from: account_two, value: web3.toWei(2,'ether') });
        }).then(function() {
            return ponzi.isTrainee(account_two);
        }).then(function(res) {
            assert.equal(res.valueOf(), true, "");
        });
    });

    it("should confirm and check correctly", function() {
        var ponzi;

        var trainer = accounts[0];
        var trainer_two = accounts[1];
        var trainee = accounts[2];

        return PonziTTT.new([trainer, trainer_two], 4, 2, web3.eth.blockNumber+4).then(function(instance) {
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
            return ponzi.progressOf(trainee);
        }).then(function(res) {
            assert.equal(res.valueOf(), 0, "");
        }).then(function() {
            ponzi.confirmOnce(trainee, {from: trainer});
        }).then(function() {
            return ponzi.progressOf(trainee);
        }).then(function(res) {
            assert.equal(res.valueOf(), 1, "");
        }).then(function() {
            ponzi.confirmOnce(trainee, {from: trainer_two});
        }).then(function() {
            return ponzi.progressOf(trainee);
        }).then(function(res) {
            assert.equal(res.valueOf(), 2, "");
        }).then(function() {
            return ponzi.checkContractBalance();
        }).then(function(res) {
            assert.equal(res.valueOf(), web3.toWei(2,'ether'), "");
        }).then(function() {
            ponzi.destroy({from: trainer_two});
        });
    });

    it("should confirm as required and refund correctly", function() {
        var ponzi;
        var before, after;

        var trainer = accounts[0];
        var trainer_two = accounts[1];
        var trainee = accounts[2];

        return PonziTTT.new([trainer, trainer_two], 4, 2, web3.eth.blockNumber+6).then(function(instance) {
            ponzi = instance;
            return ponzi.register({from: trainee, value: web3.toWei(2,'ether')});
        }).then(function() {
            return ponzi.isOwner(trainer);
        }).then(function(res) {
            assert.equal(res.valueOf(), true, "");
        }).then(function() {
            before = web3.eth.getBalance(trainee);
            return ponzi.isTrainee(trainee);
        }).then(function(res) {
            assert.equal(res.valueOf(), true, "");
        }).then(function() {
            return ponzi.progressOf(trainee);
        }).then(function(res) {
            assert.equal(res.valueOf(), 0, "");
        }).then(function() {
            return ponzi.confirmOnce(trainee, {from: trainer});
        }).then(function() {
            return ponzi.confirmOnce(trainee, {from: trainer_two});
        }).then(function() {
            return ponzi.confirmOnce(trainee, {from: trainer});
        }).then(function() {
            return ponzi.progressOf(trainee);
        }).then(function(res) {
            assert.equal(res.valueOf(), 3, "");
        }).then(function() {
            return ponzi.isFinished(trainee);
        }).then(function(res) {
            assert.equal(res.valueOf(), false, "");
        }).then(function() {
            return ponzi.confirmOnce(trainee, {from: trainer_two});
        }).then(function() {
            return ponzi.progressOf(trainee);
        }).then(function(res) {
            assert.equal(res.valueOf(), 4, "");
        }).then(function() {
            return ponzi.isFinished(trainee);
        }).then(function(res) {
            assert.equal(res.valueOf(), true, "");
        }).then(function() {
            return ponzi.refund(trainee, web3.toWei(2,'ether'), {from: trainer});
        }).then(function() {
            after = web3.eth.getBalance(trainee);
            assert.equal(before.plus(web3.toWei(2,'ether')).valueOf(), after.valueOf(), "");
        }).then(function() {
            return ponzi.checkContractBalance();
        }).then(function(res) {
            assert.equal(res.valueOf(), 0, "");
        });
    });

    it("should confirm as required and refundAll correctly", function() {
        var ponzi;
        var before, after;
        var before_two, after_two;

        var trainer = accounts[0];
        var trainer_two = accounts[1];
        var trainee = accounts[2];
        var trainee_two = accounts[3];
        var trainee_three = accounts[4];

        return PonziTTT.new([trainer, trainer_two], 1, 2, web3.eth.blockNumber+6).then(function(instance) {
            ponzi = instance;
            return ponzi.register({from: trainee, value: web3.toWei(2,'ether')});
        }).then(function() {
            return ponzi.register({from: trainee_two, value: web3.toWei(2,'ether')});
        }).then(function() {
            return ponzi.register({from: trainee_three, value: web3.toWei(2,'ether')});
        }).then(function() {
            before = web3.eth.getBalance(trainee);
            before_two = web3.eth.getBalance(trainee_two);
            return ponzi.confirmOnce(trainee, {from: trainer});
        }).then(function() {
            return ponzi.isFinished(trainee);
        }).then(function(res) {
            assert.equal(res.valueOf(), true, "");
        }).then(function() {
            return ponzi.confirmOnce(trainee_two, {from: trainer_two});
        }).then(function() {
            return ponzi.isFinished(trainee_two);
        }).then(function(res) {
            assert.equal(res.valueOf(), true, "");
        }).then(function() {
            return ponzi.refundAll({from: trainer});
        }).then(function() {
            after = web3.eth.getBalance(trainee);
            assert.equal(before.plus(web3.toWei(3,'ether')).valueOf(), after.valueOf(), "refundAll should balance mean amount back to graduates");
            after_two = web3.eth.getBalance(trainee_two);
            assert.equal(before_two.plus(web3.toWei(3,'ether')).valueOf(), after_two.valueOf(), "refundAll should balance mean amount back to graduates");
        }).then(function() {
            return ponzi.checkContractBalance();
        }).then(function(res) {
            assert.equal(res.valueOf(), 0, "");
        });
    });
});
