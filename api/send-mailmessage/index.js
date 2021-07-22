module.exports = async function (context, req) {

    // build a POST request to verify the captcha
    var r = {
        uri: 'https://www.google.com/recaptcha/api/siteverify',
        method: 'post',
        form: {
            secret: '6Lf_y7EbAAAAAHAPVdRZ3Mcn3VrkRm0Y9gCe44s8',
            response: req.recaptcha
        }
    }

    // make HTTP request to verify the captcha
    request(r, (err, response, body) => {
        // if reCaptcha succeeds
        if (response.success == true) {
            var email = {
                subject: "New " + req.body.type + " form submission from: " + req.body.name,
                content: [{
                    type: 'text/plain',
                    value: req.body.message
                }]
            };

            return {
                res: {
                    status: 200
                },
                message: email
            };
        } else {
            return {
                res: {
                    status: response.error-codes
                }
            };
        }
    })
};
