using QuanLyPhongMayThucHanh_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Controllers
{
    public class ClassPeriodController : BaseController
    {
        private ClassPeriod cp;
        public ClassPeriodController()
        {
            cp = new ClassPeriod();
        }
        [HttpGet]
        public JsonResult List()
        {
            var cps = cp.Select();
            return Json(new { code = 200, cps = cps, msg = "Load danh sách tiết học thành công!" }, JsonRequestBehavior.AllowGet);
        }
    }
}