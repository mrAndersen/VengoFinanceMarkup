function form_update_bank_class(el)
{
    if(el.getAttribute('id') == 'PayTransferForm_card'){
        var firstIndex      = parseInt($(el).val().trim().substr(0,1));
        var target          = $('.senderCard-numberInput');
        var largetTarget    = $('.senderCard');

        target.removeClass('visa master-card');
        largetTarget.removeClass('visa master-card');

        if(firstIndex == 5){
            target.addClass('master-card');
            largetTarget.addClass('master-card');
        }else{
            target.addClass('visa');
            largetTarget.addClass('visa');
        }
    }
}

function isValidForm()
{
    var validity = true;
    var targets = $('#PayTransferForm_card, #PayTransferForm_exp_month, #PayTransferForm_exp_year, #PayTransferForm_cvc2, #PayTransferForm_payment_to, #PayTransferForm_amount');

    targets.each(function(k,v){
        if(v.value == ''){
            validity = false;
        }
    });

    return validity;
}

$(function(){
    //Неможко говнокода :)
    $('.senderCard-numberInput').addClass('visa');
    $('.senderCard').addClass('visa');
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

    $('#PayTransferForm_payment_to').mask('0000 0000 0000 0000');
    $('#PayTransferForm_card').mask('0000 0000 0000 0000');

    $('#transferBox.success h4').text('Перевод отправлен');
    $('#transferBox.success .content:first').append('<div class="true-sum"><div class="legend">Сумма</div><div class="sum"></div><div class="spacer" style="clear: both;"></div></div>');

    $('#transferBox.success .content .col:last p:nth-child(2) b').remove();
    $('#transferBox.success .content .col:last p:nth-child(2)').hide();
    $('#transferBox.success .content .col:last p:nth-child(3)').hide();
    $('#transferBox.success .content .col:last p:nth-child(4)').hide();


    $('.true-sum .sum').text($('#transferBox.success .content .col:last p:nth-child(2)').text().trim());
    $('#transferBox.success #proceedBox form button').text('Завершить');


    var strVar="";
    strVar += "<div class=\"confirm\">";
    strVar += "    <div class=\"confirm-title\">";
    strVar += "        Подтверждение";
    strVar += "    <\/div>";
    strVar += "    <table class=\"pay-data\">";
    strVar += "        <tr>";
    strVar += "            <td>Карта отправителя<\/td>";
    strVar += "            <td class=\"card-sender-number\"><\/td>";
    strVar += "        <\/tr>";
    strVar += "        <tr>";
    strVar += "            <td>Карта получателя<\/td>";
    strVar += "            <td class=\"card-receiver-number\"><\/td>";
    strVar += "        <\/tr>";
    strVar += "        <tr>";
    strVar += "            <td>Сумма перевода<\/td>";
    strVar += "            <td class=\"transfer-sum\"><\/td>";
    strVar += "        <\/tr>";
    strVar += "        <tr>";
    strVar += "            <td>Комиссия<\/td>";
    strVar += "            <td class=\"transfer-commission\"><\/td>";
    strVar += "        <\/tr>";
    strVar += "        <tr>";
    strVar += "            <td>Итого<\/td>";
    strVar += "            <td class=\"transfer-total\"><\/td>";
    strVar += "        <\/tr>";
    strVar += "    <\/table>";
    strVar += "    <div class=\"hr\"><\/div>";
    strVar += "    <div class=\"confirm-message\">";
    strVar += "        Нажимая на кнопку, я соглашаюсь<br>";
    strVar += "        <a target=\"_blank\" href=\"http://rfibank.ru/upload/docs/P2Prules.pdf\">с условиями использования сервиса<\/a>";
    strVar += "    <\/div>";
    strVar += "    <div class=\"transfer-cash\">";
    strVar += "        Перевести";
    strVar += "    <\/div>";
    strVar += "";
    strVar += "    <div class=\"logo\"><\/div>";
    strVar += "<\/div>";

    $('body').append(strVar);


    $('#payment-form').submit(function(e){
        e.preventDefault();

        if(isValidForm()){
            $('.card-sender-number').text("**** " + $('#PayTransferForm_card').val().split(' ')[3]);
            $('.card-receiver-number').text("**** " + $('#PayTransferForm_payment_to').val().split(' ')[3]);
            $('.transfer-sum').text($('#PayTransferForm_amount').val());
            $('.transfer-commission').text($('#transferCommission').text());
            $('.transfer-total').text($('#transferTotalAmount').text());


            $('.confirm').show();
            $('#page').hide();
        }
    });

    $('#agreeBox input[type="checkbox"]').trigger('click');

    $(document).on('click','.transfer-cash',function(e){
        e.preventDefault();
        $('#payment-form').submit();
    });
});