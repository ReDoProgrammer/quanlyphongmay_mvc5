using QuanLyPhongMayThucHanh_MVC.Areas.admin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Areas.admin.Controllers
{
    public class AuthController : Controller
    {
        // GET: admin/Auth
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Login(string username, string password)
        {
            try
            {
                var lec = new Lecturer();
                var code = lec.Login(username, password);
                var msg = "Đăng nhập thành công!";

                switch (code)
                {
                    case 404: msg = "Tài khoản không tồn tại!"; break;
                    case 403: msg = "Bạn không có quyền truy cập module này!"; break;
                    case 400: msg = "Mật khẩu không chính xác!"; break;
                    default: msg = "Đăng nhập thành công!"; break;
                }
                if (code != 200)
                {
                    return Json(new { code = code, msg = msg }, JsonRequestBehavior.AllowGet);
                }

                var gv = lec.Profile(username);
                if (gv == null)
                {
                    return Json(new { code = 404, msg = "Tài khoản không tồn tại!" }, JsonRequestBehavior.AllowGet);
                }

                Session["admin"] = gv;
                return Json(new { code = 200, msg = "Đăng nhập hệ thống thành công!" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { code = 500, msg = "Lỗi đăng nhập: " + ex.Message, JsonRequestBehavior.AllowGet });
            }
        }
    }
}