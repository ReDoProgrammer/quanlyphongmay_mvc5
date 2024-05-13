using QuanLyPhongMayThucHanh_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Controllers
{
    public class HomeController : BaseController
    {
        private OwnSummary os;
        private OwnRecentCalendar orc;
        public HomeController()
        {
            os = new OwnSummary();
            orc = new OwnRecentCalendar();
        }
        public ActionResult Index()
        {
            return View();
        }

        [ChildActionOnly]
        public ActionResult RenderSideMenu()
        {           
            return PartialView("_SideMenu");
        }

        public JsonResult Summary()
        {
            var lec = (Lecturer)Session["lecturer"];
            return Json(new { code = 200,icon = "success",header="Get own summary successfully",classes = os.GetSummary(lec.id),calendars = orc.OwnRencentCalendar(lec.id)}, JsonRequestBehavior.AllowGet);
        }
    }
}