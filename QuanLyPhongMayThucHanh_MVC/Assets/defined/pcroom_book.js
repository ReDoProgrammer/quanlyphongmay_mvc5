$(function () {
   
    $('#dtpDate').datetimepicker({
        format: 'DD/MM/YYYY',
        defaultDate: new Date(),
        minDate: moment().startOf('day')       
    });

    $('#dtpBookDate').datetimepicker({
        format: 'DD/MM/YYYY',
        defaultDate: new Date()
    })
    // $('.js-example-basic-multiple').select2();
    loadcp();
    loadsubjects();
});

var room_id = 0;
var date,cp;

$('#btnSearch').click(function () {
    date = $('#dtpDate').data("DateTimePicker").date().format('YYYY-MM-DD');
    cp = parseInt($('#slClassPeriods option:selected').val());
    lookup();

})
$('#btnSubmit').click(function(){
    let book_date = $('#dtpBookDate').data("DateTimePicker").date().format('YYYY-MM-DD');
    let subject_id = parseInt($('#slSubjects option:selected').val());
    let class_period_id = parseInt($('#slClassPeriods option:selected').val());
    let note = $('#txaNote').val();
    
    $.ajax({
        url:'/practiceschedule/book',
        type:'post',
        data:{book_date,room_id,subject_id,class_period_id,note},
        success:function(data){
            if(data.code == 201){
                Swal.fire({
                    title: "SUCCESSFULLY",
                    text: data.msg,
                    icon: "success"
                  });
                $('#modalBook').modal('hide');
                lookup();
            }
        }
    })
})

function book(id) {
    room_id = id;
    $('#modalBook').modal();
}

function loadsubjects() {
    $.ajax({
        url: '/subject/select',
        type: 'get',
        success: function (data) {
            if (data.code == 200) {
                data.subjects.forEach(s => {
                    $('#slSubjects').append(`<option value="${s.Id}">${s.Acronym} - ${s.Name}</option>`)
                })
            }
        }
    })
}

function loadcp() {
    $.ajax({
        url: '/classperiod/list',
        type: 'get',
        success: function (data) {
            if (data.code == 200) {
                data.cps.forEach(c => {
                    $('#slClassPeriods').append(`<option value = "${c.Id}">${c.Name}  [${c.StartTime} - ${c.EndTime}]</option>`);
                })
            }
        }
    })
}


function lookup() {
    $.ajax({
        url: '/pcroom/lookup',
        type: 'get',
        data: { date, cp },
        success: function (data) {
            $('#tblRooms').empty();
            if (data.code == 200) {
                let idx = 1;
                data.rooms.forEach(r => {
                    $('#tblRooms').append(`
                        <tr id = "${r.Id}">
                            <td>${idx++}</td>
                            <td class="font-weight-bold">${r.Name}</td>
                            <td>${r.Location}</td>
                            <td>${r.NumberOfPC}</td>
                            <td>${r.Monitor}</td>
                            <td>${r.Mainboard}</td>
                            <td>${r.CPU}</td>
                            <td>${r.RAM}</td>
                            <td>${r.VGA}</td>
                            <td>${r.SSD}</td>
                            <td>${r.HDD}</td>
                            <td>${r.Keyboard}</td>
                            <td>${r.Mouse}</td>
                            <td>${r.Headphone}</td>
                            <td>${r.Speaker}</td>
                            <td>${r.PSU}</td>
                            <td>${r.Status}</td>
                            <td>${r.Note}</td>
                            <td>
                                <a href="javascript:void(0)" onClick="book(${r.Id})"><i class="fa fa-send-o fa-fw text-success"></i> book</a>
                            </td>
                        </tr> 
                    `);
                });
            }
        }

    })
}