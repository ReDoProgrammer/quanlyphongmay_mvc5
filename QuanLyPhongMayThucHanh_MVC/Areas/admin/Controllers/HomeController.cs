using QuanLyPhongMayThucHanh_MVC.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Areas.admin.Controllers
{
    public class HomeController : BaseController
    {
        private Summary s;
        public HomeController()
        {
            s = new Summary();
        }

        // GET: admin/Home
        public ActionResult Index()
        {
          
            return View();
        }

        [ChildActionOnly]
        public ActionResult RenderProfile()
        {
            var admin = (Lecturer)Session["admin"];
            return PartialView("_RenderProfile",admin);
        }

        public ActionResult RenderSideMenu()
        {
            return PartialView("_SideMenu");
        }

        public JsonResult Summary()
        {
            return Json(new { code = 200, icon = "success", header = "Statistic summary successfully!", summary = s.GetSummary() }, JsonRequestBehavior.AllowGet);
        }
    }
}