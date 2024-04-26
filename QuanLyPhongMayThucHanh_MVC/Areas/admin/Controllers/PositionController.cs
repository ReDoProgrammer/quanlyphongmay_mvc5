using QuanLyPhongMayThucHanh_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Areas.admin.Controllers
{
    public class PositionController : BaseController
    {
        private Position p;
        public PositionController()
        {
            p = new Position();
        }
        // GET: admin/Position
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Select()
        {
            return Json(new { code = 200, positions = p.List(), msg = "Load faculties list successfully!" }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Detail(int id)
        {
            var pos = p.Detail(id);
            if (pos == null)
                return Json(new { code = 404, icon = "error", header = "NOT FOUND"}, JsonRequestBehavior.AllowGet);
            return Json(new { code = 200, icon = "success", header = "SUCCESSFULLY", position =pos }, JsonRequestBehavior.AllowGet);
        }
        
        [HttpPost]
        public JsonResult Insert(string acronym, string name)
        {
            return Json(p.Insert(acronym, name), JsonRequestBehavior.AllowGet);               
        }
        [HttpPost]
        public JsonResult Update(int id, string acronym, string name)
        {
            return Json(p.Update(id,acronym, name), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Delete(int id)
        {
            return Json(p.Delete(id), JsonRequestBehavior.AllowGet);
        }
    }
}