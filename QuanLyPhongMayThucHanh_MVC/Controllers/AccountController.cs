using Newtonsoft.Json;
using QuanLyPhongMayThucHanh_MVC.DTO;
using QuanLyPhongMayThucHanh_MVC.Models;
using System;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Controllers
{
    public class AccountController : Controller
    {
        private Faculty f;
        private Position p;
        private Lecturer l;

        public AccountController()
        {
            f = new Faculty();
            p = new Position();
            l = new Lecturer();
        }

        [HttpGet]
        public JsonResult CheckUsername(string username, int id = 0)
        {
            return Json(new { code = 200, icon = "success",header = "SUCCESSFULLY",msg="Check username successfully", exists = l.CheckUsername(username,id)}, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult CheckEmail(string email, int id = 0)
        {
            return Json(new { code = 200, icon = "success", header = "SUCCESSFULLY", msg = "Check email successfully", exists = l.CheckEmail(email,id) }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult CheckPhone(string phone, int id = 0)
        {
            return Json(new { code = 200, icon = "success", header = "SUCCESSFULLY", msg = "Check phone successfully", exists = l.CheckPhone(phone, id) }, JsonRequestBehavior.AllowGet);
        }



        [HttpGet]
        public JsonResult GetFaculties()
        {
            return Json(new { code = 200, msg="Get faculties list successfully",header="Successfully",icon = "success",faculties = f.Select()},JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetPositions()
        {
            return Json(new { code = 200,msg="Get positions list successfully",icon="success",header = "Successfully",positions = p.List()}, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Login(string username,string password)
        {
            try
            {
                var lec = new Lecturer();
                var code = lec.Login(username, password);
                var msg = "Login successfully!";

                switch (code)
                {
                    case 404: msg = "Username does not exists!"; break;
                    case 403: msg = "The account has not been activated. Please contact the admin!"; break;
                    case 400: msg = "Incorrect password!"; break;
                    default: msg = "Login successfully!"; break;
                }
                if (code != 200)
                {
                    return Json(new { code = code, msg = msg }, JsonRequestBehavior.AllowGet);
                }

                var gv = lec.Profile(username);
                if(gv == null)
                {
                    return Json(new { code = 404, msg = "Tài khoản không tồn tại!" }, JsonRequestBehavior.AllowGet);
                }

                Session["lecturer"] = gv;
                return Json(new { code = 200, msg = "Đăng nhập hệ thống thành công!" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { code = 500, msg = "Lỗi đăng nhập: " + ex.Message, JsonRequestBehavior.AllowGet });
            }
        }


        public ActionResult SignUp()
        {
            return View();
        }

        [HttpPost]
        public ActionResult SignUp(string username, string fullname, string password, string email, string phone, int faculty_id, int position_id)
        {
            var rs = JsonConvert.DeserializeObject<ResponseDTO>(l.SignUp(username, fullname, password, email, phone, faculty_id, position_id));
            if (rs.code == 201)
            {
                string content = System.IO.File.ReadAllText(Server.MapPath("~/Assets/tmp/lecturer_register_admin.html"));
                var adm = new Lecturer().Admin();
                content = content.Replace("{{Username}}", username);
                content = content.Replace("{{Fullname}}", fullname);
                content = content.Replace("{{Email}}", email);
                content = content.Replace("{{Phone}}", phone);
                content = content.Replace("{{ActionTime}}", DateTime.Now.ToString("dd/MM/yyyy HH:mm"));

                Mailer.SendMail(adm.email, "PCLAB MNGR", "New registed account", content);
            }
            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        [ChildActionOnly]
        public ActionResult Profile()
        {
            var obj = (Lecturer)Session["lecturer"]; 
            return PartialView(obj);
        }

        public ActionResult MyProfile()
        {
            var l = (Lecturer)Session["lecturer"];
            if(l==null)
                return RedirectToAction("login");
            return View(l);
        }
        public ActionResult Logout()
        {
            Session["lecturer"] = null;
            return RedirectToAction("login");
        }
    }
}