function confirmDiaglog(title, text, icon, confirmText, cancelText){
    return new Promise((resolve, reject) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: title,
            text:text,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: confirmText,
            cancelButtonText: cancelText,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                return resolve()
            }
            return reject();
        });
    })
}