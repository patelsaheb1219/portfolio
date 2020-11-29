'use strict';


//Validation forms
function validateForm(selector) {
    Array.from(document.querySelectorAll(selector)).forEach(item => {
        item.addEventListener('input', (e) => {
            if(e.target.value === ''){
            item.dataset.touched = false;
            }
        });
        item.addEventListener('invalid', () => {
            item.dataset.touched = true;
        });
        item.addEventListener('blur', () => {
            if (item.value !== '') item.dataset.touched = true;
        });
    });
};

validateForm('.js-form .form-field');

var form = document.querySelector('.js-form');
var formName = '.js-form';

form.addEventListener('submit', function(e){
    submitForm(e, formName);
});

function submitForm(e, formName) {
    e.preventDefault();
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();

    $.ajax({
        type: "POST",
        url: 'https://personal-nodemailer.herokuapp.com/sendEmail',
        data: JSON.stringify({ 
            "name": name,
            "sender_mail": email,
            "subject": "CONTACT ME: patelsaheb.com",
            "message": message,
            "receiver": "kaumik1219@gmail.com"  
        }),
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        success: function () {
            $("#getCodeModal").modal('show');
            $("#name").val("");
            $("#email").val("");
            $("#message").val("");
        },
        error: function () {
            console.log('error');
            //...
        }
    });
}