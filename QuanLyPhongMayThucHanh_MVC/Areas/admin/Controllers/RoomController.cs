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
        public JsonResult Insert(string name, string location, int number_of_pc,int activepc, string monitor, string mainboard, string cpu, string ram, string vga, string ssd, string hdd, string keyboard, string mouse, string headphone, string speaker, string psu, string note, int status_id)
        {
            var rs = room.Insert(name, location, number_of_pc,activepc, monitor, mainboard, cpu, ram, vga, ssd, hdd, keyboard, mouse, headphone, speaker, psu, note,status_id);
            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update(int id, string name, string location, int number_of_pc, int activepc, string monitor, string mainboard, string cpu, string ram, string vga, string ssd, string hdd, string keyboard, string mouse, string headphone, string speaker, string psu, string note, int status_id)
        {
            var rs = room.Update(id, name, location, number_of_pc,activepc, monitor, mainboard, cpu, ram, vga, ssd, hdd, keyboard, mouse, headphone, speaker, psu, note, status_id);
            return Json(rs, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult Delete(int id)
        {
            var rs = room.Delete(id);
            return Json(rs, JsonRequestBehavior.AllowGet);
        }
    }
}