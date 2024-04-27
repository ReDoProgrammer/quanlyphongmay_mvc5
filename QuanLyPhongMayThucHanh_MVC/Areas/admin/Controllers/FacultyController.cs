using QuanLyPhongMayThucHanh_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Areas.admin.Controllers
{
    public class FacultyController : BaseController
    {
        private Faculty f;
        public FacultyController()
        {
            f = new Faculty();
        }
        // GET: admin/Faculty
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Select()
        {
            return Json(new { code = 200, faculties = f.Select(), msg = "Load faculties list successfully!" }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Detail(int id)
        {
            var d = f.Detail(id);
            if(d == null)
                return Json(new { code = 404,icon = "warning",header = "NOT FOUND", msg = "Faculty not found!" }, JsonRequestBehavior.AllowGet);
            return Json(new { code = 200, faculty = d,icon = "info",header = "SUCCESSFULLY", msg = "Get faculty detail successfully!" }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Insert(string acronym, string name)
        {           
            return Json(f.Insert(acronym, name), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(int id, string acronym, string name)
        {
            return Json(f.Update(id, acronym, name), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            return Json(f.Delete(id), JsonRequestBehavior.AllowGet);
        }
    }
}