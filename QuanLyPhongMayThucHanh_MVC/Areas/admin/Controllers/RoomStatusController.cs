using QuanLyPhongMayThucHanh_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Areas.admin.Controllers
{
    public class RoomStatusController : BaseController
    {
        private RoomStatus rs;
        public RoomStatusController()
        {
            rs = new RoomStatus();
        }
        // GET: admin/RoomStatus
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult Select()
        {
            return Json(new { code = 200, icon = "success", header = "SUCCESSFULLY", msg = "Load room statuses successfully",statuses= rs.Select()},JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Detail(int id)
        {
            return Json(new { code = 200, icon = "success", header = "SUCCESSFULLY", msg = "Get room status detail successfully",status= rs.Detail(id)},JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert(string name, bool has_remark)
        {
            return Json(rs.Insert(name, has_remark), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Update(int id,string name, bool has_remark)
        {
            return Json(rs.Update(id,name, has_remark), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            return Json(rs.Delete(id), JsonRequestBehavior.AllowGet);
        }
    }
}