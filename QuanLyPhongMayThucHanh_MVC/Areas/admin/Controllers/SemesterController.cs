using QuanLyPhongMayThucHanh_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Areas.admin.Controllers
{    
    public class SemesterController : BaseController
    {
        private Semester s;
        public SemesterController()
        {
            s = new Semester();
        }
        // GET: admin/Semester
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Select()
        {
            var rs = s.Select();
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Detail(int id)
        {
            var rs = s.Detail(id);
            return Json(new { code = 200,icon="success",header = "SUCCESSFULLY",semester = rs,msg="Get semester detail successfully"}, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Insert(string name, int order)
        {
            var rs = s.Insert(name,order);
            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(int id, string name,int order)
        {
            var rs = s.Update(id,name,order);
            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            var rs = s.Delete(id);
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
    }
}