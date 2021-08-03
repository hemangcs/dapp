<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <meta http-equiv="X-UA-Compatible" content="ie=edge">
 <title>Document</title>
<link rel="stylesheet" type="text/css" href="index.css">
<script src = "https://cdn.jsdelivr.net/gh/ethereum/web3.js@0.18.2/dist/web3.min.js"></script>
</head>
<body>
 <div class="container">
<h1>First Smart Contract</h1>
<h2 id="instructor"></h2>
<img id="loader" src="Spinner.gif">
<label for="name" class="col-lg-2 control-label">Instructor Name</label>
 <input id="name" type="text">
<label for="name" class="col-lg-2 control-label">Instructor Age</label>
 <input id="age" type="text">
<button id="button">Update Instructor</button>
</div>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
<script>
 if (typeof web3 !== 'undefined') 
{
 web3 = new Web3(web3.currentProvider);
 } 
else 
{
 // set the provider you want from Web3.providers
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

var CoursesContract = web3.eth.contract([
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_firstname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_lastname",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "doctorID",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "newUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_newData",
				"type": "bytes"
			}
		],
		"name": "setData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getDataSize",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getUserData",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_firstname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_lastname",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "doctorID",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]);
var Courses = CoursesContract.at('0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8');

var instructorEvent = Courses.Instructor();
instructorEvent.watch(function(error, result){
            if (!error)
                {
                    $("#loader").hide();
                    $("#instructor").html(result.args.name + '(' + result.args.age + 'years old)');
                } else {
                    $("#loader").hide();
                    console.log(error);
                }
        });


/*Courses.getInstructor(function(error, result){
  if(!error){
	$("#instructor").html(result[0]+ '('+result[1]+' years old)');
    console.log(result);
    }
 else
   console.error(error);
 });
*/

$("#button").click(function() {
	$("loader").show();
 Courses.setInstructor($("#name").val(), $("#age").val());
});
</script>
</body>
</html>