using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Areas.admin.Controllers
{
    public class StatisticController : BaseController
    {
        // GET: admin/Statistic
        public ActionResult Index()
        {
            return View();
        }
    }
}