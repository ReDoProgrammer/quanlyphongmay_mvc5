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

