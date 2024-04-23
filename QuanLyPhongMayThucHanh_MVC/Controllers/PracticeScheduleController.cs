using QuanLyPhongMayThucHanh_MVC.DTO;
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
        public ActionResult OwnCalendar()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Book(DateTime book_date, int room_id, int teaching_process_id, int class_period_id_1, int class_period_id_2, string note)
        {
            try
            {
                var lec = (Lecturer)Session["lecturer"];                
                var rs = ps.Book(book_date, room_id, teaching_process_id, class_period_id_1, class_period_id_2, note,lec.id);
                if (rs > 0)
                {
                    //send email
                    string content = System.IO.File.ReadAllText(Server.MapPath("~/Assets/tmp/lecturer.html"));

                    var b = ps.Detail(rs);

                    content = content.Replace("{{Id}}",rs.ToString());
                    content = content.Replace("{{Room}}",b.Room);
                    content = content.Replace("{{Subject}}",rs.ToString(b.Subject));
                    content = content.Replace("{{ClassPeriod}}", b.ClassPeriod);
                    content = content.Replace("{{StartTime}}", b.StartDate);
                    content = content.Replace("{{EndTime}}", b.EndDate);                  
                    content = content.Replace("{{Remark}}", b.Note);                  
                    content = content.Replace("{{Lecturer}}", lec.fullname);                  
                    content = content.Replace("{{BookTime}}", DateTime.Now.ToString("dd/MM/yyyy HH:mm"));

                    Mailer.SendMail(lec.email, "PCLAB Mngr", "Booking PC LAB successfully", content);

                    string admin_content = System.IO.File.ReadAllText(Server.MapPath("~/Assets/tmp/admin.html"));
                    admin_content = admin_content.Replace("{{Id}}", rs.ToString());
                    admin_content = admin_content.Replace("{{Room}}", b.Room);
                    admin_content = admin_content.Replace("{{Subject}}", rs.ToString(b.Subject));
                    admin_content = admin_content.Replace("{{ClassPeriod}}", b.ClassPeriod);
                    admin_content = admin_content.Replace("{{StartTime}}", b.StartDate);
                    admin_content = admin_content.Replace("{{EndTime}}", b.EndDate);
                    admin_content = admin_content.Replace("{{Remark}}", b.Note);
                    admin_content = admin_content.Replace("{{Lecturer}}", lec.fullname);
                    admin_content = admin_content.Replace("{{BookTime}}", DateTime.Now.ToString("dd/MM/yyyy HH:mm"));
                    admin_content = admin_content.Replace("{{Username}}", lec.username);
                    admin_content = admin_content.Replace("{{BookTime}}", DateTime.Now.ToString("dd/MM/yyyy HH:mm"));

                    var adm = new Lecturer().Admin();
                    Mailer.SendMail(adm.email, "PCLAB Mngr", "Booking PC LAB", admin_content);
                    return Json(new { code = 201, msg = "Book PC LAB room successfully!", JsonRequestBehavior.AllowGet });
                }
                return Json(new { code = 403, msg = "Book room failed", JsonRequestBehavior.AllowGet });

            }
            catch (Exception ex)
            {
                return Json(new { code = 500, msg = "Book room failed with error: " + ex.Message, JsonRequestBehavior.AllowGet });
            }
        }

        [HttpPost]
        public JsonResult Delete(int id, string remark)
        {
            var b = ps.Detail(id);
            var rs = ps.Delete(id);
            if (rs > 0)
            {
                var lec = (Models.Lecturer)Session["lecturer"];
                string content = System.IO.File.ReadAllText(Server.MapPath("~/Assets/tmp/lecturer_cancel.html"));

              

                content = content.Replace("{{Id}}", rs.ToString());
                content = content.Replace("{{Room}}", b.Room);
                content = content.Replace("{{Subject}}", rs.ToString(b.Subject));
                content = content.Replace("{{ClassPeriod}}", b.ClassPeriod);
                content = content.Replace("{{StartTime}}", b.StartDate);
                content = content.Replace("{{EndTime}}", b.EndDate);
                content = content.Replace("{{Remark}}", b.Note);
                content = content.Replace("{{Lecturer}}", lec.fullname);
                content = content.Replace("{{BookTime}}", DateTime.Now.ToString("dd/MM/yyyy HH:mm"));
                content = content.Replace("{{CancelRemark}}", remark);

                Mailer.SendMail(lec.email, "PCLAB Mngr", "Cancel booking PC LAB successfully", content);
                return Json(new { code = 200,icon = "success",header = "SUCESSFULLY", msg = "The room has been canceled!" }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { code = 400,  msg = "Can not cancel this room!" }, JsonRequestBehavior.AllowGet);
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

        [HttpGet]
        public JsonResult LoadOwnCalendar(DateTime from_date, DateTime to_date)
        {
            try
            {
                var lec = (Lecturer)Session["lecturer"];
                return Json(new { code = 200, calendars = ps.OwnCalendar(from_date, to_date,lec.id), msg = "Load own calendar successfully!" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { code = 500, msg = "Load own calendar failed with error: " + ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpGet]
        public JsonResult Detail(int id)
        {
            return Json(new { code = 200, calendar = ps.Detail(id), msg = "Get calendar detail successfully!" }, JsonRequestBehavior.AllowGet);
        }
    }
}