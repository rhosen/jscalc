$(document).ready(function(){
	$('#txtResult').val(0);
});


$('#btnClearAll').click(function(){
	$('#txtHistory').val('');
	$('#txtResult').val(0);
});

$('#btnClearEntry').click(function(){
	var userInput = GetUserInput();
	var result = userInput.substring(0, userInput.length - GetCurrentInput().length);
	$('#txtHistory').val(result);
});

$('#btnClear').click(function(){
	var userInput = GetUserInput();
	var result = userInput.substring(0, userInput.length - 1);
	$('#txtHistory').val(result);
	CalculateResult();
	if(!GetUserInput()){
		$('#txtResult').val(0);
	}
});

$('#btnZero').click(function(){
	if(GetCurrentInput()){
		AddDigit('0');
	}
	CalculateResult();
});

$('#btnOne').click(function(){
	AddDigit('1');
	CalculateResult();
});
$('#btnTwo').click(function(){
	AddDigit('2');
	CalculateResult();
});
$('#btnThree').click(function(){
	AddDigit('3');
	CalculateResult();
});
$('#btnFour').click(function(){
	AddDigit('4');
	CalculateResult();
});
$('#btnFive').click(function(){
	AddDigit('5');
	CalculateResult();
});
$('#btnSix').click(function(){
	AddDigit('6');
	CalculateResult();
});
$('#btnSeven').click(function(){
	AddDigit('7');
	CalculateResult();
});
$('#btnEight').click(function(){
	AddDigit('8');
	CalculateResult();
});
$('#btnNine').click(function(){
	AddDigit('9');
	CalculateResult();
});

$('#btnPeriod').click(function(){
	if(GetCurrentInput()){
		if(GetNumberOfPeriod() < 1){
			$('#txtHistory').val(GetUserInput() + '.');
		}
	}
});

$('#btnAdd').click(function(){
	var userInput = GetUserInput();
	if(!userInput){
		userInput = $('#txtResult').val();
	}
	if(userInput && userInput!= 0 && IsValidOperator()){
		$('#txtHistory').val((userInput + ' + '));
	}
});

$('#btnSubstract').click(function(){
	var userInput = GetUserInput();
	if(!userInput){
		userInput = $('#txtResult').val();
	}
	if(userInput && userInput!= 0 && IsValidOperator()){
		$('#txtHistory').val((userInput + ' - '));
	}
});
$('#btnMultiply').click(function(){
	var userInput = GetUserInput();
	if(!userInput){
		userInput = $('#txtResult').val();
	}
	if(userInput && userInput!= 0 && IsValidOperator()){
		$('#txtHistory').val((userInput + ' × '));
	}
});

$('#btnDivision').click(function(){
	var userInput = GetUserInput();
	if(!userInput && userInput!= 0){
		userInput = $('#txtResult').val();
	}
	if(userInput && userInput!= 0 && IsValidOperator()){
		$('#txtHistory').val((userInput + ' ÷ '));
	}
});

$('#btnOpeningParentheses').click(function(){
	var userInput = GetUserInput();
	if(!userInput){
		userInput = $('#txtResult').val();
	}
	if(userInput && IsValidParenthesis()){
		if(userInput!= 0){
			$('#txtHistory').val((userInput + '('));
		}
		else{
			$('#txtHistory').val('(');
		}
	}
});

$('#btnClosingParentheses').click(function(){
	var userInput = GetUserInput();
	if(!userInput){
		userInput = $('#txtResult').val();
	}
	if(userInput && userInput!= 0 && IsValidParenthesis()){
		$('#txtHistory').val((userInput + ')'));
		CalculateResult();
	}
});

$('#btnPercentage').click(function(){
	var previousInput = GetPriviousInput();
	var amountToApplyPercentage = previousInput.substring(0, previousInput.length - 3);
	try{
		amountToApplyPercentage = eval(RemoveUnSupportedCharacters(amountToApplyPercentage));
		var result = eval( amountToApplyPercentage * GetCurrentInput() / 100);
		if(result){
			$('#txtHistory').val((previousInput + result));
			CalculateResult();
		}
	}
	catch(e){
		console.log(e);
	}
});

$('#btnSquare').click(function(){
	var currentInput = GetCurrentInput();
	var result = currentInput * currentInput;
	if(result){
		$('#txtHistory').val((GetPriviousInput() + result));
	}
	CalculateResult();
});

$('#btnSquareRoot').click(function(){
	var result = Math.sqrt(GetCurrentInput());
	if(result){
		$('#txtHistory').val((GetPriviousInput() + result));
		CalculateResult();
	}
});

$('#btnPlusMinus').click(function(){
	var result = GetCurrentInput();
	result =  result > 1 ? -Math.abs(result) : Math.abs(result);
	if(result){
		$('#txtHistory').val((GetPriviousInput() + result));
		CalculateResult();
	}
});

$('#btnEqual').click(function(){
	CalculateResult();
	$('#txtHistory').val('');
});


function AddDigit(digit){
	previousInput = GetPriviousInput();
	var newInput = GetCurrentInput() + digit;
	if(previousInput){
		$('#txtHistory').val(previousInput +  newInput);
	}
	else{
		$('#txtHistory').val(newInput);
	}
}

function GetUserInput(){
	return $('#txtHistory').val();
}

function GetPriviousInput(){
	var userInput = $('#txtHistory').val();
	var lastSpace = userInput.lastIndexOf(' ');
	var previousInput = userInput.substring(0, lastSpace + 1);
	return previousInput;
}

function GetCurrentInput(){
	var userInput = $('#txtHistory').val();
	var lastSpace = userInput.lastIndexOf(' ');
	var currentInput = userInput.slice(lastSpace + 1);
	return currentInput;
}

function GetNumberOfPeriod(){
	return GetCurrentInput().split('.').length - 1;
}

function CalculateResult(){
	userInput = RemoveUnSupportedCharacters(GetUserInput());
	try{
		userInput = eval(userInput);
		$('#txtResult').val(userInput);
	}
	catch(e){

	}
}

function RemoveUnSupportedCharacters(x){
	x = x.replace(/×/g, '*');
	x = x.replace(/÷/g, '/');
	return x;
}

function IsValidOperator(){
	var userInput = GetUserInput();
	if(userInput.length > 2){
		var operator = userInput[userInput.length-2];
		if( operator !='+' && operator !='-' && operator != '÷' && operator != '×' && operator != '(' && operator != ')' )
			return true;
		return false;
	}
	return true;
}

function IsValidParenthesis(){
	var userInput = GetUserInput();
	var operator = userInput[userInput.length-1];
	if( operator != '(' && operator != ')' )
		return true;
	return false;
}

$(document).keypress(function(e) {
	if(e.which == 48 || e.which == 96){
		$('#btnZero').click();
	}
	else if(e.which == 56  || e.which == 104){
		$('#btnEight').click();
	}
	else if(e.which == 53 || e.which == 101){
		$('#btnFive').click();
	}
	else if(e.which == 57 || e.which == 105){
		$('#btnNine').click();
	}
});

$(document).keydown(function(e) {
	if(e.shiftKey && e.which == 48){
		$('#btnClosingParentheses').click();
	}
	else if(e.which == 49 || e.which == 97){
		$('#btnOne').click();
	}
	else if(e.which == 50 || e.which == 98){
		$('#btnTwo').click();
	}
	else if(e.which == 51 || e.which == 99){
		$('#btnThree').click();
	}
	else if(e.which == 52 || e.which == 100){
		$('#btnFour').click();
	}
	else if(e.shiftKey && e.which == 53){
		e.preventDefault();
		$('#btnPercentage').click();
	}
	else if(e.which == 54 || e.which == 102){
		$('#btnSix').click();
	}
	else if(e.which == 55 || e.which == 103){
		$('#btnSeven').click();
	}
	else if(e.shiftKey && e.which == 57){
		$('#btnOpeningParentheses').click();
	}
	else if( (e.shiftKey && e.which == 56) || e.which == 106){
		e.preventDefault();
		$('#btnMultiply').click();
	}
	else if((e.shiftKey && e.which == 187) || e.which == 107){
		$('#btnAdd').click();
	}
	else if((e.shiftKey && e.which == 189) || e.which == 109){
		$('#btnSubstract').click();
	}
	else if(e.which == 190 || e.which == 110){
		$('#btnPeriod').click();
	}
	else if(e.which == 191  || e.which == 111){
		$('#btnDivision').click();
	}
	else if(e.which == 13 || e.which == 187){
		$('#btnEqual').click();
	}
	else if(e.which == 8){
		$('#btnClear').click();
	}
});
