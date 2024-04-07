using QuanLyPhongMayThucHanh_MVC.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Controllers
{
    public class PCRoomController : BaseController
    {
        private PCRoom room;
        public PCRoomController()
        {
            room = new PCRoom();
        }
        // GET: PCRoom
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult Search(string keyword) {
            var rooms = room.Search(keyword);
            return Json(new { code = 200, rooms = rooms, msg = "Load danh sách phòng máy thành công!" }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Book()
        {
            return View();
        }

        [HttpGet]
        public JsonResult Lookup(DateTime from_date,DateTime to_date,int cp)//cp: class period
        {
            try
            {
                //DateTime from_date = DateTime.ParseExact(fromdate, "yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture);
                //DateTime to_date = DateTime.ParseExact(todate, "yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture);
                var rooms = room.Lookup(from_date,to_date,cp);
                return Json(new { code = 200, rooms = rooms, msg = "Load danh sách phòng máy thành công!" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { code = 500, msg = "Lỗi tra cứu phòng LAB: "+ex.Message }, JsonRequestBehavior.AllowGet);
            }
        
        }

    }
}