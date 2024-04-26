const $table = $('#tblSubjects');
const $btnSubmit = $('#btnSubmit');
const $modal = $('#subjectModal');
const $name = $('#txtName');
const $title = $('#modalTitle');

var id = 0;
$(function(){
    loadsubjects();
})

function update_subject(id){
    this.id = id;
    makeAjaxRequest('/admin/subject/detail',{id},'get')
    .then(data=>{
        if(data.code == 200){
            $name.val(data.subject.Name);
            $title.text('Update subject');
            $modal.modal();
        }
    })
}

function delete_subject(id){
    confirmDiaglog("Are you sure want to delete this subject?", "You won't be able to revert this!", "question", "Yes, delete it!", "No, cancel!")
    .then(_ => {
        makeAjaxRequest('/admin/subject/delete', { id },'post')
        .then(data=>{
            let js = JSON.parse(data);
            if(js.code == 200){
                showToast(js.header,js.msg,js.icon);
                loadsubjects();
            }
            else{
                Swal.fire({
                    title: js.header,
                    text: js.msg,
                    icon: js.icon
                });
            }
        })
    })
}

$btnSubmit.click(function(){
    let name = $name.val().trim();
    let action = id==0?'insert':'update';
    let data = id==0?{name}:{id,name};
    let url = `/admin/subject/${action}`;
    makeAjaxRequest(url,data,'post')
    .then(data=>{
        let js = JSON.parse(data);
        if ([200, 201].includes(js.code)){
            showToast(js.header,js.msg,js.icon);
        }
        $modal.modal('hide');
        $title.text('Create a new subject');
        $name.val('');
        id = 0;
        loadsubjects();
    })
})


function showToast(heading, text, icon) {
    $.toast({
        heading: heading,
        text: text,
        icon: icon,
        loader: true,
        loaderBg: '#9EC600'
    });
}
function loadsubjects(){
    $table.empty();
    let idx = 1;
    makeAjaxRequest('/admin/subject/select',{},'get')
    .then(subjects=>{
        subjects.forEach(s=>{
            $table.append(`
                <tr id="${s.Id}">
                    <td>${idx++}</td>
                    <td class="fw-bold text-info">${s.Acronym}</td>
                    <td>${s.Name}</td>
                    <td class="text-right">
                        <button class="btn btn-xs btn-warning" title="Update subject" onClick = "update_subject(`+ s.Id + `)"><i class="fa fa-edit"></i></button>
                        <button class="btn btn-xs btn-danger" title="Delete subject" onClick = "delete_subject(`+ s.Id + `)"><i class="fa fa-trash-o"></i></button>
                    </td>
                </tr>
            `);
        })
    })
}