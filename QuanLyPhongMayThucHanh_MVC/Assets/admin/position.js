const $table = $('#tblPositions');
const $modal = $('#positionModal');
const $btnSubmit = $('#btnSubmit');
const $title = $('#modalTitle');
const $acronym = $('#txtAcronym');
const $name = $('#txtName');
var id = 0;

$(function(){
    LoadPositions();
})

function delete_position(id){
    confirmDiaglog("Are you sure want to delete this position?", "You won't be able to revert this!", "question", "Yes, delete it!", "No, cancel!")
    .then(_ => {
        makeAjaxRequest('/admin/position/delete', { id },'post')
        .then(data=>{
            let js = JSON.parse(data);
            if(js.code == 200){
                showToast(js.header,js.msg,js.icon);
                LoadPositions();
            }
            else{
                showMessage(js.header,js.msg,js.icon);
            }
        })
    })

}

function update_position(id){
    this.id = id;
    makeAjaxRequest('/admin/position/detail',{id},'get')
    .then(data=>{
        if(data.code == 200){
            console.log(data);
            $modal.modal();
            $acronym.val(data.position.Acronym);
            $name.val(data.position.Name);
            $title.text('Update position');
        }
    })
    .catch(err=>{
        console.log(err);
    })
}

$btnSubmit.click(function(){
    let acronym = $acronym.val().trim();
    let name = $name.val().trim();
    //validatetion 


    let action = id == 0?'insert':'update';
    let url = `/admin/position/${action}`;
    let data = id == 0?{acronym,name}:{id,acronym,name};
    makeAjaxRequest(url,data,'post')
    .then(response=>{
        let data = JSON.parse(response);
        showToast(data.header,data.msg, data.icon);
        $modal.modal('hide');
        $acronym.val('');
        $name.val('');
        id = 0;
        $title.text('Create a new position');
        LoadPositions();
    })
    .catch(err=>{
        console.log(err);
    })
})

function LoadPositions(){
    $table.empty();
    makeAjaxRequest('/admin/position/select', {},'get')
    .then(data=>{
        let idx = 1;
        data.positions.forEach(p=>{
            $table.append(`
                <tr id = "${p.Id}">
                    <td>${idx++}</td>
                    <td class="fw-bold text-info">${p.Acronym}</td>
                    <td>${p.Name}</td>
                    <td class="text-right">
                        <button class="btn btn-xs btn-warning" title="Update position" onClick = "update_position(`+ p.Id + `)"><i class="fa fa-edit"></i></button>
                        <button class="btn btn-xs btn-danger" title="Delete position" onClick = "delete_position(`+ p.Id + `)"><i class="fa fa-trash-o"></i></button>
                    </td>
                </tr>
            `);
        })
    })
}