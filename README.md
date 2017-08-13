# PonziTTT

[![Build Status](https://travis-ci.org/cryptedit/ponzi-TTT.svg?branch=master)](https://travis-ci.org/cryptedit/ponzi-TTT)

## WARNING
请认真阅读本操作指南，否则你可能会承受经济损失！

## PonziTTT 参与教程

### MyEtherWallet chrome插件（以下称MEW）

[此处安装插件](https://chrome.google.com/webstore/detail/myetherwallet/nlbmnnijcnlegkjjpcfjclmcfggfefdm)

### 在MEW中新建账号

1. 输入passphrase（请牢记）
2. 备份该账号

### 或者导入已存在的Private Key

1. 由于MEW暂时不支持直接导入Keystore文件
2. [UTC json格式的 Keystore文件需要先解密为Private Key](https://www.myetherwallet.com/#view-wallet-info)
2. 导入Private Key

### 向该账号转入一定量ETC(以太经典)， 至少大于 2.2 ether

本文档写成时[参考价](https://yunbi.com/markets/etccny)96元人民币，请务必选择正确的币种

### 参与PonziTTT合约

1. Contracts
2. 填入 Contract Address
3. 填入 ABI / JSON Interface
4. 选择 `register`方法
5. unlock 希望使用的 Wallet（支付押金和退回押金时使用）
6. Amount to Send 设为 `2`（押金为2 ether，请务必确保钱包余额大于2.2 ether，因为调用方法需要支付gas）
7. 生成Tx、签名，并发布
8. 耐心等待或在[gastracker](https://gastracker.io)跟踪Tx完成情况
9. 选择 `isTrainee`方法
10. 成功注册后会返回 `TRUE`

## Contract Address

`0xf0c23ee6a927eb29716b586704c8b4393f1cf0de`

## Contract ABI

```
[
    {
      "constant": true,
      "inputs": [
        {
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "progressOf",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "register",
      "outputs": [],
      "payable": true,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "isOwner",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "checkContractBalance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "isTrainee",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_recipient",
          "type": "address"
        }
      ],
      "name": "destroyTransfer",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "destroy",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_recipient",
          "type": "address"
        }
      ],
      "name": "confirmOnce",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "isFinished",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "checkBalance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "checkProgress",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_recipient",
          "type": "address"
        }
      ],
      "name": "refund",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_owners",
          "type": "address[]"
        },
        {
          "name": "_required",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "Registration",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_lesson",
          "type": "uint256"
        }
      ],
      "name": "Confirmation",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "Refund",
      "type": "event"
    }
  ]
```

===
- [x] 创建合约 Ponzi 时，可以指定多个 trainer 作为合约 Owner 以及必须完成的课程数（本次课程数为4）
- [x] trainee 可以注册到合约 Ponzi，保证金为`2 ether`
- [x] trainer 可以给 trainee 签到
- [x] trainee 可以查看自己的课程完成进度、余额
- [x] trainer 可以查看合约总余额
- [x] 任何人 都可以查看课程完成情况，特定trainee完成与否
- [x] 完成规定的课程数之后，trainer 可以将保证金 `2 ether` 退给对应的 trainee

## 部署
1. 拷贝你的 keystore file 到当前项目目录下，名为 keystore
2. 拷贝 passphase 到当前目录下，名为 pass（注意：不要换行）
```
$ truffle deploy --network live
```
