pragma solidity ^0.4.11;


contract PonziTTT {

    // ================== Owner list ====================
    // list of owners
    address[256] owners;
    // index on the list of owners to allow reverse lookup
    mapping(address => uint256) ownerIndex;
    // ================== Owner list ====================

    // ================== Trainee list ====================
    // balance of the list of trainees to allow refund value
    mapping(address => uint256) traineeBalances;
    // ================== Trainee list ====================
    mapping(address => uint256) traineeProgress;

    // EVENTS

    // logged events:
    // Funds has arrived into the wallet (record how much).
    event Registration(address _from, uint256 value);
    event Confirmation(address _from, address _to, uint256 _lesson);

    modifier onlyOwner {
        require(isOwner(msg.sender));
        _;
    }

    function isOwner(address _addr) constant returns (bool) {
        return ownerIndex[_addr] > 0;
    }

    modifier onlyTrainee {
        require(isTrainee(msg.sender));
        _;
    }

    modifier notTrainee {
        require(!isTrainee(msg.sender));
        _;
    }

    function isTrainee(address _addr) constant returns (bool) {
        return traineeBalances[_addr] > 0;
    }

    function PonziTTT(address[] _owners) {
        owners[1] = msg.sender;
        ownerIndex[msg.sender] = 1;
        for (uint256 i = 0; i < _owners.length; ++i) {
            owners[2 + i] = _owners[i];
            ownerIndex[_owners[i]] = 2 + i;
        }
    }

    function register() payable notTrainee {
        require(msg.value == 2 ether);
        traineeBalances[msg.sender] = msg.value;
        Registration(msg.sender, msg.value);
    }

    function balanceOf(address _addr) constant returns (uint256) {
        return traineeBalances[_addr];
    }

    function checkProgress() onlyTrainee constant returns (uint256) {
        return traineeProgress[msg.sender];
    }

    function confirmOnce(address _addr) onlyOwner {
        traineeProgress[_addr] = traineeProgress[_addr] + 1;
        Confirmation(msg.sender, _addr, traineeProgress[_addr]);
    }

    function checkBalance() onlyOwner constant returns (uint256) {
        return this.balance;
    }
}
