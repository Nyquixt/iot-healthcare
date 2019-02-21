(function ($) {
    "use strict";
    $('#home').hide();
    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            } else {
                $(this).removeClass('has-val');
            }
        })
    })

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }


    /*==================================================================
    [ Show / hide Form ]*/

    $('.contact100-btn-hide').on('click', function () {
        $('.wrap-contact100').fadeOut(400);
        $('#home').hide();
    })

    $('.contact100-btn-show').on('click', function () {
        $('.wrap-contact100').fadeIn(400);
        $('#home').show();
    })

    //post message and info to AWS for processing
    $('#submit').click(e => {
        e.preventDefault();
        $.ajax({
            url: 'https://55yc79y6i0.execute-api.us-east-1.amazonaws.com/Test/contact',
            method: 'POST',
            statusCode: 200,
            data: JSON.stringify({
                name: $('#name').val(),
                email: $('#email').val(),
                message: $('#message').val()
            }), //you have to stringify this!!!
            success: function(data){
                $('#name').val('');
                $('#email').val('');
                $('#message').val('');
                $('#more').text('Thank you ' + data.name + ' for being interested in our project!')
            }
        });
    });

})(jQuery);