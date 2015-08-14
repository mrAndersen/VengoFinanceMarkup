$(function(){
    //Неможко говнокода :)
    $('#PAYTRANSFER_HEADER_ADAPTIVE').prepend('<div class="card-title">ВАША КАРТА</div>');
    $('#PAYTRANSFER_HEADER_ADAPTIVE').prepend('<div class="title">Отправить перевод</div>');
    $('#send_button').val('Продолжить');
    $('.transferAmmount-commissionLabel').text('Комиссия составляет');
    $('.totalAmount-label').text('СУММА ПЕРЕВОДА');
    //Чуть больше говнокода
    $('.senderCard-cvcLabel p:eq(1)').remove();
    $('.senderCard').after('<div class="card-to-title">Карта получателя </div>');
    $(".transferAmmount").before($("#receiverCard"));
    $(".transferAmmount").before($("#commission"));
    $('.transferAmmount-commissionLabel').detach().insertAfter('.totalAmount');
    $('.transferAmmount-commission').detach().insertAfter('.totalAmount');
    //Говнокод вселенского масштаба
    $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');
});