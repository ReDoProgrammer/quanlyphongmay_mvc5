$(document).ready(function () {
    SearchRoom();
})
var keyword = '';
var id = 0;

$('#btnSearch').click(function () {
    keyword = $('#txtKeyword').val();
    SearchRoom();
})

$('#btnSubmit').click(function () {
    let name = $('#txtName').val();
    let location = $('#txtLocation').val();
    let number_of_pc = parseInt($('#txtNumberOfPC').val());
    let monitor = $('#txtMonitor').val();
    let mainboard = $('#txtMainboard').val();
    let cpu = $('#txtCPU').val();
    let ram = $('#txtRAM').val();
    let vga = $('#txtVGA').val();
    let ssd = $('#txtSSD').val();
    let hdd = $('#txtHDD').val();
    let keyboard = $('#txtKeyboard').val();
    let mouse = $('#txtMouse').val();
    let headphone = $('#txtHeadphone').val();
    let speaker = $('#txtSpeaker').val();
    let psu = $('#txtPSU').val();
    let note = $('#txtNote').val();

    if (id == 0) {
        $.ajax({
            url: '/admin/room/insert',
            type: 'post',
            data: { name, location, number_of_pc, monitor, mainboard, cpu, ram, vga, ssd, hdd, keyboard, mouse, headphone, speaker, psu, note },
            success: function (data) {
                console.log(data);
                if (data.code == 201) {
                    $.toast({
                        heading: 'Successfully',
                        text: data.msg,
                        icon: data.icon,
                        loader: true,        // Change it to false to disable loader
                        loaderBg: '#9EC600'  // To change the background
                    })
                }
            }
        })
    } else {
        $.ajax({
            url: '/admin/room/update',
            type: 'post',
            data: { id, name, location, number_of_pc, monitor, mainboard, cpu, ram, vga, ssd, hdd, keyboard, mouse, headphone, speaker, psu, note },
            success: function (data) {
                if (data.code == 201) {
                    $.toast({
                        heading: 'Successfully',
                        text: data.msg,
                        icon: data.icon,
                        loader: true,        // Change it to false to disable loader
                        loaderBg: '#9EC600'  // To change the background
                    })
                }
            }
        })
    }
    id = 0;
    $('#roomModal').modal('hide');
    SearchRoom();
})

$('#roomModal').on('hidden.bs.modal', function () {
    //thiết lập các giá trị mặc định cho các input
    id = 0;
    $('#txtName').val('');
    $('#txtLocation').val('');
    $('#txtNumberOfPC').val(10);
    $('#txtMonitor').val('');
    $('#txtMainboard').val('');
    $('#txtCPU').val('');
    $('#txtRAM').val('');
    $('#txtVGA').val('');
    $('#txtSSD').val('');
    $('#txtHDD').val('');
    $('#txtKeyboard').val('');
    $('#txtMouse').val('');
    $('#txtHeadphone').val('');
    $('#txtSpeaker').val('');
    $('#txtPSU').val('');
    $('#txtNote').val('');
})

function updateroom(id) {
    this.id = id;
    $('#modalTitle').text('Update room info');
    $.ajax({
        url: '/admin/room/detail',
        type: 'get',
        data: { id },
        success: function (data) {
            if (data.code == 200) {
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

function deleteroom(id) {
    confirmDiaglog("Are you sure want to delete this room?", "You won't be able to revert this!", "question", "Yes, delete it!", "No, cancel!")
    .then(_=>{
        $.ajax({
            url:'/admin/room/delete',
            type:'post',
            data:{id},
            success:function(data){
                if(data.code == 200){
                    $.toast({
                        heading: 'Successfully',
                        text: data.msg,
                        icon: data.icon,
                        loader: true,        // Change it to false to disable loader
                        loaderBg: '#9EC600'  // To change the background
                    })
                    SearchRoom();
                }else{
                    Swal.fire({
                        title: "ACCESS DENIED",
                        text: data.msg,
                        icon: icon
                      });
                }
            }
        })
    })
}

function SearchRoom() {
    $.ajax({
        url: '/admin/room/Search',
        type: 'get',
        data: { keyword },
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
                                <a  href="javascript:void(0)" onclick="updateroom(${r.Id})">
                                    <i class="fa fa-edit text-warning"></i>
                                </a>
                                <a  href="javascript:void(0)" onclick="deleteroom(${r.Id})">
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
