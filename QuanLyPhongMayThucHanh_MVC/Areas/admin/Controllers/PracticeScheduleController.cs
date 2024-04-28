using QuanLyPhongMayThucHanh_MVC.DTO;
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
            {
                string content = System.IO.File.ReadAllText(Server.MapPath("~/Assets/tmp/lecturer_accepted.html"));

                var b = ps.Detail(id);

                content = content.Replace("{{Id}}", id.ToString());
                content = content.Replace("{{Room}}", b.Room);
                content = content.Replace("{{Subject}}", id.ToString(b.Subject));
                content = content.Replace("{{ClassPeriod}}", b.ClassPeriod);
                content = content.Replace("{{StartTime}}", b.StartDate);
                content = content.Replace("{{EndTime}}", b.EndDate);
                content = content.Replace("{{Remark}}", b.Note);
                content = content.Replace("{{Lecturer}}", b.Lecturer);
                content = content.Replace("{{BookTime}}", DateTime.Now.ToString("dd/MM/yyyy HH:mm"));

                Mailer.SendMail(b.LecturerEmail, "PCLAB Mngr", "Booking PC LAB accepted", content);



                return Json(new { code = 200, icon = "success", header = "SUCCESSFULLY", msg = "Active schedule successfully" }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { code = 403, icon = "error", header = "FAILED", msg = "Active schedule failed" }, JsonRequestBehavior.AllowGet);
        }
    }
}