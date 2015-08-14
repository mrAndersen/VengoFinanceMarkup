// JavaScript Document

$(function(){
	// card number mask
	$('#PayTransferForm_payment_to_stub').mask('0000 0000 0000 0000');
});


function form_update_bank_class(el)
{
    var val = $(el).val().trim();
    var bank_first = val.substr(0, 1);
    var bank_two = val.substr(0, 2);

    $(el).removeClass("visa master");
    if (bank_first == "4") {
        $(el).addClass("visa");
    } else if (bank_first == "5") {
        $(el).addClass("master");
    }
}
