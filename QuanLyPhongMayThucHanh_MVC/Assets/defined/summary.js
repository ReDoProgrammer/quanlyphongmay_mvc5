const $calendars = $('#tblCalendars');
const $classes = $('#tblClasses');

$(function () {
    LoadSummary();
})

function LoadSummary(){
    makeAjaxRequest('/home/Summary',null,'get')
    .then(data=>{
        console.log(data);
        let idx = 1;
        data.calendars.forEach(c=>{
            $calendars.append(`
                <tr>
                    <td>${idx++}</td>
                    <td>${c.FacultyName}</td>
                    <td>${c.ClassRoom}</td>
                    <td>${c.Subject}</td>
                    <td>${c.NumberOfStudents}</td>
                    <td>${c.Room}</td>
                    <td>${c.ClassPeriod}</td>
                    <td>${c.StartDate}</td>
                    <td>${c.EndDate}</td>
                    <td>${c.Status}</td>
                </tr>
            `);
        })
        let idx1 = 1;
        data.classes.forEach(c=>{
            $classes.append(`
                <tr>
                    <td>${idx1++}</td>
                    <td>${c.FacultyName}</td>
                    <td>${c.ClassRoom}</td>
                    <td>${c.SubjectName}</td>
                    <td>${c.SchoolYear}</td>
                    <td>${c.NumberOfStudents}</td>
                </tr>
            `);
        })
    })
}