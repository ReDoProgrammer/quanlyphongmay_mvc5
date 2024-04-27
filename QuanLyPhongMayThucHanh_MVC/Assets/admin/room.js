
var keyword = '';
var id = 0;
const $btnSearch = $('#btnSearch');
const $btnSubmit = $('#btnSubmit');
const $txtName = $('#txtName');
const $txtNumberOfPC = $('#txtNumberOfPC');
const $txtActivePC = $('#txtActivePC');
const $slRoomStatuses = $('#slRoomStatuses');
const $txtLocation = $('#txtLocation');
const $txtMonitor = $('#txtMonitor');
const $txtMainboard = $('#txtMainboard');
const $txtCPU = $('#txtCPU');
const $txtRAM = $('#txtRAM');
const $txtVGA = $('#txtVGA');
const $txtSSD = $('#txtSSD');
const $txtHDD = $('#txtHDD');
const $txtKeyboard = $('#txtKeyboard');
const $txtMouse = $('#txtMouse');
const $txtHeadphone = $('#txtHeadphone');
const $txtSpeaker = $('#txtSpeaker');
const $txtPSU = $('#txtPSU');
const $txtNote = $('#txtNote');

const $modal = $('#roomModal');
const $title = $('#modalTitle');
const $form = $("#roomForm");

$(document).ready(function () {
    SearchRoom();
    loadroomstatus();
    $form.validate({
        rules: {
            name: { required: true },
            location: { required: true },
            numberpc: { required: true, min: 1 },
            activepc:{
                required: true,
                number: true,
                max: function() {
                    return $txtNumberOfPC.val();
                }
            },
            monitor: { required: true },
            mainboard: { required: true },
            cpu: { required: true },
            ram: { required: true },
            vga: { required: true },
            psu: { required: true },
        },
        messages: {
            name: {
                required: "<span class='text-danger'>Please enter room name.</span>"
            },
            location: {
                required: "<span class='text-danger'>Please enter room location.</span>"
            },
            numberpc: {
                required: "<span class='text-danger'>Please enter the number of PCs that belong to this room.</span>",
                min: "<span class='text-danger'>Must be at least 1.</span>"
            },
            activepc:{
               

                required: "<span class='text-danger'>Can not be blank</span>",
                number: "<span class='text-danger'>Only positive integers.</span>",
                max: "<span class='text-danger'>Cannot be larger than the number of PCs.</span>"
            },
            monitor: { required: "<span class='text-danger'>Please enter Monitor info.</span>" },
            cpu: { required: "<span class='text-danger'>Please enter CPU info.</span>" },
            ram: { required: "<span class='text-danger'>Please enter RAM info.</span>" },
            psu: { required: "<span class='text-danger'>Please enter PSU info.</span>" },

        },
        onkeyup: function (element) {
            $(element).valid();
            checkFormState(); // Kiểm tra trạng thái form mỗi khi có sự kiện keyup
        },
        invalidHandler: function (event, validator) {
            $btnSubmit.hide(); // Ẩn nút submit khi form không hợp lệ
        },
        submitHandler: function (form) {
            form.submit(); // Nộp form khi tất cả các trường đều hợp lệ
        }
    })
    // Sự kiện khi modal hiện lên
    $modal.on('shown.bs.modal', function () {
        checkFormState(); // Kiểm tra trạng thái của form và cập nhật trạng thái của nút submit
    });
})


$btnSearch.click(function () {
    keyword = $('#txtKeyword').val();
    SearchRoom();
})

$btnSubmit.click(function () {
    let name = $txtName.val();
    let location = $txtLocation.val();
    let number_of_pc = parseInt($txtNumberOfPC.val());
    let activepc = parseInt($txtActivePC.val());
    let monitor = $txtMonitor.val();
    let mainboard = $txtMainboard.val();
    let cpu = $txtCPU.val();
    let ram = $txtRAM.val();
    let vga = $txtVGA.val();
    let ssd = $txtSSD.val();
    let hdd = $txtHDD.val();
    let keyboard = $txtKeyboard.val();
    let mouse = $txtMouse.val();
    let headphone = $txtHeadphone.val();
    let speaker = $txtSpeaker.val();
    let psu = $txtPSU.val();
    let note = $txtNote.val();
    let status_id = $slRoomStatuses.val();
    let data = { name, location, number_of_pc,activepc, monitor, mainboard, cpu, ram, vga, ssd, hdd, keyboard, mouse, headphone, speaker, psu, note , status_id}
    if (id != 0) data.id = id;
    let action = id == 0 ? 'insert' : 'update';
    let url = `/admin/room/${action}`;
    makeAjaxRequest(url, data, 'post')
        .then(data => {
            let rs = JSON.parse(data);
            console.log(rs);
            if ([200, 201].includes(rs.code)) {
                showToast(rs.header, rs.msg, rs.icon);
                $modal.modal('hide');
            } else {
                Swal.fire({
                    title: rs.header,
                    text: rs.msg,
                    icon: rs.icon
                });
            }
            $btnSearch.click();
        })
        .catch(err => {
            console.log(err);
        })




    // id = 0;
    // $modal.modal('hide');
    // SearchRoom();
})

$modal.on('hidden.bs.modal', function () {
    //thiết lập các giá trị mặc định cho các input
    id = 0;
    $txtName.val('');
    $txtLocation.val('');
    $txtNumberOfPC.val(10);
    $txtMonitor.val('');
    $txtMainboard.val('');
    $txtCPU.val('');
    $txtRAM.val('');
    $txtVGA.val('');
    $txtSSD.val('');
    $txtHDD.val('');
    $txtKeyboard.val('');
    $txtMouse.val('');
    $txtHeadphone.val('');
    $txtSpeaker.val('');
    $txtPSU.val('');
    $txtNote.val('');
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
                $modal.modal();
                let r = data.room;
                $txtName.val(r.Name);
                $txtLocation.val(r.Location);
                $txtNumberOfPC.val(r.NumberOfPC);
                $txtMonitor.val(r.Monitor);
                $txtMainboard.val(r.Mainboard);
                $txtCPU.val(r.CPU);
                $txtRAM.val(r.RAM);
                $txtVGA.val(r.VGA);
                $txtSSD.val(r.SSD);
                $txtHDD.val(r.HDD);
                $txtKeyboard.val(r.Keyboard);
                $txtMouse.val(r.Mouse);
                $txtHeadphone.val(r.Headphone);
                $txtSpeaker.val(r.Speaker);
                $txtPSU.val(r.PSU);
                $txtNote.val(r.Note);
            }
        }
    })

}

function deleteroom(id) {
    confirmDiaglog("Are you sure want to delete this room?", "You won't be able to revert this!", "question", "Yes, delete it!", "No, cancel!")
        .then(_ => {
            makeAjaxRequest('/admin/room/delete',{id},'post')
            .then(data=>{
                let rs = JSON.parse(data);
                if ([200, 201].includes(rs.code)) {
                    showToast(rs.header, rs.msg, rs.icon);
                } else {
                    Swal.fire({
                        title: rs.header,
                        text: rs.msg,
                        icon: rs.icon
                    });
                }
                $btnSearch.click();
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

function checkFormState() {
    if ($form.valid()) {
        $btnSubmit.show();
    } else {
        $btnSubmit.hide();
    }
}

function loadroomstatus(){
    $slRoomStatuses.empty();
    makeAjaxRequest('/admin/roomstatus/select',{},'get')
    .then(data=>{
        if(data.code == 200){
            data.statuses.forEach(s=>{
                $slRoomStatuses.append(`<option value="${s.Id}">${s.Name}</option>`);
            })
        }
    })
    .catch(err=>{
        console.log(err);
    })
}

$txtNumberOfPC.on('input', function(event){
    // Kiểm tra xem phím đã được nhấn có phải là số hay không
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        // Không phải số, ngăn người dùng nhập ký tự
        event.preventDefault();
    }else{
        $txtActivePC.val($txtNumberOfPC.val())
    }
});