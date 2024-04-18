const $txtUsername = $('#txtUsername');
const $txtPassword = $('#txtPassword');
const $txtConfirmPassword = $('#txtConfirmPassword');
const $txtFullname = $('#txtFullname');
const $txtEmail = $('#txtEmail');
const $txtPhone = $('#txtPhone');
const $slFaculties = $('#slFaculties');
const $slPositions = $('#slPositions');
const $btnSubmit = $('#btnSubmit');

$(function () {
    LoadFaculties();
    LoadPositions();

    // Thêm các phương thức kiểm tra
    $.validator.addMethod("noSpecialChars", function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
    }, "<span class='text-danger'>Username must not contain special characters, spaces, or Vietnamese accented letters.</span>");

    $.validator.addMethod("validPassword", function (value, element) {
        return this.optional(element) || /^[^\s\u0100-\u024F\u1E00-\u1EFF]+$/.test(value);
    }, "<span class='text-danger'>Password must not contain spaces or Vietnamese accented characters.</span>");

    $.validator.addMethod("checkUsernameExist", function (value, element) {
        var result = false;
        $.ajax({
            url: '/account/checkusername', // API URL
            type: 'GET',
            async: false, // Đặt async thành false để đảm bảo giá trị được trả về sau khi AJAX hoàn thành
            data: { username: value },
            success: function (data) {
                result = !data.exists; // Nếu username tồn tại, trả về false
            }
        });
        return result;
    }, "<span class='text-danger'>Username already exists.</span>");

    // Thêm phương thức kiểm tra số điện thoại
    $.validator.addMethod("validPhone", function (value, element) {
        return this.optional(element) || /^\d{10}$/.test(value) && value.startsWith("0");
    }, "<span class='text-danger'>Phone number must be 10 digits long and start with 0.</span>");


    $.validator.addMethod("checkEmailExist", function (value, element) {
        var result = false;
        $.ajax({
            url: '/account/checkemail', // API URL
            type: 'GET',
            async: false, // Đặt async thành false để đảm bảo giá trị được trả về sau khi AJAX hoàn thành
            data: { email: value },
            success: function (data) {
                result = !data.exists;
            }
        });
        return result;
    }, "<span class='text-danger'>Email already exists.</span>");


    // Cấu hình validation
    $("#registration-form").validate({
        rules: {
            username: {
                required: true,
                noSpecialChars: true,
                minlength: 3, // Độ dài tối thiểu là 3
                checkUsernameExist: true // Thêm phương thức kiểm tra username tồn tại vào quy tắc validate của trường username
            },
            fullname: {
                required: true,
                minlength: 3, // Độ dài tối thiểu là 3
            },
            email: {
                required: true,
                email: true,
                checkEmailExist: true
            },
            password: {
                required: true,
                validPassword: true
            },
            confirm_password: {
                required: true,
                equalTo: "#txtPassword"
            },
            phone: {
                required: true,
                validPhone: true
            }
        },
        messages: {
            username: {
                required: "<span class='text-danger'>Please enter a username.</span>",
                noSpecialChars: "<span class='text-danger'>Only alphanumeric characters are allowed.</span>",
                minlength: "<span class='text-danger'>Username must be at least 3 characters long.</span>"
            },
            fullname: {
                required: "<span class='text-danger'>Please enter your fullname.</span>",
                minlength: "<span class='text-danger'>Fullname must be at least 3 characters long.</span>"
            },
            email: {
                required: "<span class='text-danger'>Please enter an email address.</span>",
                email: "<span class='text-danger'>Please enter a valid email address.</span>"
            },
            password: {
                required: "<span class='text-danger'>Please enter a password.</span>"
            },
            confirm_password: {
                required: "<span class='text-danger'>Please confirm your password.</span>",
                equalTo: "<span class='text-danger'>The passwords do not match.</span>"
            },
            phone: {
                required: "<span class='text-danger'>Please enter a phone number.</span>"
            }
        },
        onkeyup: function (element) {
            $(element).valid();
            checkFormState();
        },
        invalidHandler: function (event, validator) {
            $btnSubmit.hide();
        },
        submitHandler: function (form) {
            form.submit();
        }
    });

    function checkFormState() {
        if ($("#registration-form").valid()) {
            $btnSubmit.show();
        } else {
            $btnSubmit.hide();
        }
    }

    // Kiểm tra trạng thái ban đầu của form
    checkFormState();
});


$btnSubmit.click(function () {
    let username = $txtUsername.val();
    let password = $txtPassword.val();
    let fullname = $txtFullname.val();
    let email = $txtEmail.val();
    let phone = $txtPhone.val();
    let faculty_id = $slFaculties.val();
    let position_id = $slPositions.val();

    $.ajax({
        url: '/account/signup',
        type: 'post',
        data: { username, password, fullname, email, phone, faculty_id, position_id },
        success: function (data) {
            if (data.code == 201) {
                Swal.fire({
                    title: "SUCCESSFULLY",
                    text: data.msg,
                    icon: "success"
                }).then(_=>{
                    window.location.href = '/account/login';
                });
            }
        }
    })
})

function LoadFaculties() {
    makeAjaxRequest('/account/getfaculties')
        .then(data => {
            data.faculties.forEach(f => {
                $slFaculties.append(`<option value="${f.Id}">${f.Acronym} - ${f.Name}</option>`)
            })
        })
}

function LoadPositions() {
    makeAjaxRequest('/account/getpositions')
        .then(data => {
            data.positions.forEach(p => {
                $slPositions.append(`<option value="${p.Id}">${p.Acronym} - ${p.Name}</option>`)
            })
        })
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}


function makeAjaxRequest(url, queryParams) {
    // Nếu queryParams chưa được khai báo, gán một đối tượng trống cho nó
    queryParams = queryParams || {};

    // Chuyển đổi đối tượng JSON thành chuỗi truy vấn
    var queryString = Object.entries(queryParams)
        .map(([key, value]) => key + '=' + encodeURIComponent(value))
        .join('&');

    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url + '?' + queryString); // Thêm queryString vào URL
        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(Error(xhr.statusText));
            }
        };
        xhr.onerror = function () {
            reject(Error("Network Error"));
        };
        xhr.send();
    });
}




