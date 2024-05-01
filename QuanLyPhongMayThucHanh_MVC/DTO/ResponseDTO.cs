using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuanLyPhongMayThucHanh_MVC.DTO
{
    public class ResponseDTO
    {
        public int code { get; set; }
        public string icon { get; set; }
        public string header { get; set; }
        public string msg { get; set; }
    }
}