const $tblCalendars = $('#tblCalendars');
const $modal = $('#modalCancelBooking');
    

$(function () {
    $('#dtpFromDate').datetimepicker({
        format: 'DD/MM/YYYY HH:mm',
        defaultDate: moment().set({hour: 0, minute: 0})
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

var id;
function LoadOwnCalendar(){
    let from_date = $('#dtpFromDate').data("DateTimePicker").date().format('YYYY-MM-DD HH:mm');
    let to_date = $('#dtpToDate').data("DateTimePicker").date().format('YYYY-MM-DD HH:mm');
    makeAjaxRequest('/practiceschedule/loadowncalendar', {from_date,to_date}, 'get')
    .then(data=>{
        console.log(data);
        let idx = 1;
        $tblCalendars.empty();
        data.calendars.forEach(c=>{
            $tblCalendars.append(`
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
                            ${c.StatusId==0?'<button class="btn btn-xs btn-warning" title="Cancel booking" onClick = "CancelBooking('+c.Id+')"><i class="fa fa-undo" aria-hidden="true"></i></button>':''}
                        </td>
                    </tr>
                `);
        })
    })
}

function CancelBooking(id){
    this.id = id;
    makeAjaxRequest('/practiceschedule/detail', {id}, 'get')
    .then(data=>{
        $('#lblRoom').text(data.calendar.Room);
        $('#lblSubject').text(data.calendar.Subject);
        $('#lblStartDate').text(data.calendar.StartDate);
        $('#lblEndDate').text(data.calendar.EndDate);
        $('#lblRemark').text(data.calendar.Note);           
        $modal.modal();
    })
}

$('#btnSubmitCancelBooking').click(function(){
    let remark = $('#txaCancelNote').val();
    if(remark.trim().length == 0){
        Swal.fire({
            title: "Validation",
            text: "Please enter cancel remark",
            icon: "warning"
          });
        return;
    }
    makeAjaxRequest('/practiceschedule/delete', {id,remark}, 'post')
    .then(data=>{
        $.toast({
            heading: data.header,
            text: data.msg,
            showHideTransition: 'slide',
            icon: data.icon
        })
        LoadOwnCalendar();
        $('#modalCancelBooking').modal('hide');
    })    
})