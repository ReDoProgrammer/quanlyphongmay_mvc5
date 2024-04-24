$('#btnLogin').click(function (e) {
    e.preventDefault();
    let username = $('#txtUsername').val();
    let password = $('#txtPassword').val();

    //validation
    if (username.trim().length == 0) {
        $.toast({
            heading: 'Tài khoản không thể để trống!',
            text: 'Vui lòng nhập tài khoản',
            showHideTransition: 'fade',
            icon: 'error'
        })
        $('#txtUsername').select();
        return;
    }
    if (password.trim().length == 0) {
        $.toast({
            heading: 'Mật khẩu không thể để trống!',
            text: 'Vui lòng nhập tài khoản',
            showHideTransition: 'fade',
            icon: 'error'
        })
        $('#txtPassword').select();
        return;
    }
    makeAjaxRequest('/admin/auth/Login', { username, password}, 'post')
    .then(data=>{
        if (data.code != 200) {
            $.toast({
                heading: 'Warning',
                text: data.msg,
                showHideTransition: 'plain',
                icon: 'warning'
            })
            return;
        }
        console.log(data);
        window.location.href = '/admin/home';
    })    
})