const $slSchoolYears = $('#slSchoolYears');
const $slSemesters = $('#slSemesters');
const $slSubjects = $('#slSubjects');
const $slFaculties = $('#slFaculties');
const $slClassRooms = $('#slClassrooms');
const $slLecturers = $('#slLecturers');
const $txtKeyword = $('#txtKeyword');
const $btnSearch = $('#btnSearch');
const $fromdate = $('#dtpFromDate');
const $todate = $('#dtpToDate');
const $table = $('#tblData');
const $btnExport = $('#btnExportToExcel');
var arr = [];

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

$btnExport.click(function(){
    var ws = XLSX.utils.json_to_sheet(arr); // Convert data to worksheet
    var wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "LAB Calendar"); // Append the worksheet to the workbook

    XLSX.writeFile(wb, `${$fromdate.data("DateTimePicker").date().format('YYYY-MM-DD HH:mm')} - ${$todate.data("DateTimePicker").date().format('YYYY-MM-DD HH:mm')}.xlsx`); // Write the workbook file and name it
})

$btnSearch.click(function(){
    LoadStatistic();
})



function LoadStatistic(){
    $table.empty();
    makeAjaxRequest('/admin/statistic/filter',{
        classroom_id:$slClassRooms.val()?$slClassRooms.val():0,
        lecturer_id:$slLecturers.val()?$slLecturers.val():0,
        fromdate:$fromdate.data("DateTimePicker").date().format('YYYY-MM-DD HH:mm'),
        todate:$todate.data("DateTimePicker").date().format('YYYY-MM-DD HH:mm'),
        subject_id: $slSubjects.val()?$slSubjects.val():0,
        keyword: $txtKeyword.val().trim()
    },'get')
    .then(data=>{
        let idx = 1;
        arr = data.content;
        data.content.forEach(d=>{
            $table.append(`
                <tr id = "${d.Id}">
                    <td>${idx++}</td>
                    <td>${d.Faculty}</td>
                    <td>${d.Subject}</td>
                    <td>${d.Classroom}</td>
                    <td>${d.Lecturer}</td>
                    <td>${d.Semester}</td>
                    <td>${d.Times}</td>
                </tr>
            `);
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

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
            $btnSearch.click();
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
