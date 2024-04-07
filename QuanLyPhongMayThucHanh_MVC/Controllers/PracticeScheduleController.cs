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
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Book(DateTime book_date, int room_id, int subject_id, int class_period_id, string note)
        {
            try
            {
                var lec = (Models.Lecturer)Session["lecturer"];
                var rs = ps.Book(book_date, room_id, subject_id, lec.id, class_period_id, note);
                if (rs > 0)
                    return Json(new { code = 201, msg = "Book PC LAB room successfully!", JsonRequestBehavior.AllowGet });
                return Json(new { code = 403, msg = "Book room failed", JsonRequestBehavior.AllowGet });

            }
            catch (Exception ex)
            {
                return Json(new { code = 500, msg = "Book room failed with error: " + ex.Message, JsonRequestBehavior.AllowGet });
            }
        }
    }
}