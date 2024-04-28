const $fromdate = $('#dtpFromDate');
const $todate = $('#dtpToDate');
const $btnSearch = $('#btnSearch');
const $btnExport = $('#btnExportToExcel');
const $table = $('#tblCalendars');

var arr = [];

$(function () {
    $fromdate.datetimepicker({
        format: 'DD/MM/YYYY HH:mm',
        defaultDate: moment().set({hour: 0, minute: 1})
    });
    $todate.datetimepicker({
        format: 'DD/MM/YYYY HH:mm',
        defaultDate: moment().set({hour: 23, minute: 59})
    })
    LoadCalendar();
});
$btnSearch.click(function(){
    LoadCalendar();
})

$btnExport.click(function(){
    console.log(arr);
    var ws = XLSX.utils.json_to_sheet(arr); // Convert data to worksheet
    var wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "LAB Calendar"); // Append the worksheet to the workbook

    XLSX.writeFile(wb, `${$fromdate.data("DateTimePicker").date().format('YYYY-MM-DD HH:mm')} - ${$todate.data("DateTimePicker").date().format('YYYY-MM-DD HH:mm')}.xlsx`); // Write the workbook file and name it
})

function AcceptSchedule(id){
    makeAjaxRequest('/admin/practiceschedule/SubmitCalendar',{id},'post')
    .then(data=>{
        if ([200, 201].includes(data.code)) {
            showToast(data.header, data.msg, data.icon);
            $btnSearch.click();
        } else {
            Swal.fire({
                title: data.header,
                text: data.msg,
                icon: data.icon
            });
        }
    })
}
function LoadCalendar(){
    let fromDate = $fromdate.data("DateTimePicker").date().format('YYYY-MM-DD HH:mm');
    let toDate = $todate.data("DateTimePicker").date().format('YYYY-MM-DD HH:mm');
    makeAjaxRequest('/admin/practiceschedule/calendar',{fromDate,toDate},'get')
    .then(data=>{
        $table.empty();
        if(data.code == 200){
            let idx = 1;
            arr = data.calendars; 
            arr.forEach(function(item) {
                delete item.StatusId;
            });
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
        }
    })
}