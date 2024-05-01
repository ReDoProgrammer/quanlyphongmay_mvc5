using QuanLyPhongMayThucHanh_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Areas.admin.Controllers
{
    public class LecturerController : BaseController
    {
        private Lecturer l;
        public LecturerController()
        {
            l = new Lecturer();
        }
        // GET: admin/Lecturer
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Insert(string username, string password, string fullname, string phone, string email, int position_id, int faculty_id)
        {
            var rs = l.Create(username,password,fullname,phone,email,position_id,faculty_id);
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(int id, string fullname, string phone, string email, int position_id, int faculty_id)
        {
            var rs = l.Update(id, fullname, phone, email, position_id, faculty_id);
            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            var rs = l.Delete(id);
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Active(int id)
        {
            var rs = l.Active(id);
            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Search(int faculty_id, string keyword)
        {
            return Json(new { code = 200, lecturers = l.Search(faculty_id,keyword), icon = "info", header = "SUCCESSFULLY", msg = "Get lecturers list successfully!" }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListActived()
        {
            return Json(new { code = 200, lecturers = l.ListActived(), icon = "info", header = "SUCCESSFULLY", msg = "Get lecturers list successfully!" }, JsonRequestBehavior.AllowGet);
        }


        public JsonResult Detail(int id)
        {
            return Json(new { code = 200, lecturer = l.Detail(id), icon = "info", header = "SUCCESSFULLY", msg = "Get lecturer detail successfully!" }, JsonRequestBehavior.AllowGet);
        }
    }
}