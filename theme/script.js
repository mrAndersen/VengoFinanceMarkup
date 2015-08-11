// JavaScript Document

$(function(){
	$('.transferAmmount-helpIcon').hover(function(){
		$('.transferAmmount-helpText').show();
	},function(){
		$('.transferAmmount-helpText').hide();
	});
	
	// add shadow
	$('#proceedBox input').longShadow({
		colorShadow: '#e8e2e2',
		sizeShadow: 100,
		directionShadow: 'bottom-right'
	});
	
	// add top & bottom frame
	$('body').append('<div id="topFrame"></div><div id="bottomFrame"></div>');
	
	// card number mask
	$('#PayTransferForm_card, #PayTransferForm_payment_to').mask('0000 0000 0000 0000');
});