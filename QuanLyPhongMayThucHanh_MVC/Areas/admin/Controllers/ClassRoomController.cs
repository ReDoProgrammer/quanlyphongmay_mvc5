using QuanLyPhongMayThucHanh_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Areas.admin.Controllers
{
    public class ClassRoomController : BaseController
    {
        private ClassRoom cr;
        public ClassRoomController()
        {
            cr = new ClassRoom();
        }
        // GET: admin/ClassRoom
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Select(int faculty_id, string keyword)
        {
            return Json(new { code = 200, icon = "success",msg="Load classrooms list successfully",classrooms = cr.Select(faculty_id,keyword) }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SelectByFaculty(int faculty_id)
        {
            return Json(new { code = 200, icon = "success", msg = "Load classrooms list by faculty successfully", classrooms = cr.SelectByFaculty(faculty_id) }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Create(string name,string academic_year,int faculty_id)
        {
            return Json(cr.Create(name, academic_year, faculty_id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(int id,string name, string academic_year, int faculty_id)
        {
            return Json(cr.Update(id, name, academic_year, faculty_id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            return Json(cr.Delete(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Detail(int id)
        {
            var rs = cr.Detail(id);
            if (rs == null)
                return Json(new { code = 403,icon ="error",header="CONTENT NOT FOUND",msg = "Can not get classroom detail" }, JsonRequestBehavior.AllowGet);
            return Json(new { code = 200,icon = "success",header = "RESOURCE MATCH",cr = rs,msg="Get classroom detail successfully"}, JsonRequestBehavior.AllowGet);
        }

    }
}