$(function () {
    LoadFaculties();
    LoadPositions();

});
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

$btnSubmit.click(function () {
    const faculty_id = $slFaculties.val();
    const position_id = $slPositions.val();
    const fullname = $txtFullname.val().trim();
    const username = $txtUsername.val().trim();
    const password = $txtPassword.val().trim();
    const rpassword = $txtRepeatPassword.val().trim();
    const phone = $txtPhone.val().trim();
    const email = $txtEmail.val().trim();

    // Validate input
    if (!validateInput(fullname, 'Lecturer fullname can not be blank. Please enter it', $txtFullname)) return;
    if (!validateInput(username, 'Username can not be blank. Please enter username', $txtUsername)) return;
    if (!validateInput(password, 'Password can not be blank. Please enter username', $txtPassword)) return;
    if (!validateInput(rpassword, 'Password does not match the second time.', $txtRepeatPassword)) return;
    if (!validateInput(email, 'Email can not be blank.', $txtEmail)) return;

    // Determine the action (insert or update)
    const action = id == 0 ? 'insert' : 'update';
    const url = `/admin/lecturer/${action}`;
    const data = { faculty_id, position_id, fullname, username, password, phone, email };
    if (action === 'update') data.id = id;

    // Execute the AJAX call
    executeAjaxCall(url, data);
})

function validateInput(value, message, $element) {
    if (value.length === 0) {
        showToast('Validation', message, 'warning');
        $element.select();
        return false;
    }
    return true;
}


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
$('#lecturerModal').on('hidden.bs.modal', function () {
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
    $.ajax({
        url: '/admin/lecturer/detail',
        type: 'get',
        data: { id },
        success: function (data) {
            console.log(data);
            if (data.code == 200) {
                $('#lecturerModal').modal();
                $('#modalTitle').text('Update lecturer info');
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
        }
    })
}
function delete_lecturer(id){
    confirmDiaglog("Are you sure want to delete this lecturer?", "You won't be able to revert this!", "question", "Yes, delete it!", "No, cancel!")
    .then(_=>{
        executeAjaxCall('/admin/lecturer/delete', {id}) 
    })
}
function executeAjaxCall(url, data) {
    $.ajax({
        url: url,
        type: 'post',
        data: data,
        success: function (response) {
            console.log(response);
            handleResponse(response);
        },
        error: function () {
            Swal.fire('Error', 'An unexpected error occurred. Please try again later.', 'error');
        }
    });
}

function handleResponse(data) {
    if ([200, 201].includes(data.code)) {
        showToast(data.header, data.msg, data.icon);
        $('#lecturerModal').modal('hide');
    } else {
        Swal.fire({
            title: data.header,
            text: data.msg,
            icon: data.icon
        });
    }
    $btnSearch.click();

}


function LoadFaculties() {
    $.ajax({
        url: '/admin/faculty/select',
        type: 'get',
        success: function (data) {
            $('#slFaculties').empty();
            data.faculties.forEach(f => {
                $('#slFaculties').append(`<option value="${f.Id}">${f.Acronym} - ${f.Name}</option>`);
            })
            $btnSearch.click();
        }
    })
}

function LoadPositions() {
    $.ajax({
        url: '/admin/position/select',
        type: 'get',
        success: function (data) {
            $('#slPositions').empty();
            data.positions.forEach(p => {
                $('#slPositions').append(`<option value = "${p.Id}">${p.Acronym} - ${p.Name}</option>`)
            })
        }
    })
}

function showToast(heading, text, icon) {
    $.toast({
        heading: heading,
        text: text,
        icon: icon,
        loader: true,
        loaderBg: '#9EC600'
    });
}
