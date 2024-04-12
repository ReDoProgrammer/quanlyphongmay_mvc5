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
const $pagination = $('#pagination');
var id = 0;
var page = 1;
const $tblProgresses = $('#tblProgresses');
function InitData() {
    let current_year = new Date().getFullYear();
    for (i = current_year - 5; i <= current_year + 10; i++) {
        $slSchoolYears.append(`<option ${i == current_year ? 'selected' : ''} value="${i}-${i + 1}">${i}-${i + 1}</option>`);
        $slSchoolYears1.append(`<option ${i == current_year ? 'selected' : ''} value="${i}-${i + 1}">${i}-${i + 1}</option>`);
    }
    Promise.all([LoadFaculties,LoadLecturers,LoadSemesters,LoadSubjects])
    .then(data=>{
        console.log(data);
    })
    // $btnSearch.click();    

}

function LoadLecturers() {
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: '/admin/lecturer/listactived',
            type: 'get',
            success: function (data) {
                if (data.code == 200) {
                    return resolve(data.lecturers)
                }
                return reject();
            }
        })
    })
}
function LoadFaculties() {
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: '/admin/faculty/select',
            type: 'get',
            success: function (data) {
                return resolve(data);
            },
            error: function(xhr, status, error) {
                reject(error);
            }
        })
    })
}

$btnSearch.click(function () {
    let lecturer_id = $slLecturers1.val();
    let subject_id = $slSubjects1.val();
    let semester_id = $slSemesters1.val();
    let school_year = $slSchoolYears1.val();
    let classroom_id = $slClassRooms1.val();
    let keyword = $txtKeyword.val().trim();

    $.ajax({
        url: '/admin/teachingprogress/filter',
        type: 'get',
        data: { lecturer_id, subject_id, semester_id, school_year, classroom_id, keyword, page },
        success: function (data) {
            $pagination.empty();
            $tblProgresses.empty();
            let result = jQuery.parseJSON(data)
            if(result == null) return;
            if (result.code == 200) {
                let progresses = JSON.parse(JSON.parse(result.json_output)[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']);
                let idx = (page-1)*10;
                progresses.forEach(p=>{
                    $tblProgresses.append(`
                        <tr id="${p.Id}">
                            <td>${++idx}</td>
                            <td>${p.faculty_acronym}</td>
                            <td>${p.subject_name}</td>
                            <td>${p.classroom}</td>
                            <td>${p.lecturer_fullname}</td>
                            <td>${p.school_year}</td>
                            <td><i class="${p.status == 0?'text-danger':'text-success'}">${p.status_name}</i></td>
                            <td></td>
                        </tr>
                    `);
                })
                for(i = 1; i<=result.total_pages; i++){
                    $pagination.append(` <li ${i == result.current_page?'class="active"':''}><a href="#">${i}</a></li>`)
                }
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
        if (isNaN(number_of_students) || number_of_students < 1) {
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
    const data = { lecturer_id, subject_id, semester_id, school_year, number_of_students, classroom_id };
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
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: '/admin/subject/select',
            type: 'get',
            success: function (data) {
                return resolve(data);
            }
        })
    })
}

function LoadSemesters() {
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: '/admin/semester/select',
            type: 'get',
            success: function (data) {
                return resolve(data);               
            }
        })
    })
}