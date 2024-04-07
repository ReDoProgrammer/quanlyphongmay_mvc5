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
        private PCRoom room;
        public RoomController()
        {
            room = new PCRoom();
        }
        // GET: admin/Room
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult Search(string keyword)
        {
            var rooms = room.Search(keyword);
            return Json(new { code = 200, rooms = rooms, msg = "Load danh sách phòng máy thành công!" }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Detail(int id)
        {
            var detail = room.Detail(id);
            return Json(new { code = 200, room = detail, msg = "Lấy thông tin phòng máy thành công!" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert(string name, string location, int number_of_pc, string monitor, string mainboard, string cpu, string ram, string vga, string ssd, string hdd, string keyboard, string mouse, string headphone, string speaker, string psu, string note)
        {
            var rs = room.Insert(name, location, number_of_pc, monitor, mainboard, cpu, ram, vga, ssd, hdd, keyboard, mouse, headphone, speaker, psu, note);
            if (rs > 0)
                return Json(new { code = 201, icon = "success", msg = "New room has been created!" }, JsonRequestBehavior.AllowGet);
            return Json(new { code = rs, msg = "Can not create new room" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update(int id, string name, string location, int number_of_pc, string monitor, string mainboard, string cpu, string ram, string vga, string ssd, string hdd, string keyboard, string mouse, string headphone, string speaker, string psu, string note)
        {
            var rs = room.Update(id, name, location, number_of_pc, monitor, mainboard, cpu, ram, vga, ssd, hdd, keyboard, mouse, headphone, speaker, psu, note);
            if (rs > 0)
                return Json(new { code = 201, icon = "success", msg = "The room has been updated!" }, JsonRequestBehavior.AllowGet);
            return Json(new { code = rs, msg = "Can not update this pc room" }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult Delete(int id)
        {
            var rs = room.Delete(id);
            if (rs > 0)
                return Json(new { code = 200, icon = "success", msg = "The room has been deleted!" }, JsonRequestBehavior.AllowGet);
            return Json(new { code = rs,icon="error", msg = "Can not delete this pc room" }, JsonRequestBehavior.AllowGet);
        }
    }
}