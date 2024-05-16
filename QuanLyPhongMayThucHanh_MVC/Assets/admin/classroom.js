const $modal = $('#classroomModal');
const $title = $('#modalTitle');
const $slFromYears = $('#slFromYears');
const $slToYears = $('#slToYears');
const $txtName = $('#txtName');
const $btnSubmit = $('#btnSubmit');
const $btnSearch = $('#btnSearch');
const $txtKeyword = $('#txtKeyword');
const $slAllFaculties = $('#slAllFaculties');
const $table = $('#tblClassrooms');
var id = 0;
$(function(){
    let current_date = new Date();
    for(i =  current_date.getFullYear()-5; i<=current_date.getFullYear()+10; i++ ){
        $slFromYears.append(`<option value="${i}">${i}</option>`);
    }
    $slFromYears.trigger('change');
    makeAjaxRequest('/admin/faculty/select',null,'get')
    .then(data=>{
        if(data.code == 200){
            data.faculties.forEach(f=>{
                $slAllFaculties.append(`<option value=${f.Id}>${f.Name}</option>`)
            })
            LoadClassrooms();
        }
    })
   
})

function delete_classroom(id){
    confirmDiaglog("Are you sure want to delete this classroom?", "You won't be able to revert this!", "question", "Yes, delete it!", "No, cancel!")
    .then(_ => {
        makeAjaxRequest('/admin/classroom/delete', { id }, 'post')
            .then(response => {
                let rs = JSON.parse(response);
                if ([200, 201].includes(rs.code)) {
                    showToast(rs.header, rs.msg, rs.icon);
                    $modal.modal('hide');
                    LoadClassrooms();
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
}


function classroom_detail(id){
    this.id = id;
    makeAjaxRequest('/admin/classroom/detail',{id},'get')
    .then(data=>{
        if(data.code == 200){
            $modal.modal();
            $slAllFaculties.val(data.cr.FacultyId);
            let arr = data.cr.AcademicYear.split('-');
            $slFromYears.val(arr[0]);
            $slToYears.val(arr[1]);
            $txtName.val(data.cr.Name);
        }
    })
    .catch(err=>{
        console.log(err);
    })
}

$btnSubmit.click(function(){
    let faculty_id = $slAllFaculties.val();
    let name = $txtName.val().trim();
    let academic_year = `${$slFromYears.val()}-${$slToYears.val()}`;
    if (!validateInput(name, 'Classroom name can not be blank.', $txtName)) return;

    let action = id == 0?'Create':'update';
    let data = id == 0?{name,academic_year,faculty_id}:{id,name,academic_year,faculty_id};
    let url = `/admin/classroom/${action}`;
    makeAjaxRequest(url,data,'post')
    .then(response=>{
        let rs = JSON.parse(response);
        if ([200, 201].includes(rs.code)) {
            showToast(rs.header, rs.msg, rs.icon);
            $modal.modal('hide');
            LoadClassrooms();
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

$btnSearch.click(function(){
    LoadClassrooms();
})

function LoadClassrooms(){
    let faculty_id = $slAllFaculties.val();
    let keyword = $txtKeyword.val().trim();
    makeAjaxRequest('/admin/classroom/select',{faculty_id,keyword},'get')
    .then(data=>{
        $table.empty();
        if(data.code == 200){
            let idx = 1;
            data.classrooms.forEach(c=>{
                $table.append(`<tr>
                    <td>${idx++}</td>
                    <td class="text-warning">${c.FacultyName}</td>
                    <td class="fw-bold">${c.Acronym}</td>
                    <td>${c.Name}</td>
                    <td>${c.AcademicYear}</td>
                    <td class="text-right">
                        <button class="btn btn-xs btn-warning" title="Update classroom" onClick = "classroom_detail(`+ c.Id + `)"><i class="fa fa-edit"></i></button>
                        <button class="btn btn-xs btn-danger" title="Delete classroom" onClick = "delete_classroom(`+ c.Id + `)"><i class="fa fa-trash-o"></i></button>
                    </td>
                </tr>`)
            })
        }

    })
    .catch(err=>{
        console.log(err);
    })
}
$slFromYears.on('change',function(){
    let current_date = new Date();
    $slToYears.empty();
    for(i =  $slFromYears.val(); i<=current_date.getFullYear()+10; i++ ){
        $slToYears.append(`<option value="${i}">${i}</option>`);
    }
})

$modal.on('hidden.bs.modal', function () {
    id = 0;
    $title.text('Create a new classroom');
    $txtName.val('');   
})