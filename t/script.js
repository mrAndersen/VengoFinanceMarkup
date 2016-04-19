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
    var targets2 = $('#PayTransferForm_card_em_, #PayTransferForm_cvc2_em_, #PayTransferForm_cvc2_em_');

    targets.each(function(k,v){
        if(v.value == ''){
            validity = false;
        }
    });

    targets2.each(function(k,v){
        console.log(v.innerHTML);
        if(v.innerHTML != '' && $(v).css('display') != 'none'){
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

    $('#transferBox.success:not(.waiting) h4').text('Перевод отправлен');
    $('#transferBox.success:not(.waiting) .content:first').append('' +
    '<div class="true-sum">' +
        '<div class="legend">Сумма</div>' +
        '<div class="sum"></div>' +
        '<div class="spacer" style="clear: both;"></div>' +
    '</div>');

    $('#transferBox.success:not(.waiting) .content:first').append('' +
    '<div class="order-id">' +
        '<div class="legend">ID заказа</div>' +
        '<div class="order-id-value"></div>' +
        '<div class="spacer" style="clear: both;"></div>' +
    '</div>');

    $('#transferBox.success:not(.waiting) .content .col:last p:nth-child(2) b').remove();
    $('#transferBox.success:not(.waiting) .content .col:last p:nth-child(2)').hide();

    $('#transferBox.success:not(.waiting) .content .col:last p:nth-child(3) b').remove();
    $('#transferBox.success:not(.waiting) .content .col:last p:nth-child(3)').hide();

    $('#transferBox.success:not(.waiting) .content .col:last p:nth-child(4) b').remove();
    $('#transferBox.success:not(.waiting) .content .col:last p:nth-child(4)').hide();


    $('.true-sum .sum').text($('#transferBox.success:not(.waiting) .content .col:last p:nth-child(2)').text().trim());
    $('.order-id-value').text($('#transferBox.success:not(.waiting) .content .col:last p:nth-child(3)').text().trim());
    $('.tr-id-value').text($('#transferBox.success:not(.waiting) .content .col:last p:nth-child(4)').text().trim());

    $('#transferBox.success:not(.waiting) #proceedBox form button').text('Завершить');

    if($('#PayTransferForm_card').length > 0){
        $('#submitBox .content').prepend('<div class="vengo-errors">Не все поля заполнены корректно</div>');
    }

    $('input').keyup(function(){
        if(this.value.length == $(this).attr("maxlength") && $(this).attr('maxlength') != undefined){
            $(this).next().focus();
        }
    });

    $( "div[id*='em']").css('visibility','hidden').css('height','0px');


    $('#payment-form').submit(function(e){

        if(!isValidForm()){
            e.preventDefault();

            $('.vengo-errors').show();
            $('.vengo-errors').css('visibility','visible').delay(3500).queue(function(next){
                $(this).css('visibility','hidden');
                next();
            });
        }
    });

    $(document).on('click','.transfer-cash',function(e){
        e.preventDefault();
        $('#payment-form').submit();
    });
});