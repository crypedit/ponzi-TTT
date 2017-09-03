pragma solidity ^0.4.11;


contract PonziTTT {

    // limited blocks
    uint256 limit = 100000000000;
    // required lessons
    uint256 required;
    // required ether fee
    uint256 fee;

    // ================== Owner list ====================
    // index on the list of owners to allow reverse lookup
    mapping(address => uint256) ownerIndex;
    // ================== Owner list ====================

    // ================== Trainee list ====================
    // number of trainees
    uint256 traineeNumber;
    // number of graduates
    uint256 graduateNumber;
    // list of trainees
    address[256] trainees;
    // balance of the list of trainees to allow refund value
    mapping(address => uint256) traineeIndex;
    // ================== Trainee list ====================

    mapping(address => uint256) traineeProgress;

    // EVENTS

    // logged events:
    // Funds has arrived into the wallet.
    event Registration(address _from, uint256 _traineeIndex);
    // Lesson has been confirmed by the owner.
    event Confirmation(address _from, address _to, uint256 _lesson);
    // Trainee has graduate confirmed by the owner.
    event Graduation(address _from, address _to);
    // Funds has refund back (record how much).
    event Refund(address _from, address _to, uint256 _amount);

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
        return traineeIndex[_addr] > 0;
    }

    modifier beforeOutDated {
        require(!isOutDated());
        _;
    }

    function isOutDated() constant returns (bool) {
        return block.number > limit;
    }

    function isFinished(address _addr) constant returns (bool) {
        return traineeProgress[_addr] >= required;
    }

    function PonziTTT(address[] _owners, uint256 _required, uint256 _fee) {
        fee = _fee;
        required = _required;

        //Initialize owner list, will also include the contract deployer
        ownerIndex[msg.sender] = 1;
        for (uint256 i = 0; i < _owners.length; ++i) {
            ownerIndex[_owners[i]] = 2 + i;
        }
    }

    function () payable {
        register();
    }

    function register() payable notTrainee beforeOutDated {
        require(msg.value == fee * 1 ether);
        // XXX: Possible race condition!!!
        traineeNumber = traineeNumber + 1;
        traineeIndex[msg.sender] = traineeNumber;
        trainees[traineeNumber] = msg.sender;
        Registration(msg.sender, traineeIndex[msg.sender]);
    }

    function progressOf(address _addr) constant returns (uint256) {
        return traineeProgress[_addr];
    }

    function confirmOnce(address _recipient) onlyOwner beforeOutDated {
        require(isTrainee(_recipient));
        require(!isFinished(_recipient));
        traineeProgress[_recipient] = traineeProgress[_recipient] + 1;
        Confirmation(msg.sender, _recipient, traineeProgress[_recipient]);
        if (isFinished(_recipient)) {
            graduateNumber = graduateNumber + 1;
            Graduation(msg.sender, _recipient);
        }
    }

    function checkContractBalance() constant returns (uint256) {
        return this.balance;
    }

    function refundAll() onlyOwner {
        require(isOutDated());
        uint256 amount = this.balance / graduateNumber;
        for (uint256 i = 0; i < trainees.length; ++i) {
            if (isFinished(trainees[i])) {
                refund(trainees[i], amount);
            }
        }
    }

    function refund(address _recipient, uint256 _amount) onlyOwner {
        require(isTrainee(_recipient));
        require(isFinished(_recipient));
        _recipient.transfer(_amount);
        Refund(msg.sender, _recipient, _amount);
    }

    function destroy() onlyOwner {
        selfdestruct(msg.sender);
    }

    function destroyTransfer(address _recipient) onlyOwner {
        selfdestruct(_recipient);
    }
}
