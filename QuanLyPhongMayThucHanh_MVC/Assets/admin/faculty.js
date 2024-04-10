$(function () {
    LoadFaculties();
});

function LoadFaculties(){
    $.ajax({
        url:'/admin/faculty/select',
        type:'get',
        success:function(data){
            $('#tblFaculties').empty();
            let idx = 1;
            data.faculties.forEach(f=>{
                $('#tblFaculties').append(`
                    <tr id="${f.Id}">
                        <td>${idx++}</td>
                        <td class="fw-bold">${f.Acronym}</td>
                        <td>${f.Name}</td>
                        <td class="text-right">
                            <button class="btn btn-xs btn-warning" title="Update faculty" onClick = "update(`+f.Id+`)"><i class="fa fa-edit"></i></button>
                            <button class="btn btn-xs btn-danger" title="Delete faculty" onClick = "delete(`+f.Id+`)"><i class="fa fa-trash-o"></i></button>
                        </td>
                    </tr>
                `);
            })
        }
    })
}

function update(id){
    console.log(id);
}