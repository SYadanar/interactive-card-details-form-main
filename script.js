btnConfirm = document.getElementById("btn-confirm");

inputCardholderName = document.getElementById("inputCardholderName");
inputCardNumber = document.getElementById("inputCardNumber");
inputExpDate_M = document.getElementById("inputExpDate_M");
inputExpDate_Y = document.getElementById("inputExpDate_Y");
inputCVCNumber = document.getElementById("inputCVCNumber");

cardholder_name_div = document.getElementById("cardholder_name_div");
cardnumber_div = document.getElementById("cardnumber_div");
expdate_div = document.getElementById("expdate_div");
cvc_number_div = document.getElementById("cvc_number_div");

cardholder_name = document.getElementById("cardholder_name");
card_number = document.getElementById("card_number");
exp_month = document.getElementById("exp_month");
exp_year = document.getElementById("exp_year");
cvc_number = document.getElementById("cvc_number");

thank_you_div = document.getElementById("thank_you_div");
input_form = document.getElementById("input_form");

btnContinue = document.getElementById("btn-continue");



/*          Add Options to Drapdowns          */

var option;
for (let i = 1; i <= 12; i++){
	option = document.createElement("option");
	if (i < 10){
		option.innerHTML = "0" + i;
	} else{
		option.innerHTML = i;
	}
	inputExpDate_M.appendChild(option);
}

currentYear = new Date().getFullYear().toString().substr(2);
for (let i = 0; i <= (parseInt(currentYear) + 5); i++){
	option = document.createElement("option");
	if (i < 10){
		option.innerHTML = "0" + i;
	} else{
		option.innerHTML = i;
	}
	inputExpDate_Y.appendChild(option);
}



/*          KeyUp Events          */

inputCardholderName.addEventListener("keyup", () => {
	cardholder_name.innerHTML = inputCardholderName.value;

	removeErrorAlart(inputCardholderName, cardholder_name_div);
})

inputCardNumber.addEventListener("keyup", () => {
	if(!inputCardNumber.value.match(/^[0-9 ]*$/)){
		setErrorAlert(inputCardNumber, cardnumber_div, "Wrong Format, numbers only")
	} else{
		cardNum = inputCardNumber.value.replace(/\s+/g, '');	/* Remove Spaces */
		cardNum = cardNum.match(/.{1,4}/g).join(" ");	/* Add Space after every 4 digits*/
		card_number.innerHTML = inputCardNumber.value = cardNum;

		removeErrorAlart(inputCardNumber, cardnumber_div);
	}
})

inputCVCNumber.addEventListener("keyup", () => {
	if(!inputCVCNumber.value.match(/^[0-9 ]*$/)){
		setErrorAlert(inputCVCNumber, cvc_number_div, "Wrong Format, numbers only")
	} else{
		cvc_number.innerHTML = inputCVCNumber.value;

		removeErrorAlart(inputCVCNumber, cvc_number_div);
	}
})



/*          OnChange Events          */

inputExpDate_M.addEventListener("change", () => {
	exp_month.innerHTML = inputExpDate_M.value;

	if(inputExpDate_Y.value == ""){
		removeInputErrorClass(inputExpDate_M);
	} else{
		removeErrorAlart(inputExpDate_M, expdate_div);
	}
})

inputExpDate_Y.addEventListener("change", () => {
	exp_year.innerHTML = inputExpDate_Y.value;

	if(inputExpDate_M.value == ""){
		removeInputErrorClass(inputExpDate_Y);
	} else{
		removeErrorAlart(inputExpDate_Y, expdate_div);
	}
})



/*          OnClick Events          */

btnConfirm.addEventListener("click", () => {
	var ready = true;

	if(inputCardholderName.value == ""){
		ready = false;
		setErrorAlert(inputCardholderName, cardholder_name_div, "Can't be blank");
	}

	if(inputCardNumber.value == ""){
		ready = false;
		setErrorAlert(inputCardNumber, cardnumber_div, "Can't be blank");
	}
	else{
		if(!inputCardNumber.value.match(/^[0-9 ]*$/)){
			ready = false;
			setErrorAlert(inputCardNumber, cardnumber_div, "Wrong Format, numbers only");
		}
		else{
			if(inputCardNumber.value.replace(/\s+/g, '').length != 16){
				ready = false;
				setErrorAlert(inputCardNumber, cardnumber_div, "Card Number must have only 16 digits");
			}
		}
	}

	if(inputExpDate_M.value == ""){
		ready = false;
		setErrorAlert(inputExpDate_M, expdate_div, "Can't be blank");
	}

	if(inputExpDate_Y.value == ""){
		ready = false;
		setErrorAlert(inputExpDate_Y, expdate_div, "Can't be blank");
	}

	if(!inputCVCNumber.value.match(/^[0-9 ]*$/)){
		ready = false;
		setErrorAlert(inputCVCNumber, cvc_number_div, "Wrong Format, numbers only");
	}

	if(inputCVCNumber.value == ""){
		ready = false;
		setErrorAlert(inputCVCNumber, cvc_number_div, "Can't be blank");
	}

	if(ready){
		input_form.classList.add("d-none");
		thank_you_div.classList.remove("d-none");
	}
})

btnContinue.addEventListener("click", () => {
	input_form.classList.remove("d-none");
	thank_you_div.classList.add("d-none");
})



function setErrorAlert(selfID, parentID, Msg){
	selfID.classList.add("input-error");
	parentID.getElementsByClassName("form-control-error")[0].innerHTML = Msg;
}

function removeInputErrorClass(selfID){
	selfID.classList.remove("input-error");
}

function removeErrorAlart(selfID, parentID){
	removeInputErrorClass(selfID);
	parentID.getElementsByClassName("form-control-error")[0].innerHTML = "";
}