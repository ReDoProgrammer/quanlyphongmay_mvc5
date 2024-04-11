$(function () {
    LoadFaculties();
});
const $btnSubmit = $('#btnSubmit');
const $txtAcronym = $('#txtAcronym');
const $txtName = $('#txtName');

$btnSubmit.click(function () {
    const acronym = $txtAcronym.val().trim();
    const name = $txtName.val().trim();

    // Validate input
    if (!validateInput(acronym, 'Faculty acronym can not be blank. Please enter acronym', $txtAcronym)) return;
    if (!validateInput(name, 'Faculty name can not be blank. Please enter name', $txtName)) return;

    // Determine the action (insert or update)
    const action = id == 0 ? 'insert' : 'update';
    const url = `/admin/faculty/${action}`;
    const data = { acronym, name };
    if (action === 'update') data.id = id;

    // Execute the AJAX call
    executeAjaxCall(url, data);
});

function validateInput(value, message, $element) {
    if (value.length === 0) {
        showToast('Validation', message, 'warning');
        $element.select();
        return false;
    }
    return true;
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

function executeAjaxCall(url, data) {
    $.ajax({
        url: url,
        type: 'post',
        data: data,
        success: function (response) {
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
        $('#facultyModal').modal('hide');
    } else {
        Swal.fire({
            title: data.header,
            text: data.msg,
            icon: data.icon
        });
    }
    LoadFaculties();
}
function LoadFaculties() {
    $.ajax({
        url: '/admin/faculty/select',
        type: 'get',
        success: function (data) {
            $('#tblFaculties').empty();
            let idx = 1;
            data.faculties.forEach(f => {
                $('#tblFaculties').append(`
                    <tr id="${f.Id}">
                        <td>${idx++}</td>
                        <td class="fw-bold">${f.Acronym}</td>
                        <td>${f.Name}</td>
                        <td class="text-right">
                            <button class="btn btn-xs btn-warning" title="Update faculty" onClick = "update_faculty(`+ f.Id + `)"><i class="fa fa-edit"></i></button>
                            <button class="btn btn-xs btn-danger" title="Delete faculty" onClick = "delete_faculty(`+ f.Id + `)"><i class="fa fa-trash-o"></i></button>
                        </td>
                    </tr>
                `);
            })
        }
    })
}
var id = 0;


function update_faculty(id) {
    id = id;
    $.ajax({
        url: '/admin/faculty/detail',
        type: 'get',
        data: { id },
        success: function (data) {
            if (data.code == 200) {
                $('#facultyModal').modal('show');
                $('#txtAcronym').val(data.faculty.Acronym);
                $('#txtName').val(data.faculty.Name);
                $('#modalTitle').text('Update faculty');
            }
        }
    })
}
function delete_faculty(id){
    confirmDiaglog("Are you sure want to delete this faculty?", "You won't be able to revert this!", "question", "Yes, delete it!", "No, cancel!")
    .then(_=>{
        executeAjaxCall('/admin/faculty/delete', {id}) 
    })
}
$('#facultyModal').on('hide.bs.modal', function () {
    id = 0;
    $('#txtAcronym').val('');
    $('#txtName').val('');
});