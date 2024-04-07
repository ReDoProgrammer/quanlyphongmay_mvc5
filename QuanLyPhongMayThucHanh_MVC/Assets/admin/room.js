$(document).ready(function(){
    SearchRoom();
})
var keyword = '';
function SearchRoom(){
    $.ajax({
        url:'/admin/room/Search',
        type:'get',
        data:{keyword},
        success:function(data){
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
                                <a  href="javascript:void(0)" onclick="UpdateRoom(${r.Id})">
                                    <i class="fa fa-edit text-warning"></i>
                                </a>
                                <a  href="javascript:void(0)" onclick="DeleteRoom(${r.Id})">
                                <i class="fa fa-trash-o text-danger"></i>
                                </a>
                            </td>
                        </tr> 
                    `);
                });
           }
        }

    })
}

$('#btnSearch').click(function(){
    keyword = $('#txtKeyword').val();
    SearchRoom();
})

function UpdateRoom(id){
    console.log(id);
    $('#modalTitle').text('Update room info');
    $.ajax({
        url:'/admin/room/detail',
        type:'get',
        data:{id},
        success:function(data){
           if(data.code == 200){
                $('#roomModal').modal();
                let r = data.room;
                $('#txtName').val(r.Name);
                $('#txtLocation').val(r.Location);
                $('#txtNumberOfPC').val(r.NumberOfPC);
                $('#txtMonitor').val(r.Monitor);
                $('#txtMainboard').val(r.Mainboard);
                $('#txtCPU').val(r.CPU);
                $('#txtRAM').val(r.RAM);
                $('#txtVGA').val(r.VGA);
                $('#txtSSD').val(r.SSD);
                $('#txtHDD').val(r.HDD);
                $('#txtKeyboard').val(r.Keyboard);
                $('#txtMouse').val(r.Mouse);
                $('#txtHeadphone').val(r.Headphone);
                $('#txtSpeaker').val(r.Speaker);
                $('#txtPSU').val(r.PSU);
                $('#txtNote').val(r.Note);
           }
        }
    })
    
}

function DeleteRoom(id){
    console.log(id);
}