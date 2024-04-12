using QuanLyPhongMayThucHanh_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Areas.admin.Controllers
{
    public class TeachingProgressController : BaseController
    {
        private TeachingProgress tp;
        public TeachingProgressController() { tp = new TeachingProgress(); }
        // GET: admin/TeachingProgress
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Filter(int lecturer_id, int subject_id, int semester_id, string school_year, int classroom_id, string keyword, int page)
        {
            return Json(new { code = 200,icon = "success",header="SUCCESSFULLY",msg="Filter teaching progress successfully!",progresses= tp.Filter(lecturer_id, subject_id, semester_id, school_year, classroom_id, keyword, page) }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Detail(int id)
        {
            var rs = tp.Detail(id);
            return Json(new { code = 200, icon = "success", header = "SUCCESSFULLY", semester = rs, msg = "Get teaching progress detail successfully" }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Insert(int lecturer_id, int subject_id, int semester_id, string school_year, int number_of_students, int classroom_id)
        {
            var rs = tp.Create(lecturer_id,subject_id,semester_id,school_year,number_of_students, classroom_id);
            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(int id,int lecturer_id, int subject_id, int semester_id, string school_year, int number_of_students, int classroom_id)
        {
            var rs = tp.Update(id,lecturer_id, subject_id, semester_id, school_year, number_of_students, classroom_id);
            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            var rs = tp.Delete(id);
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
    }
}