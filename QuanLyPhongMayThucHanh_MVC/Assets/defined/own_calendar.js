$(function () {
   
    $('#dtpFromDate').datetimepicker({
        format: 'DD/MM/YYYY HH:mm',
        defaultDate: new Date()
    });

    $('#dtpToDate').datetimepicker({
        format: 'DD/MM/YYYY HH:mm',
        defaultDate: moment().set({hour: 23, minute: 59})
    })
    LoadOwnCalendar();
});

$('#btnSearch').click(function(){
    LoadOwnCalendar();
})

function LoadOwnCalendar(){
    let from_date = $('#dtpFromDate').data("DateTimePicker").date().format('YYYY-MM-DD HH:mm');
    let to_date = $('#dtpToDate').data("DateTimePicker").date().format('YYYY-MM-DD HH:mm');
    $.ajax({
        url:'/practiceschedule/loadowncalendar',
        type:'get',
        data:{from_date,to_date},
        success:function(data){
            $('#tblCalendars').empty();
            let idx = 1;
            data.calendars.forEach(c => {
                $('#tblCalendars').append(`
                    <tr id = "${c.Id}" class="${c.StatusId == 1?"text-success":c.StatusId==0?"text-warning":"text-danger"}">
                        <td>${idx++}</td>
                        <td style="font-weight:bold;">${c.Room}</td>
                        <td>${c.Subject}</td>
                        <td>${c.Lecturer}</td>
                        <td>${c.ClassPeriod}</td>
                        <td>${c.StartDate}</td>
                        <td>${c.EndDate}</td>
                        <td>${c.Note}</td>
                        <td>${c.Status}</td>
                        <td>
                            ${c.StatusId!=1?'<button class="btn btn-xs btn-warning" title="Cancel booking"><i class="fa fa-undo" aria-hidden="true"></i></button>':''}
                        </td>
                    </tr>
                `);
            });
        }
    })
}