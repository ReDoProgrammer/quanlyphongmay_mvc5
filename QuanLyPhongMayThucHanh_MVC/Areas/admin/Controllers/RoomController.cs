using QuanLyPhongMayThucHanh_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Areas.admin.Controllers
{
    public class RoomController : BaseController
    {
        // GET: admin/Room
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult Search(string keyword)
        {
            var rooms = new PCRoom().Search(keyword);
            return Json(new { code = 200, rooms = rooms, msg = "Load danh sách phòng máy thành công!" }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Detail(int id)
        {
            var room = new PCRoom().Detail(id);
            return Json(new { code = 200, room = room, msg = "Lấy thông tin phòng máy thành công!" }, JsonRequestBehavior.AllowGet);
        }
    }
}