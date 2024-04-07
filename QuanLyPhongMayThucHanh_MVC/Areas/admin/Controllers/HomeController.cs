using QuanLyPhongMayThucHanh_MVC.Areas.admin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Areas.admin.Controllers
{
    public class HomeController : BaseController
    {
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
    }
}