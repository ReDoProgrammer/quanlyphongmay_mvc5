const $table = $('#tblSemesters');
const $btnSubmit = $('#btnSubmit');
const $name = $('#txtName');
const $order = $('#txtOrder');
const $modal = $('#semesterModal');
const $title = $('#modalTitle');
const $form = $('#semesterForm');

var id = 0;
$(function () {
    LoadSemesters();
    $form.validate({
        rules: {
            name: { required: true },
            order: { required: true, min: 1 }
        },
        messages: {
            name: {
                required: "<span class='text-danger'>Please enter semester name.</span>"
            },
            order: {
                required: "<span class='text-danger'>Require.</span>",
                min: "<span class='text-danger'>Must be at least 1.</span>"
            }
        },
        onkeyup: function (element) {
            $(element).valid();
            checkFormState(); // Kiểm tra trạng thái form mỗi khi có sự kiện keyup
        },
        invalidHandler: function (event, validator) {
            $btnSubmit.hide(); // Ẩn nút submit khi form không hợp lệ
        },
        submitHandler: function (form) {
            form.submit(); // Nộp form khi tất cả các trường đều hợp lệ
        }
    })
    // Sự kiện khi modal hiện lên
    $modal.on('shown.bs.modal', function () {
        checkFormState(); // Kiểm tra trạng thái của form và cập nhật trạng thái của nút submit
    });
})

$btnSubmit.click(function () {
    let name = $name.val().trim();
    let order = $order.val();

    let action = id == 0 ? 'insert' : 'update';
    let url = `/admin/semester/${action}`;
    let data = id == 0 ? { name, order } : { id, name, order };
    makeAjaxRequest(url, data, 'post')
        .then(response => {
            let rs = JSON.parse(response);
            if ([200, 201].includes(rs.code)) {
                showToast(rs.header, rs.msg, rs.icon);
                $modal.modal('hide');
                LoadSemesters();
            } else {
                Swal.fire({
                    title: rs.header,
                    text: rs.msg,
                    icon: rs.icon
                });
            }
        })
        .catch(err => {
            console.log(err);
        })

})

function delete_semester(id) {
    confirmDiaglog("Are you sure want to delete this semester?", "You won't be able to revert this!", "question", "Yes, delete it!", "No, cancel!")
        .then(_ => {
            makeAjaxRequest('/admin/semester/delete', { id }, 'post')
                .then(data => {
                    let rs = JSON.parse(data);
                    if ([200, 201].includes(rs.code)) {
                        showToast(rs.header, rs.msg, rs.icon);
                    } else {
                        Swal.fire({
                            title: rs.header,
                            text: rs.msg,
                            icon: rs.icon
                        });
                    }
                    LoadSemesters();
                })
        })
}

function semester_detail(id) {
    this.id = id;
    makeAjaxRequest('/admin/semester/detail', { id }, 'get')
        .then(data => {
            if (data.code == 200) {
                $modal.modal();
                $name.val(data.semester.name);
                $order.val(data.semester.order);
                $title.text('Update semester info');
            }
        })
        .catch(err => {
            console.log(err);
        })
}

function LoadSemesters() {
    makeAjaxRequest('/admin/semester/select', {}, 'get')
        .then(data => {
            $table.empty();
            let idx = 1;
            data.forEach(s => {
                $table.append(`
                <tr id = "${s.id}">
                    <td>${idx++}</td>
                    <td class="fw-bold text-info">${s.name}</td>
                    <td>${s.order}</td>
                    <td class="text-right">
                        <button class="btn btn-xs btn-warning" title="Update semester" onClick = "semester_detail(`+ s.id + `)"><i class="fa fa-edit"></i></button>
                        <button class="btn btn-xs btn-danger" title="Delete semester" onClick = "delete_semester(`+ s.id + `)"><i class="fa fa-trash-o"></i></button>
                    </td>
                </tr>
            `);
            })
        })
}

function checkFormState() {
    if ($form.valid()) {
        $btnSubmit.show();
    } else {
        $btnSubmit.hide();
    }
}

$modal.on('hidden.bs.modal', function () {
    //thiết lập các giá trị mặc định cho các input
    id = 0;
    $name.val('');
    $order.val(1);
    $title.text('Create a new semester');
})