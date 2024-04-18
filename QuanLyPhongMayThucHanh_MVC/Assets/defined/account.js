const $txtUsername =  $('#txtUsername');
const $txtPassword = $('#txtPassword');
const $btnLogin = $('#btnLogin');
$(function () {
    $('#dtpBirthdate').datetimepicker({
        format: 'DD/MM/YYYY',
        defaultDate: new Date()       
    });


    $.validator.addMethod("noSpecialChars", function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
    }, "<span class='text-danger'>Username must not contain special characters, spaces, or Vietnamese accented letters.</span>");

    $.validator.addMethod("validPassword", function (value, element) {
        return this.optional(element) || /^[^\s\u0100-\u024F\u1E00-\u1EFF]+$/.test(value);
    }, "<span class='text-danger'>Password must not contain spaces or Vietnamese accented characters.</span>");

    $("#registration-form").validate({
        rules: {
            username: {
                required: true,
                noSpecialChars: true,
                minlength: 3
            },            
            password: {
                required: true,
                validPassword: true
            }           
        },
        messages: {
            username: {
                required: "<span class='text-danger'>Please enter a username.</span>",
                noSpecialChars: "<span class='text-danger'>Only alphanumeric characters are allowed.</span>",
                minlength: "<span class='text-danger'>Username must be at least 3 characters long.</span>"
            },
            
            password: {
                required: "<span class='text-danger'>Please enter a password.</span>"
            }            
        },
        onkeyup: function (element) {
            $(element).valid();
            checkFormState();
        },
        invalidHandler: function (event, validator) {
            $btnLogin.hide();
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    function checkFormState() {
        if ($("#registration-form").valid()) {
            $btnLogin.show();
        } else {
            $btnLogin.hide();
        }
    }
})
$btnLogin.click(function (e) {
    e.preventDefault();
    let username = $txtUsername.val();
    let password = $txtPassword.val();

    //validation
    if (username.trim().length == 0) {
        $.toast({
            heading: 'Tài khoản không thể để trống!',
            text: 'Vui lòng nhập tài khoản',
            showHideTransition: 'fade',
            icon: 'error'
        })
       $txtUsername.select();
        return;
    }
    if (password.trim().length == 0) {
        $.toast({
            heading: 'Mật khẩu không thể để trống!',
            text: 'Vui lòng nhập tài khoản',
            showHideTransition: 'fade',
            icon: 'error'
        })
       $txtPassword.select();
        return;
    }

    $.ajax({
        url: '/account/login',
        type: 'post',
        data: { username, password},
                success: function(data) {
                    if (data.code != 200) {
                        $.toast({
                            heading: 'Warning',
                            text: data.msg,
                            showHideTransition: 'plain',
                            icon: 'warning'
                        })
                        return;
                    }
                    localStorage.setItem('activeMenuHref', '/');
                    window.location.href = '/';
                }
    })
})