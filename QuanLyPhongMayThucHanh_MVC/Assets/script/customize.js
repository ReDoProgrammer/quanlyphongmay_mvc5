var actived_menu = '';

$(function () {
    $('#side-menu li a').click(function () {
        // Lấy giá trị href của thẻ a được click
        var hrefValue = $(this).attr('href');

        // Lưu trữ href vào localStorage
        localStorage.setItem('activeMenuHref', hrefValue);
    });

    // Set class 'active' cho thẻ li chứa thẻ a có href tương ứng sau khi trang được tải
    setActiveMenu();
});
function setActiveMenu() {
    var activeMenuHref = localStorage.getItem('activeMenuHref');
    if (activeMenuHref) {
        // Tìm và loại bỏ class 'active' khỏi tất cả các thẻ li
        $('#side-menu li').removeClass('active');

        // Tìm thẻ a với href tương ứng và thêm class 'active' vào thẻ li của nó
        $('#side-menu li a[href="' + activeMenuHref + '"]').closest('li').addClass('active');
    }
}
function makeAjaxRequest(url, queryParams,type='get') {
    // Nếu queryParams chưa được khai báo, gán một đối tượng trống cho nó
    queryParams = queryParams || {};

    // Chuyển đổi đối tượng JSON thành chuỗi truy vấn
    var queryString = Object.entries(queryParams)
        .map(([key, value]) => key + '=' + encodeURIComponent(value))
        .join('&');

    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(type, url + '?' + queryString); // Thêm queryString vào URL
        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(Error(xhr.statusText));
            }
        };
        xhr.onerror = function () {
            Swal.fire('Error', 'An unexpected error occurred. Please try again later.', 'error');
            reject(Error("Network Error"));
        };
        xhr.send();
    });
}

    function showToast(heading, text, icon) {
        $.toast({
            heading: heading,
            text: text,
            icon: icon,
            loader: true,
            loaderBg: '#9EC600'
        });
    }

    function showMessage(header,msg,icon){
        Swal.fire({
            title: header,
            text: msg,
            icon: icon
        });
    }

    function validateInput(value, message, $element) {
        if (value.length === 0) {
            showToast('Validation', message, 'warning');
            $element.select();
            return false;
        }
        return true;
    }
