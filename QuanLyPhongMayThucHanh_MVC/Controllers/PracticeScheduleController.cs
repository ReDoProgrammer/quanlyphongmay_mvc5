using QuanLyPhongMayThucHanh_MVC.Areas.admin.Models;
using QuanLyPhongMayThucHanh_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Controllers
{
    public class PracticeScheduleController : BaseController
    {

        private PracticeSchedule ps;
        public PracticeScheduleController()
        {
            ps = new PracticeSchedule();
        }

        // GET: PracticeSchedule
        public ActionResult Calendar()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Book(DateTime book_date, int room_id, int subject_id, int class_period_id, string note)
        {
            try
            {
                var lec = (Models.Lecturer)Session["lecturer"];                
                var rs = ps.Book(book_date, room_id, subject_id, lec.id, class_period_id, note,lec.id);
                if (rs > 0)
                    return Json(new { code = 201, msg = "Book PC LAB room successfully!", JsonRequestBehavior.AllowGet });
                return Json(new { code = 403, msg = "Book room failed", JsonRequestBehavior.AllowGet });

            }
            catch (Exception ex)
            {
                return Json(new { code = 500, msg = "Book room failed with error: " + ex.Message, JsonRequestBehavior.AllowGet });
            }
        }

        [HttpGet]
        public JsonResult LABCalendar(DateTime from_date, DateTime to_date)
        {
            try
            {
                return Json(new { code = 200, calendars = ps.Calendar(from_date, to_date), msg = "Load danh sách phòng máy thành công!" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { code = 500, msg = "Lỗi tra cứu phòng LAB: " + ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }
    }
}