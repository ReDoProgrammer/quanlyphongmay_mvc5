const $table = $('#tblCalendars');
$(function(){
    makeAjaxRequest('/admin/home/summary',null,'get')
    .then(data=>{
        console.log(data);
        $('#spTotalFaculties').text(data.summary.number_of_faculties);
        $('#spTotalOfStudents').text(data.summary.total_students);
        $('#spTotalClasses').text(data.summary.number_of_classes);
        $('#spTotalLecturers').text(data.summary.number_of_lecturers);
        $('#spActivePC').text(`${data.summary.total_active_pc}/${data.summary.total_pc}`);
        $('#spTotalSubjects').text(data.summary.number_of_subjects);
    })
    .catch(err=>{
        console.log(err);
    })

    makeAjaxRequest('/admin/practiceschedule/latestcalendars',{},'get')
    .then(data=>{
        let idx = 1;
        data.calendars.forEach(c=>{
            $table.append(`
                <tr id = ${c.Id}>
                    <td>${idx++}</td>
                    <td>${c.Room}</td>
                    <td>${c.Subject}</td>
                    <td>${c.Lecturer}</td>
                    <td>${c.ClassPeriod}</td>
                    <td>${c.StartDate}</td>
                    <td>${c.EndDate}</td>
                    <td>${c.Note}</td>
                    <td>${c.StatusId == 1?`<span class="text-success">${c.Status}</span>`:`<span class="text-warning">${c.Status}</span>`}</td>
                    <td class="text-center">
                        ${c.StatusId == 1?'<i class="fa fa-check-square-o text-success"></i>':`<input type="checkbox" title="Accept schedule" onClick = "AcceptSchedule(${c.Id})"/>`}
                    </td>
                    
                </tr>
            `);
        })
    })
})