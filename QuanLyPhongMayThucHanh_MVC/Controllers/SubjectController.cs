using QuanLyPhongMayThucHanh_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Controllers
{
    public class SubjectController : BaseController
    {
        private Subject sb;
        public SubjectController()
        {
            sb = new Subject();
        }
        
        
        
        // GET: Subject

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult Select()
        {
            return Json(new { code = 200,subjects = sb.Select(), msg = "Load subjects list successfully!" }, JsonRequestBehavior.AllowGet);
        }
    }
}