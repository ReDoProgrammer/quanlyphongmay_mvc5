$(document).ready(function(){
    SearchRoom();
})
var keyword = '';
function SearchRoom(){
    $.ajax({
        url:'/pcroom/Search',
        type:'get',
        data:{keyword},
        success:function(data){
           $('#tblRooms').empty();
            if(data.code == 200){
                console.log(data.rooms);
                let idx = 1;
                data.rooms.forEach(r => {
                    console.log(r.Id);
                    $('#tblRooms').append(`
                        <tr id = "${r.Id}">
                            <td>${idx++}</td>
                            <td class="font-weight-bold">${r.Name}</td>
                            <td>${r.Location}</td>
                            <td class="text-right">${r.NumberOfPC}</td>
                            <td class="text-right">${r.NumberOfPC - r.Broken}</td>
                            <td class="text-right">${r.Broken}</td>
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
                        </tr> 
                    `);
                });
           }
        }

    })
}