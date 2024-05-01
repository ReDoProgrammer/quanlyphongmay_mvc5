using QuanLyPhongMayThucHanh_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Areas.admin.Controllers
{
    public class StatisticController : BaseController
    {
        private Statistic s;
        public StatisticController()
        {
            s = new Statistic();
        }
        // GET: admin/Statistic
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Filter(int classroom_id, int lecturer_id, DateTime fromdate, DateTime todate, int subject_id, string keyword)
        {
            return Json(new { code = 200, icon = "success",header="SUCCESSFULLY",msg="Load statistic filter successfully!!",content = s.Filter(classroom_id,lecturer_id,fromdate,todate,subject_id,keyword)},JsonRequestBehavior.AllowGet);
        }
    }
}