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
  mapping(address => uint256) traineeLessons;

  // EVENTS

  // logged events:
  // Funds has arrived into the wallet (record how much).
  event Deposit(address _from, uint256 value);
  // Single transaction going out of the wallet (record who signed for it, how much, and to whom it's going).
  event SingleTransact(address owner, uint256 value, address to, bytes data);
  // Multi-sig transaction going out of the wallet (record who signed for it last, the operation hash, how much, and to whom it's going).
  event MultiTransact(address owner, bytes32 operation, uint256 value, address to, bytes data);
  // Confirmation still needed for a transaction.
  event ConfirmationNeeded(bytes32 operation, address initiator, uint256 value, address to, bytes data);
  event Confirmation(address _from, address _to);

  modifier onlyOwner {
    if (!isOwner(msg.sender)) {
      throw;
    }
    _;
  }

  function isOwner(address _addr) constant returns (bool) {
    return ownerIndex[_addr] > 0;
  }


  modifier onlyTrainee {
    if (!isTrainee(msg.sender)) {
      throw;
    }
    _;
  }

  modifier notTrainee {
    if (isTrainee(msg.sender)) {
      throw;
    }
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
    if (msg.value > 0)
      traineeBalances[msg.sender] = msg.value;
      Deposit(msg.sender, msg.value);
  }

  function balanceOf(address _addr) constant returns (uint256) {
    return traineeBalances[_addr];
  }

  function check() onlyTrainee constant returns (uint256) {
    return traineeLessons[msg.sender];
  }

  function confirm(address _addr) onlyOwner {
      traineeLessons[_addr] += 1;
      Confirmation(msg.sender, _addr);
  }

  function checkBalance() onlyOwner constant returns (uint256) {
    return this.balance;
  }
}
