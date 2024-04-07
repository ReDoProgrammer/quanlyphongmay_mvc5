using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Areas.admin.Controllers
{
    public class LecturerController : BaseController
    {
        // GET: admin/Lecturer
        public ActionResult Index()
        {
            return View();
        }
    }
}