$(function () {

    $('#dtpDate').datetimepicker({
        format: 'DD/MM/YYYY',
        defaultDate: new Date(),
        minDate: moment().startOf('day')
    });

    loadcp();
    loadsubjects();
});

var room_id = 0;
var cps = [];
const $slFromClassPeriods = $('#slFromClassPeriods');
const $slToClassPeriods = $('#slToClassPeriods');
const $btnSearch = $('#btnSearch');
const $btnSubmit = $('#btnSubmit');
const $slSubjects = $('#slSubjects');
const $dtpDate = $('#dtpDate');
const $modal = $('#modalBook');
const $tblRooms = $('#tblRooms');

$btnSearch.click(function () {
    lookup();
})
$btnSubmit.click(function () {
    let book_date = $dtpDate.data("DateTimePicker").date().format('YYYY-MM-DD');
    let teaching_process_id = parseInt($slSubjects.val());
    let class_period_id_1 = parseInt($('#slFromClassPeriods option:selected').val());
    let class_period_id_2 = parseInt($('#slToClassPeriods option:selected').val());
    let note = $('#txaNote').val();

    makeAjaxRequest('/practiceschedule/book', { book_date, room_id, teaching_process_id, class_period_id_1, class_period_id_2, note }, 'post')
        .then(data => {
            Swal.fire({
                title: "SUCCESSFULLY",
                text: data.msg,
                icon: "success"
            });
            $modal.modal('hide');
            lookup();
        })
        .catch(err => {
            console.log(err);
        })
})

function book(id) {
    room_id = id;
    $modal.modal();
}

function loadsubjects() {
    makeAjaxRequest('/subject/OwnSubjects', null, 'get')
        .then(data => {
            data.subjects.forEach(s => {
                $slSubjects.append(`<option value="${s.Id}">${s.Acronym} - ${s.Name}</option>`)
            })
        })
}

function loadcp() {
    makeAjaxRequest('/classperiod/list', null, 'get')
        .then(data => {
            cps = data.cps;
            data.cps.forEach(c => {
                $slFromClassPeriods.append(`<option value = "${c.Id}" data-order="${c.Order}">${c.Name}  [${c.StartTime} - ${c.EndTime}]</option>`);
            })
            $slFromClassPeriods.trigger('change');
        })

}


function lookup() {
    let date = $dtpDate.data("DateTimePicker").date().format('YYYY-MM-DD');
    let class_period_id_1 = parseInt($slFromClassPeriods.val());
    let class_period_id_2 = parseInt($slToClassPeriods.val());
    makeAjaxRequest('/pcroom/lookup', { date, class_period_id_1, class_period_id_2 }, 'get')
        .then(data => {
            $tblRooms.empty();
            if (data.code == 200) {
                let idx = 1;
                data.rooms.forEach(r => {
                    $tblRooms.append(`
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
        })

}

$slFromClassPeriods.on('change', function () {
    let order = $('#slFromClassPeriods option:selected').data('order');
    var filterCPS = $.grep(cps, function (c) {
        return c.Order >= order;
    });
    $slToClassPeriods.empty();
    filterCPS.forEach(c => {
        $slToClassPeriods.append(`<option value = "${c.Id}" data-order="${c.Order}">${c.Name}  [${c.StartTime} - ${c.EndTime}]</option>`);
    })
})