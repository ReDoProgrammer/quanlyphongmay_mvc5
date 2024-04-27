var id = 0;
const $btnSubmit = $('#btnSubmit');
const $slFaculties = $('#slFaculties');
const $slPositions = $('#slPositions');
const $txtFullname = $('#txtFullname');
const $txtUsername = $('#txtUsername');
const $txtPassword = $('#txtPassword');
const $txtRepeatPassword = $('#txtRepeatPassword');
const $txtPhone = $('#txtPhone');
const $txtEmail = $('#txtEmail');
const $btnSearch = $('#btnSearch');
const $tblLecturers = $('#tblLecturers');

const $form = $('#lecturerform');
const $modal = $('#lecturerModal');
const $title = $('#modalTitle');

$(function () {
    LoadFaculties();
    LoadPositions();

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
            data: { username: value,id },
            success: function (data) {
                result = !data.exists; // Nếu username tồn tại, trả về false
            }
        });
        return result;
    }, "<span class='text-danger'>Username already exists.</span>");

    $.validator.addMethod("validPhone", function (value, element) {
        return this.optional(element) || /^\d{10}$/.test(value) && value.startsWith("0");
    }, "<span class='text-danger'>Phone number must be 10 digits long and start with 0.</span>");


    $.validator.addMethod("checkEmailExist", function (value, element) {
        var result = false;        
        $.ajax({
            url: '/account/checkemail', // API URL
            type: 'GET',
            async: false, // Đặt async thành false để đảm bảo giá trị được trả về sau khi AJAX hoàn thành
            data: { email: value,id },
            success: function (data) {
                result = !data.exists;
            }
        });
        return result;
    }, "<span class='text-danger'>Email already exists.</span>");

    $.validator.addMethod("checkPhoneExist", function (value, element) {
        var result = false;        
        $.ajax({
            url: '/account/checkphone', // API URL
            type: 'GET',
            async: false, // Đặt async thành false để đảm bảo giá trị được trả về sau khi AJAX hoàn thành
            data: { phone: value,id },
            success: function (data) {
                result = !data.exists;
            }
        });
        return result;
    }, "<span class='text-danger'>Phone number already exists.</span>");

    $form.validate({
        rules: {
            username: {
                required: true,
                noSpecialChars: true,
                minlength: 3, 
                checkUsernameExist: true 
            },
            fullname: {
                required: true,
                minlength: 3
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
                equalTo: $txtPassword
            },
            phone: {
                required: true,
                validPhone: true,
                checkPhoneExist:true
            }
        },
        messages: {
            username: {
                required: "<span class='text-danger'>Please enter a username.</span>",
                noSpecialChars: "<span class='text-danger'>Only alphanumeric characters are allowed.</span>",
                minlength: "<span class='text-danger'>Username must be at least 3 characters long.</span>"
            },
            fullname: {
                required: "<span class='text-danger'>Please enter lecturer fullname.</span>",
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
                required: "<span class='text-danger'>Please confirm lecturer password.</span>",
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



    // Sự kiện khi modal hiện lên
    $modal.on('shown.bs.modal', function () {
        console.log(id);
        checkFormState(); // Kiểm tra trạng thái của form và cập nhật trạng thái của nút submit
    });
});

function checkFormState() {
    if ($form.valid()) {
        $btnSubmit.show();
    } else {
        $btnSubmit.hide();
    }
}


$btnSubmit.click(function () {
    const faculty_id = $slFaculties.val();
    const position_id = $slPositions.val();
    const fullname = $txtFullname.val().trim();
    const username = $txtUsername.val().trim();
    const password = $txtPassword.val().trim();
    const phone = $txtPhone.val().trim();
    const email = $txtEmail.val().trim();
   

    // Determine the action (insert or update)
    const action = id == 0 ? 'insert' : 'update';
    const url = `/admin/lecturer/${action}`;
    const data = { faculty_id, position_id, fullname, username, password, phone, email };
    if (action === 'update') data.id = id;

    makeAjaxRequest(url,data,'post')
    .then(response=>{
        let rs = JSON.parse(response);
        if ([200, 201].includes(rs.code)) {
            showToast(rs.header, rs.msg, rs.icon);
            $modal.modal('hide');
            $btnSearch.click();
        } else {
            Swal.fire({
                title: rs.header,
                text: rs.msg,
                icon: rs.icon
            });
        }
    })
    .catch(err=>{
        console.log(err);
    })

  
})




$btnSearch.click(function () {
    let faculty_id = $slFaculties.val();
    let keyword = $('#txtKeyword').val();
    $.ajax({
        url: '/admin/lecturer/search',
        type: 'get',
        data: { faculty_id, keyword },
        success: function (data) {
            $tblLecturers.empty();
            let idx = 1;
            data.lecturers.forEach(l => {
                $tblLecturers.append(`
                        <tr id="${l.id}">
                        <td >${idx++}</td>
                        <td class="fw-bold">${l.faculty}</td>
                        <td>${l.position}</td>
                        <td class="fw-bold">${l.username}</td>
                        <td>${l.fullname}</td>
                        <td>${l.email}</td>
                        <td>${l.phone}</td>
                        <td>${l.status}</td>
                        <td class="text-right">
                            <button class="btn btn-xs btn-warning" title="Update faculty" onClick = "update_lecturer(`+ l.id + `)"><i class="fa fa-edit"></i></button>
                            <button class="btn btn-xs btn-danger" title="Delete faculty" onClick = "delete_lecturer(`+ l.id + `)"><i class="fa fa-trash-o"></i></button>
                        </td>
                    </tr>
                `);
            })
        }
    })
})
$modal.on('hidden.bs.modal', function () {
    id = 0;
    $txtFullname.val('');
    $txtUsername.val('');
    $txtUsername.attr("readonly", false);
    $txtPassword.attr("readonly", false);
    $txtRepeatPassword.attr("readonly", false);
    $txtPhone.val('');
    $txtEmail.val('');
})

function update_lecturer(id) {
    this.id = id;
    makeAjaxRequest('/admin/lecturer/detail',{id},'get')
    .then(data=>{
        if (data.code == 200) {
            $modal.modal();
            $title.text('Update lecturer info');
            let l = data.lecturer;
            $slPositions.val(l.position_id)
            $txtFullname.val(l.fullname);
            $txtUsername.val(l.username);
            $txtUsername.attr("readonly", true);
            $txtPassword.attr("readonly", true);
            $txtRepeatPassword.attr("readonly", true);
            $txtPhone.val(l.phone);
            $txtEmail.val(l.email);
        }
    })
    .catch(err=>{
        console.log(err);
    })   
}
function delete_lecturer(id) {
    confirmDiaglog("Are you sure want to delete this lecturer?", "You won't be able to revert this!", "question", "Yes, delete it!", "No, cancel!")
        .then(_ => {
            makeAjaxRequest('/admin/lecturer/delete', { id },'post')
            .then(response=>{
                let rs = JSON.parse(response);
                if ([200, 201].includes(rs.code)) {
                    showToast(rs.header, rs.msg, rs.icon);
                    $modal.modal('hide');
                    $btnSearch.click();
                } else {
                    Swal.fire({
                        title: rs.header,
                        text: rs.msg,
                        icon: rs.icon
                    });
                }
            })
            .catch(err=>{
                console.log(err);
            })
        })
}




function LoadFaculties() {
    makeAjaxRequest('/admin/faculty/select',{},'get')
    .then(data=>{
        $slFaculties.empty();
        data.faculties.forEach(f => {
            $slFaculties.append(`<option value="${f.Id}">${f.Acronym} - ${f.Name}</option>`);
        })
        $btnSearch.click();
    })    
}

function LoadPositions() {
    makeAjaxRequest('/admin/position/select',{},'get')
    .then(data=>{
        $slPositions.empty();
        data.positions.forEach(p => {
            $slPositions.append(`<option value = "${p.Id}">${p.Acronym} - ${p.Name}</option>`)
        })
    })
    
}

