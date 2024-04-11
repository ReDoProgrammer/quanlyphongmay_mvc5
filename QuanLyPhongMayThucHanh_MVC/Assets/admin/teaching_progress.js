$(function(){
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

function InitData(){
    let current_year = new Date().getFullYear();
    for(i = current_year - 5; i<= current_year+10; i++){
        $slSchoolYears.append(`<option ${i==current_year?'selected':''}>${i}-${i+1}</option>`);
        $slSchoolYears1.append(`<option ${i==current_year?'selected':''}>${i}-${i+1}</option>`);
    }
    LoadSemesters();
    LoadSubjects();
    LoadFaculties();
    LoadLecturers();
}

function LoadLecturers(){
    $.ajax({
        url:'/admin/lecturer/listactived',
        type:'get',
        success:function(data){
            if(data.code == 200){
                data.lecturers.forEach(l=>{
                    $slLecturers.append(`<option value="${l.id}">${l.fullname} (${l.username})</option>`);
                    $slLecturers1.append(`<option value="${l.id}">${l.fullname} (${l.username})</option>`);
                })
            }
        }
    })
}
function LoadFaculties(){
    $.ajax({
        url:'/admin/faculty/select',
        type:'get',
        success:function(data){
            data.faculties.forEach(f=>{
                $slFaculties.append(`<option value="${f.Id}">${f.Acronym} - ${f.Name}</option>`);
                $slFaculties1.append(`<option value="${f.Id}">${f.Acronym} - ${f.Name}</option>`);
            })
            $slFaculties.trigger('change');
            $slFaculties1.trigger('change');
            
        }
    })
}

$slFaculties.change(function(){
    let faculty_id = $(this).val();
    $.ajax({
        url:'/admin/classroom/selectbyfaculty',
        type:'get',
        data:{faculty_id},
        success:function(data){
            $slClassRooms.empty();
            data.classrooms.forEach(c=>{
                $slClassRooms.append(`<option value="${c.Id}">${c.Acronym} - ${c.Name}</option>`)
            })
        }
    })
})
$slFaculties1.change(function(){
    let faculty_id = $(this).val();
    $.ajax({
        url:'/admin/classroom/selectbyfaculty',
        type:'get',
        data:{faculty_id},
        success:function(data){
            $slClassRooms1.empty();
            data.classrooms.forEach(c=>{
                $slClassRooms1.append(`<option value="${c.Id}">${c.Acronym} - ${c.Name}</option>`)
            })
        }
    })
})


function LoadSubjects(){
    $.ajax({
        url:'/admin/subject/select',
        type:'get',
        success:function(data){
            data.forEach(s=>{
                $slSubjects.append(`<option value="${s.Id}">${s.Acronym} - ${s.Name}</option>`)
                $slSubjects1.append(`<option value="${s.Id}">${s.Acronym} - ${s.Name}</option>`)
            })
        }
    })
}

function LoadSemesters(){
    $.ajax({
        url:'/admin/semester/select',
        type:'get',
        success:function(data){
          
                data.forEach(s=>{
                    $slSemesters.append(`<option value="${s.id}">${s.name}</option>`);
                    $slSemesters1.append(`<option value="${s.id}">${s.name}</option>`);
                })
           
        }
    })
}