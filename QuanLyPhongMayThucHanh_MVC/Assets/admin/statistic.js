const $slSchoolYears = $('#slSchoolYears');
const $slSemesters = $('#slSemesters');
const $slSubjects = $('#slSubjects');
const $slFaculties = $('#slFaculties');
const $slClassRooms = $('#slClassrooms');
const $slLecturers = $('#slLecturers');
const $btnSubmit = $('#btnSubmit');
const $txtNumberOfStudents = $('#txtNumberOfStudents');
const $txtKeyword = $('#txtKeyword');
const $btnSearch = $('#btnSearch');
const $pagination = $('#pagination');
const $slPageSize = $('#slPageSize');
const $fromdate = $('#dtpFromDate');
const $todate = $('#dtpToDate');
var id = 0;
var page = 1;
const $tblProgresses = $('#tblProgresses');

const $modal = $('#progressModal');


$(function () {

    $fromdate.datetimepicker({
        format: 'DD/MM/YYYY HH:mm',
        defaultDate: moment().set({date:1,hour: 0, minute: 1})
    });
    $todate.datetimepicker({
        format: 'DD/MM/YYYY HH:mm',
        defaultDate: moment().set({hour: 23, minute: 59})
    })
    InitData();
})


function InitData() {
    let current_year = new Date().getFullYear();
    for (i = current_year; i <= current_year + 10; i++) {
        $slSchoolYears.append(`<option ${i == current_year ? 'selected' : ''} value="${i}-${i + 1}">${i}-${i + 1}</option>`);
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
            })
            $slFaculties.trigger('change');

            data[1].lecturers.forEach(l => {
                $slLecturers.append(`<option value="${l.id}">${l.fullname} (${l.username})</option>`)
            })

            data[2].forEach(s => {
                $slSemesters.append(`<option value="${s.id}">${s.name}</option>`);
            })
            data[3].forEach(s => {
                $slSubjects.append(`<option value="${s.Id}">${s.Acronym} - ${s.Name}</option>`)
            })
            var queryParams = {
                faculty_id: $slFaculties.val()
            };
            makeAjaxRequest('/admin/classroom/SelectByFaculty', queryParams)
                .then(async data => {
                    await data.classrooms.forEach(c => {
                        $slClassRooms.append(`<option value="${c.Id}">${c.Acronym} - ${c.Name}</option>`);
                    });
                    $btnSearch.click();
                })
        })

    $slClassRooms.select2({
        placeholder: 'Choose a classroom', // Placeholder text
        allowClear: true // Enable clearing selection
    });
    $slSubjects.select2({
        placeholder: 'Choose a subject', // Placeholder text
        allowClear: true // Enable clearing selection
    });
    $slLecturers.select2({
        placeholder: 'Choose a lecturer', // Placeholder text
        allowClear: true // Enable clearing selection
    });
}
