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
    }
}