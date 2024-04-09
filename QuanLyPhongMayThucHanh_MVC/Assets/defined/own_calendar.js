﻿$(function () {
   
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

var id;
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
                            ${c.StatusId!=1?'<button class="btn btn-xs btn-warning" title="Cancel booking" onClick = "CancelBooking('+c.Id+')"><i class="fa fa-undo" aria-hidden="true"></i></button>':''}
                        </td>
                    </tr>
                `);
            });
        }
    })
}

function CancelBooking(id){
    this.id = id;
    $.ajax({
        url:'/practiceschedule/detail',
        type:'get',
        data:{id},
        success:function(data){
            $('#lblRoom').text(data.calendar.Room);
            $('#lblSubject').text(data.calendar.Subject);
            $('#lblStartDate').text(data.calendar.StartDate);
            $('#lblEndDate').text(data.calendar.EndDate);
            $('#lblRemark').text(data.calendar.Note);           
            $('#modalCancelBooking').modal();
        }
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
    $.ajax({
        url:'/practiceschedule/delete',
        type:'post',
        data:{id,remark},
        success:function(data){
            if(data.code == 200){
                $.toast({
                    heading: 'Information',
                    text: 'Now you can add icons to generate different kinds of toasts',
                    showHideTransition: 'slide',
                    icon: 'info'
                })
                LoadOwnCalendar();
                $('#modalCancelBooking').modal('hide');
            }
        }
    })
})