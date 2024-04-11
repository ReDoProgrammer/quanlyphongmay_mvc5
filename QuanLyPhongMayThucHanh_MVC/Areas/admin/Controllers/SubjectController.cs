using QuanLyPhongMayThucHanh_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Areas.admin.Controllers
{
    public class SubjectController : BaseController
    {
        private Subject s;
        public SubjectController()
        {
            s = new Subject();
        }
        // GET: admin/Subject
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
            if(rs == null)
                return Json(new { code = 403, icon = "error", header = "FAILED", msg = "Can not get subject detail" }, JsonRequestBehavior.AllowGet);
            return Json(new { code = 200, icon = "success", header = "SUCCESSFULLY", subject = rs, msg = "Get subject detail successfully" }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Insert(string name)
        {
            var rs = s.Insert(name);
            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(int id, string name)
        {
            var rs = s.Update(id, name);
            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            var rs = s.Delete(id);
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
    }
}