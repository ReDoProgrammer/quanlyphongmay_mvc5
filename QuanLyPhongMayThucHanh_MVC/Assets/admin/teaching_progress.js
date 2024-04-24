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

const $modal = $('#progressModal');

function InitData() {
    let current_year = new Date().getFullYear();
    for (i = current_year - 5; i <= current_year + 10; i++) {
        $slSchoolYears.append(`<option ${i == current_year ? 'selected' : ''} value="${i}-${i + 1}">${i}-${i + 1}</option>`);
        $slSchoolYears1.append(`<option ${i == current_year ? 'selected' : ''} value="${i}-${i + 1}">${i}-${i + 1}</option>`);
    }

    Promise.all([
        makeAjaxRequest('/admin/faculty/select'),
        makeAjaxRequest('/admin/lecturer/ListActived'),
        makeAjaxRequest('/admin/semester/Select'),
        makeAjaxRequest('/admin/subject/Select')
    ])
        .then(async data => {

            await data[0].faculties.forEach(f => {
                $slFaculties.append(`<option value="${f.Id}">${f.Acronym} - ${f.Name}</option>`);
                $slFaculties1.append(`<option value="${f.Id}">${f.Acronym} - ${f.Name}</option>`);
            })
            $slFaculties.trigger('change');
            $slFaculties1.trigger('change');

            data[1].lecturers.forEach(l => {
                $slLecturers.append(`<option value="${l.id}">${l.fullname} (${l.username})</option>`)
                $slLecturers1.append(`<option value="${l.id}">${l.fullname} (${l.username})</option>`)
            })

            data[2].forEach(s => {
                $slSemesters.append(`<option value="${s.id}">${s.name}</option>`);
                $slSemesters1.append(`<option value="${s.id}">${s.name}</option>`);
            })
            data[3].forEach(s => {
                $slSubjects.append(`<option value="${s.Id}">${s.Acronym} - ${s.Name}</option>`)
                $slSubjects1.append(`<option value="${s.Id}">${s.Acronym} - ${s.Name}</option>`)
            })
            var queryParams = {
                faculty_id: $slFaculties1.val()
            };
            makeAjaxRequest('/admin/classroom/SelectByFaculty', queryParams)
                .then(async data => {
                    await data.classrooms.forEach(c => {
                        $slClassRooms.append(`<option value="${c.Id}">${c.Acronym} - ${c.Name}</option>`);
                        $slClassRooms1.append(`<option value="${c.Id}">${c.Acronym} - ${c.Name}</option>`);
                    });
                    $btnSearch.click();
                })
        })

}

function update_progress(id){
    makeAjaxRequest('/admin/teachingprogress/detail',{id}, 'get')
    .then(data=>{
        this.id = id;
        $modal.modal();
        let progress = data.progress;
        console.log(progress);
        $slFaculties.val(progress.FacultyId);
        $slClassRooms.val(progress.ClassRoomId);
        $slSubjects.val(progress.SubjectId);
        $slSchoolYears.val(progress.SchoolYear);
        $slSemesters.val(progress.SemesterId);
        $txtNumberOfStudents.val(progress.NumberOfStudents);
    })
}

function delete_progress(id){
    console.log(id);
}

$btnSubmit.click(function () {
    let number_of_students = $txtNumberOfStudents.val();
    if (!$.isNumeric(number_of_students)) {
        $.toast({
            heading: 'Data is invalid',
            text: 'The number of students is incorrect',
            icon: 'warning',
            loader: true,        // Change it to false to disable loader
            loaderBg: '#9EC600'  // To change the background
        })
        return;
    }
    if (number_of_students < 10) {
        $.toast({
            heading: 'Data is invalid',
            text: 'There must be at least 10 students.',
            icon: 'warning',
            loader: true,        // Change it to false to disable loader
            loaderBg: '#9EC600'  // To change the background
        })
        return;
    }
    makeAjaxRequest('/admin/TeachingProgress/Insert', {
        lecturer_id: $slLecturers.val(),
        subject_id: $slSubjects.val(),
        semester_id: $slSemesters.val(),
        school_year: $slSchoolYears.val(),
        number_of_students: number_of_students,
        classroom_id: $slClassRooms.val()
    }, 'post')
        .then(data => {
            $.toast({
                heading: data.header,
                text: data.msg,
                icon: data.icon,
                loader: true,        // Change it to false to disable loader
                loaderBg: '#9EC600'  // To change the background
            })
            $modal.modal('hide');
            $btnSearch.click();
        })
})

$btnSearch.click(function () {
    const url = '/admin/teachingprogress/filter';
    const data = {
        lecturer_id: $slLecturers1.val(),
        subject_id: $slSubjects1.val(),
        semester_id: $slSemesters1.val(),
        school_year: $slSchoolYears1.val(),
        classroom_id: $slClassRooms1.val(),
        keyword: $txtKeyword.val().trim(),
        page: page
    };
    makeAjaxRequest(url, data, 'get')
        .then(data => {
            console.log(data);
            $tblProgresses.empty();
            let idx = (page - 1) * 10;
            data.progresses.forEach(p => {
                $tblProgresses.append(`
                <tr id = "${p.Id}">
                    <td>${++idx}</td>
                    <td>${p.FacultyAcronym}</td>
                    <td>${p.SubjectName}</td>
                    <td>${p.ClassRoom}</td>
                    <td>${p.LecturerFullname} (${p.LecturerUsername})</td>
                    <td>${p.SchoolYear}</td>
                    <td class="text-right">${p.NumberOfStudents}</td>
                    
                    <td class="text-right">
                        <button class="btn btn-xs btn-warning ${p.Status ? 'disabled' : ''}" title="Update progress" onClick = "update_progress(` + p.Id + `)"><i class="fa fa-edit"></i></button>
                        <button class="btn btn-xs btn-danger ${p.Status ? 'disabled' : ''}" title="Delete progress" onClick = "delete_progress(` + p.Id + `)"><i class="fa fa-trash-o"></i></button>
                    </td>
                </tr>
            `);
            })
        })
        .catch(err => {
            console.log(err);
        })
})


$slFaculties1.on('change', function () {
    var queryParams = {
        faculty_id: $slFaculties1.val()
    };
    $slClassRooms1.empty();
    makeAjaxRequest('/admin/classroom/SelectByFaculty', queryParams, 'get')
        .then(data => {
            data.classrooms.forEach(c => {
                $slClassRooms1.append(`<option value="${c.Id}">${c.Acronym} - ${c.Name}</option>`);
            });
        })
})
$slFaculties.on('change', function () {
    var queryParams = {
        faculty_id: $slFaculties.val()
    };
    $slClassRooms.empty();
    makeAjaxRequest('/admin/classroom/SelectByFaculty', queryParams, 'get')
        .then(data => {
            data.classrooms.forEach(c => {
                $slClassRooms.append(`<option value="${c.Id}">${c.Acronym} - ${c.Name}</option>`);
            });
        })
})

