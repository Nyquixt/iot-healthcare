(function ($) {
    $('#serialNum').val('');
    $('#clickType').val('');
    $('#phoneNum').val('');

    $('form').submit(e => {
        e.preventDefault();

        //ajax request
        $.ajax({
            url: 'https://55yc79y6i0.execute-api.us-east-1.amazonaws.com/Test/iot-btn',
            method: 'POST',
            statusCode: 200,
            crossDomain: true,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                serialNum: $('#serialNum').val(),
                clickType: $('#clickType').val(),
                phoneNum: $('#phoneNum').val()
            }),
            success: function (data) {
                //log out the message 'a notification has been sent to phone
                //number ...' to the 'screen'
                console.log(data);
                //clear input
                $('#serialNum').val('');
                $('#clickType').val('');
                $('#phoneNum').val('');
            }
        });
    });
})(jQuery);