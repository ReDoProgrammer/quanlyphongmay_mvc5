const $tblCalendars = $('#tblCalendars');
$(function () {

    $('#dtpFromDate').datetimepicker({
        format: 'DD/MM/YYYY HH:mm',
        defaultDate: moment().set({ hour: 0, minute: 1 })
    });

    $('#dtpToDate').datetimepicker({
        format: 'DD/MM/YYYY HH:mm',
        defaultDate: moment().set({ hour: 23, minute: 59 })
    })
    LoadLABCalendar()
});

$('#btnSearch').click(function () {
    LoadLABCalendar();
})

function LoadLABCalendar() {
    let from_date = $('#dtpFromDate').data("DateTimePicker").date().format('YYYY-MM-DD HH:mm');
    let to_date = $('#dtpToDate').data("DateTimePicker").date().format('YYYY-MM-DD HH:mm');

    makeAjaxRequest('/practiceschedule/labcalendar', { from_date, to_date }, 'get')
        .then(data => {
            let idx = 1;
            $tblCalendars.empty();
            data.calendars.forEach(c => {
                $tblCalendars.append(`
                    <tr id = "${c.Id}" class="${c.StatusId == 1 ? "text-success" : c.StatusId == 0 ? "text-warning" : "text-danger"}">
                        <td>${idx++}</td>
                        <td style="font-weight:bold;">${c.Room}</td>
                        <td>${c.Subject}</td>
                        <td>${c.Lecturer}</td>
                        <td>${c.ClassPeriod}</td>
                        <td>${c.StartDate}</td>
                        <td>${c.EndDate}</td>
                        <td>${c.Note}</td>
                        <td>${c.Status}</td>
                    </tr>
                `);
            })
        })
}