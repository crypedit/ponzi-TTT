Ponzi TTT
[![Build Status](https://travis-ci.org/cryptedit/ponzi-TTT.svg?branch=master)](https://travis-ci.org/cryptedit/ponzi-TTT)
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
