
const $btnSubmit = $('#btnSubmit');
const $table = $('#tblFaculties');
const $modal = $('#facultyModal');
const $acronym = $('#txtAcronym');
const $name = $('#txtName');
const $title = $('#modalTitle');
$(function () {
    LoadFaculties();
});
$btnSubmit.click(function () {
    const acronym = $acronym.val().trim();
    const name = $name.val().trim();

    // Validate input
    if (!validateInput(acronym, 'Faculty acronym can not be blank. Please enter acronym', $acronym)) return;
    if (!validateInput(name, 'Faculty name can not be blank. Please enter name', $name)) return;

    // Determine the action (insert or update)
    const action = id == 0 ? 'insert' : 'update';
    const url = `/admin/faculty/${action}`;
    const data = { acronym, name };
    if (action === 'update') data.id = id;

    makeAjaxRequest(url,data,'post')
    .then(response=>{
        let rs = JSON.parse(response);
                if ([200, 201].includes(rs.code)) {
                    showToast(rs.header, rs.msg, rs.icon);
                    $modal.modal('hide');
                    LoadFaculties();
                } else {
                    Swal.fire({
                        title: rs.header,
                        text: rs.msg,
                        icon: rs.icon
                    });
                }

        if ([200, 201].includes(data.code)){
            showToast(data.header,data.msg,data.icon);
        }      
    })
});





function LoadFaculties() {
    makeAjaxRequest('/admin/faculty/select', {}, 'get')
        .then(data => {
            $table.empty();
            let idx = 1;
            data.faculties.forEach(f => {
                $table.append(`
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
        })

}
var id = 0;


function update_faculty(id) {
    this.id = id;
    makeAjaxRequest('/admin/faculty/detail', { id }, 'get')
        .then(data => {
            if (data.code == 200) {
                $modal.modal('show');
                $acronym.val(data.faculty.Acronym);
                $name.val(data.faculty.Name);
                $title.text('Update faculty');
            }
        })
}
function delete_faculty(id) {
    confirmDiaglog("Are you sure want to delete this faculty?", "You won't be able to revert this!", "question", "Yes, delete it!", "No, cancel!")
        .then(_ => {
            makeAjaxRequest('/admin/faculty/delete', { id },'post')
            .then(response=>{
                let rs = JSON.parse(response);
                if ([200, 201].includes(rs.code)) {
                    showToast(rs.header, rs.msg, rs.icon);
                    $modal.modal('hide');
                    LoadFaculties();
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
$modal.on('hide.bs.modal', function () {
    id = 0;
    $acronym.val('');
    $name.val('');
    $title.text('Create new faculty');
});