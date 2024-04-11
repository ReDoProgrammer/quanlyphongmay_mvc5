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
            var rs = f.Insert(acronym, name);
            if(rs>0)
                return Json(new { code = 200, icon = "success",header = "SUCCESSFULLY", msg = "Faculty has been created!" }, JsonRequestBehavior.AllowGet);
            return Json(new { code = 500,icon = "error",header="FAILED", msg = "Can not create new faculty!" }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(int id, string acronym, string name)
        {
            var rs = f.Update(id, acronym, name);
            if(rs == 0)
                return Json(new { code = 500,icon="error",header="FAILED", msg = "Can not update this faculty!" }, JsonRequestBehavior.AllowGet);
            return Json(new { code = 200, icon = "success", header = "SUCCESSFULLY", msg = "The faculty has been updated!" }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            var rs = f.Delete(id);
            switch(rs){
                case 403: return Json(new { code = 403, icon = "warning", header = "ACCESS DENIED", msg = "Cannot delete this faculty because there are lecturers associated with it." }, JsonRequestBehavior.AllowGet);
                case 400: return Json(new { code = 403, icon = "warning", header = "ACCESS DENIED", msg = "Cannot delete this faculty because there are class rooms associated with it." }, JsonRequestBehavior.AllowGet);
                case 1: return Json(new { code = 200, icon = "success", header = "SUCCESSFULLY", msg = "The faculty has been deleted." }, JsonRequestBehavior.AllowGet);
                default: return Json(new { code = 403, icon = "error", header = "FAILED", msg = "Cannot delete this faculty." }, JsonRequestBehavior.AllowGet);
            }      
        }
    }
}