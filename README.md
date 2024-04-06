WEB QUẢN LÝ PHÒNG MÁY TÍNH THỰC HÀNH
SỬ DỤNG ASP.NET MVC 5 VÀ SQL EXPRESS 2022


Đề tài : quản lí phòng máy tính của khoa Công nghệ thông tin
Ý tưởng ban đầu : Giao diện hệ thống ưa nhìn và dễ sử dụng, có tính thực tế cao. Giảng viên sẽ được chọn những môn đang dạy trong kì và có thể cập nhật sau mỗi kì (khi cập nhật môn dạy sẽ bao gồm cả tên lớp giảng dạy và số sinh viên). Khi giảng viên thêm hoặc sửa các môn học sau mỗi kì sẽ báo về mail quản lí và khi quản lí chấp nhận thì mới được cập nhật ở “giảng viên”, sẽ có mail gửi về chấp thuận hoặc từ chối, nếu từ chối sẽ có thêm lí do của quản lí. Có thể kiểm tra trong thời gian cần đăng kí đã có ai đăng kí chưa và đăng kí trên hệ thống để mượn phòng máy ( lí do mượn phòng máy, số lượng sinh viên, thời gian(chia theo tiết) , …) sau khi đăng kí xong, gửi mail cho quản lí ( trưởng hoặc phó khoa) , khi quản lí phê duyệt nếu chấp thuận thì có gmail gửi về báo cho giảng viên, nếu bị từ chối cũng có mail gửi về kèm theo lí do. Có thể truy xuất xem các giảng viên đã mượn phòng máy bao nhiêu lần trong 1 khoảng tgian nhất định và có thể xem mượn phòng máy để dạy những môn học nào. Quản lí và admin có thể truy vấn xem phòng máy đã được mượn bao nhiêu lần trong 1 khoảng tgian bởi những ai, dạy môn gì. Tất cả truy vấn đều có thể xuất ra file excel, Giảng viên khi đăng kí ngoại trừ các môn học thì có thể chọn khác và khi chọn khác sẽ có thêm 1 dòng “lí do chi tiết” để đưa lí do mượn phòng máy. Trong thời gian giảng viên mượn phòng máy sẽ phải quản lí số lượng máy được sử dụng, máy có hoạt động tốt hay không và nếu có máy lỗi thì có thể cập nhật thẳng lên hệ thống để hệ thống biết chi tiết (giảng viên sẽ phải báo cáo ít nhất 2 lần khi bắt đầu mượn phòng và khi trả phòng) sau khi hết thời gian mượn phòng máy thì sẽ có gmail để cho quản lí về tình trạng phòng máy. Giảng viên có thể đề xuất ở hệ thống các vấn đề hoặc các ý tưởng để có thể quản lí và phát triển phòng máy ( VD: thiếu máy tính, …). Tất cả truy vấn đều có thể xuất ra file excel. Khi mà giảng viên gửi yêu cầu nếu chưa đc xét duyệt yêu cầu có thể thu hồi và sẽ có lí do thu hồi và gmail cho quản lí.
1. Admin 
•	Phân quyền
•	Quản lí phòng máy ( số lượng, vị trí, số lượng máy trong mỗi phòng, tình trạng hoạt động (cấu hình, máy hoạt động có lỗi không,..), truy vấn …)
•	Quản lí giảng viên ( thông tin giảng viên, chức vụ, …)
•	Quản lí tài khoản giảng viên
2. Quản lí 
•	Phê duyệt ( khi giảng viên thay đổi môn học theo kì và giảng viên khi mượn phòng máy nếu từ chối sẽ xuất hiện thêm ô để đưa lí do từ chối)
•	Quản lí phòng máy ( truy vấn theo thời gian, theo giảng viên, kiểm tra tình trạng hoạt động của phòng máy, …)
•	Đăng nhập hệ thống
•	Quản lý tài khoản
•	Quản lý thông tin phòng máy tính
•	Quản lý lịch thực hành
•	Quản lý môn thực hành
•	Quản lý ca thực hành
•	Quản lý lớp thực hành
•	Báo cáo thống kê
•	Xem lịch sử thay đổi trong hệ thống
•	Quản lý môn thực hành
•	Quản lý lớp thực hành
3. Giảng viên
•	Cập nhật môn dạy theo kì(cần phê duyệt)
•	Kiểm tra phòng máy đã có ai đăng kí chưa
•	Truy vấn theo thời gian
•	Đăng ký tài khoản(cần phê duyệt)
•	Đăng nhập hệ thống
•	Cập nhật thông tin cá nhân(không cần phê duyệt)
•	Đăng ký phòng máy tính(cần phê duyệt)
•	Hoán đổi lịch thực hành(cần phê duyệt)
•	Tìm lịch thực hành
•	Tìm kiếm phòng máy tính
•	Thống kê lịch thực hành 
