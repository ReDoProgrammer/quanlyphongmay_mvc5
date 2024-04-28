using QuanLyPhongMayThucHanh_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Areas.admin.Controllers
{
    public class PracticeScheduleController : BaseController
    {
        private PracticeSchedule ps;
        public PracticeScheduleController()
        {
            ps = new PracticeSchedule();
        }
        // GET: admin/PracticeSchedule
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult Calendar(DateTime fromDate, DateTime toDate) {
            return Json(new { code = 200, icon = "success", header = "SUCCESSFULLY", calendars = ps.Calendar(fromDate, toDate) }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SubmitCalendar(int id)
        {
            var t = ps.ActiveCalendar(id);
            if (t)
                return Json(new { code = 200, icon = "success", header = "SUCCESSFULLY", msg = "Active schedule successfully" }, JsonRequestBehavior.AllowGet);
            return Json(new { code = 403, icon = "error", header = "FAILED", msg = "Active schedule failed" }, JsonRequestBehavior.AllowGet);
        }
    }
}