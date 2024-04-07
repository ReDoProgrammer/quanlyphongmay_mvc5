$(function () {
    $('#dtpFromDate').datetimepicker({
        format: 'DD/MM/YYYY HH:mm',
        defaultDate: new Date()
    });

    var defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 3);

    $('#dtpToDate').datetimepicker({
        format: 'DD/MM/YYYY HH:mm',
        defaultDate: defaultDate
    });
    // $('.js-example-basic-multiple').select2();
    loadcp();
});

$('#btnSearch').click(function(){
    let from_date = $('#dtpFromDate').data("DateTimePicker").date().format('DD/MM/YYYY HH:mm');
    let to_date = $('#dtpToDate').data("DateTimePicker").date().format('DD/MM/YYYY HH:mm');
    let cp = parseInt($('#slClassPeriods option:selected').val());
    lookup(from_date,to_date,cp);

})

function book(id){
    
}

function loadcp(){
    $.ajax({
        url:'/classperiod/list',
        type:'get',
        success:function(data){
            if(data.code == 200){
                data.cps.forEach(c=>{
                    $('#slClassPeriods').append(`<option value = "${c.Id}">${c.Name}  [${c.StartTime} - ${c.EndTime}]</option>`);
                })
            }
        }
    })
}


function lookup(from_date,to_date,cp) {
    $.ajax({
        url: '/pcroom/lookup',
        type: 'get',
        data: { from_date,to_date,cp },
        success: function (data) {
            $('#tblRooms').empty();
            if(data.code == 200){
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