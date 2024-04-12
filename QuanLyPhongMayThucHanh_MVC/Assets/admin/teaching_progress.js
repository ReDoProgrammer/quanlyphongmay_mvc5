$(function () {
    InitData();
})
const $slSchoolYears = $('#slSchoolYears');
const $slSchoolYears1 = $('#slSchoolYears1');
const $slSemesters = $('#slSemesters');
const $slSemesters1 = $('#slSemesters1');
const $slSubjects = $('#slSubjects');
const $slSubjects1 = $('#slSubjects1');
const $slFaculties = $('#slFaculties');
const $slFaculties1 = $('#slFaculties1');
const $slClassRooms = $('#slClassrooms');
const $slClassRooms1 = $('#slClassrooms1');
const $slLecturers = $('#slLecturers');
const $slLecturers1 = $('#slLecturers1');
const $btnSubmit = $('#btnSubmit');
const $txtNumberOfStudents = $('#txtNumberOfStudents');
const $txtKeyword = $('#txtKeyword');
const $btnSearch = $('#btnSearch');
var id = 0;
var page = 1;
const $tblProgresses = $('#tblProgresses');
function InitData() {
    let current_year = new Date().getFullYear();
    for (i = current_year - 5; i <= current_year + 10; i++) {
        $slSchoolYears.append(`<option ${i == current_year ? 'selected' : ''} value="${i}-${i + 1}">${i}-${i + 1}</option>`);
        $slSchoolYears1.append(`<option ${i == current_year ? 'selected' : ''} value="${i}-${i + 1}">${i}-${i + 1}</option>`);
    }
    LoadSemesters();
    LoadSubjects();
    LoadFaculties();
    LoadLecturers();
}

function LoadLecturers() {
    $.ajax({
        url: '/admin/lecturer/listactived',
        type: 'get',
        success: function (data) {
            if (data.code == 200) {
                data.lecturers.forEach(l => {
                    $slLecturers.append(`<option value="${l.id}">${l.fullname} (${l.username})</option>`);
                    $slLecturers1.append(`<option value="${l.id}">${l.fullname} (${l.username})</option>`);
                })
            }
        }
    })
}
function LoadFaculties() {
    $.ajax({
        url: '/admin/faculty/select',
        type: 'get',
        success: function (data) {
            data.faculties.forEach(f => {
                $slFaculties.append(`<option value="${f.Id}">${f.Acronym} - ${f.Name}</option>`);
                $slFaculties1.append(`<option value="${f.Id}">${f.Acronym} - ${f.Name}</option>`);
            })
            $slFaculties.trigger('change');
            $slFaculties1.trigger('change');

        }
    })
}

$btnSearch.click(function(){
    let lecturer_id = $slLecturers1.val();
    let subject_id = $slSubjects1.val();
    let semester_id = $slSemesters1.val();
    let school_year = $slSchoolYears1.val();
    let classroom_id = $slClassRooms1.val();
    let status = 0;
    let keyword = $txtKeyword.val().trim();
    
    $.ajax({
        url:'/admin/teachingprogress/filter',
        type:'get',
        data:{lecturer_id,subject_id,semester_id,school_year,classroom_id,keyword,page},
        success:function(data){
            
           if(data.code == 200){
            let idx = 1;
            data.progresses.forEach(p=>{
                $tblProgresses.append(`
                    <tr id="${p.Id}">
                        <td></td>
                    
                    </tr>
                `);
            })
           }
        }
    })
})

$slFaculties.change(function () {
    let faculty_id = $(this).val();
    $.ajax({
        url: '/admin/classroom/selectbyfaculty',
        type: 'get',
        data: { faculty_id },
        success: function (data) {
            $slClassRooms.empty();
            data.classrooms.forEach(c => {
                $slClassRooms.append(`<option value="${c.Id}">${c.Acronym} - ${c.Name}</option>`)
            })
        }
    })
})
$slFaculties1.change(function () {
    let faculty_id = $(this).val();
    $.ajax({
        url: '/admin/classroom/selectbyfaculty',
        type: 'get',
        data: { faculty_id },
        success: function (data) {
            $slClassRooms1.empty();
            data.classrooms.forEach(c => {
                $slClassRooms1.append(`<option value="${c.Id}">${c.Acronym} - ${c.Name}</option>`)
            })
        }
    })
})
$btnSubmit.click(function () {
    let classroom_id = $slClassRooms.val();
    let subject_id = $slSubjects.val();
    let school_year = $slSchoolYears.val();
    let semester_id = $slSemesters.val();
    let lecturer_id = $slLecturers.val();
    let number_of_students = 0;
    try {
        number_of_students = parseInt($txtNumberOfStudents.val());
        if (isNaN(number_of_students) ||  number_of_students < 1) {
            Swal.fire({
                title: "Data validation",
                text: "Invalid number of students",
                icon: "warning"
            });
            $txtNumberOfStudents.select();
            return;
        }
    } catch (error) {
        Swal.fire({
            title: "Data validation",
            text: "Invalid number of students",
            icon: "warning"
        });
        $txtNumberOfStudents.select();
        return;
    }

    const action = id == 0 ? 'insert' : 'update';
    const url = `/admin/teachingprogress/${action}`;
    const data = { lecturer_id, subject_id, semester_id, school_year, number_of_students, classroom_id};
    if (action === 'update') data.id = id;

    // Execute the AJAX call
    executeAjaxCall(url, data);


})
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
        $('#progressModal').modal('hide');
    } else {
        Swal.fire({
            title: data.header,
            text: data.msg,
            icon: data.icon
        });
    }
    $btnSearch.click();

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

function LoadSubjects() {
    $.ajax({
        url: '/admin/subject/select',
        type: 'get',
        success: function (data) {
            data.forEach(s => {
                $slSubjects.append(`<option value="${s.Id}">${s.Acronym} - ${s.Name}</option>`)
                $slSubjects1.append(`<option value="${s.Id}">${s.Acronym} - ${s.Name}</option>`)
            })
        }
    })
}

function LoadSemesters() {
    $.ajax({
        url: '/admin/semester/select',
        type: 'get',
        success: function (data) {

            data.forEach(s => {
                $slSemesters.append(`<option value="${s.id}">${s.name}</option>`);
                $slSemesters1.append(`<option value="${s.id}">${s.name}</option>`);
            })

        }
    })
}