const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://etc.crypedit.com:8545"));
const abi = [{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"progressOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"register","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"checkContractBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"isTrainee","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_recipient","type":"address"}],"name":"destroyTransfer","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_recipient","type":"address"}],"name":"confirmOnce","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"isFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"checkBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"checkProgress","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_recipient","type":"address"}],"name":"refund","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_owners","type":"address[]"},{"name":"_required","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Registration","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_lesson","type":"uint256"}],"name":"Confirmation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Refund","type":"event"}];
const address = '0xf0c23ee6a927eb29716b586704c8b4393f1cf0de';
const ponziTTT = new web3.eth.Contract(abi, address);

async function checkOwner(){
    const ret = await ponziTTT.methods.isOwner('0x5c47e30dc7F82167De8865aac3914Ce927C15918').call();
    console.log(ret);
}

async function listProgressSync(){
    let events = await ponziTTT.getPastEvents('Registration', { fromBlock: 0, toBlock: 'latest' });
    let chain = Promise.resolve();
    events.forEach(e => {
        chain = chain.then(
            async () => {
                let trainee = e.returnValues._from;
                let progress = await ponziTTT.methods.progressOf(trainee).call();
                console.log(trainee, progress);
            }
        );
    });
}

async function listProgressAsync(){
    let events = await ponziTTT.getPastEvents('Registration', { fromBlock: 0, toBlock: 'latest' });
    Promise.all(events.map(
        async (e) => {
            let trainee = e.returnValues._from;
            let progress = await ponziTTT.methods.progressOf(trainee).call();
            return { trainee: trainee, progress:progress }
        })
    ).then((progressList)=> {
        progressList.forEach((p)=>{
            console.log(p.trainee, p.progress);
        })
    })
}

checkOwner().then(listProgressAsync);
