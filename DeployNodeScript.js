///This script is a node.js script meant to be run from node 
//Has to be run in the bin directory
bytecode=fs.readFileSync('NFTToken.bin').toString()
abi=JSON.parse(fs.readFileSync('NotarizedDocument_sol_NotarizedDocument.abi').toString())
Web3=require('web3')
web3=new Web3("http://localhost:8545")
nContract=web3.eth.contract(abi)
nContract.deploy({data:bytecode}).
send({from:'0x6decD76966947ae0c6D09e7eB43A6E309b56ae9b',gas:1500000,gasPrice:web3.utils.toWei('0.00003','ether')}).
then((newContractInstance) => {nContract.options.address=newContractInstance.options.address});