/* ---------------------------------------------
 Contact form
 --------------------------------------------- */
$(document).ready(function () {
    $("#submit_btn").click(function () {

        //get input field values
        var user_name = $('input[name=name]').val();
        var user_email = $('input[name=email]').val();
        var user_message = $('textarea[name=message]').val();

        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if (user_name == "") {
            $('input[name=name]').css('border-color', '#e41919');
            proceed = false;
        }
        if (user_email == "") {
            $('input[name=email]').css('border-color', '#e41919');
            proceed = false;
        }

        if (user_message == "") {
            $('textarea[name=message]').css('border-color', '#e41919');
            proceed = false;
        }

        //everything looks good! proceed...
        if (proceed) {
            fetch('/api/send-mailmessage', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: user_name,
                    email: user_email,
                    message: user_message
                })
            })

            if (response.status === 200) {
                output = '<div class="success">' + response.text + '</div>';
                // reset values in all input fields
                $('#contact_form input').val('');
                $('#contact_form textarea').val('');
            } else {
                output = '<div class="error">' + response.text + '</div>';
            }


            // $.post('contact_me.php', post_data, function(response){

            //     //load json data from server and output message     
            //     if (response.type == 'error') {
            //         output = '<div class="error">' + response.text + '</div>';
            //     }
            //     else {

            //         output = '<div class="success">' + response.text + '</div>';

            //         //reset values in all input fields
            //         $('#contact_form input').val('');
            //         $('#contact_form textarea').val('');
            //     }

                $("#result").hide().html(output).slideDown();
            // }, 'json');

        }

        return false;
    });

    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form input, #contact_form textarea").keyup(function () {
        $("#contact_form input, #contact_form textarea").css('border-color', '');
        $("#result").slideUp();
    });

});
