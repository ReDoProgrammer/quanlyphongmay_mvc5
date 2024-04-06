using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace QuanLyPhongMayThucHanh_MVC.Models
{
    public class PCRoom : DB
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int NumberOfPC { get; set; }
        public string Location { get; set; }
        public string Note { get; set; }
        public string CPU { get; set; }
        public string VGA { get; set; }
        public string Mainboard { get; set; }
        public string PSU { get; set; }
        public string Keyboard { get; set; }
        public string Mouse { get; set; }
        public string Monitor { get; set; }
        public string Headphone { get; set; }
        public string Speaker { get; set; }
        public string RAM { get; set; }
        public string HDD { get; set; }
        public string SSD { get; set; }
        public string Status { get; set; }
        public List<PCRoom> Search(string keyword)
        {
            SqlParameter[] pars =
            {
                new SqlParameter("@keyword",keyword)
            };
            var dt = ExecuteQuery("[room_search]", pars);
            var lst = new List<PCRoom>();
            foreach (DataRow r in dt.Rows)
            {
                lst.Add(new PCRoom
                {
                    Id = int.Parse(r["id"].ToString()),
                    Name = r["name"].ToString(),
                    NumberOfPC = int.Parse(r["number_of_pc"].ToString()),
                    Location = r["location"].ToString(),
                    Note = r["note"].ToString(),
                    CPU = r["CPU"].ToString(),
                    VGA = r["VGA"].ToString(),
                    Mainboard = r["Mainboard"].ToString(),
                    PSU = r["PSU"].ToString(),
                    Keyboard = r["Keyboard"].ToString(),
                    Mouse = r["Mouse"].ToString(),
                    Monitor = r["Monitor"].ToString(),
                    Headphone = r["Headphone"].ToString(),
                    Speaker = r["Speaker"].ToString(),
                    RAM = r["RAM"].ToString(),
                    HDD = r["HDD"].ToString(),
                    SSD = r["SSD"].ToString(),
                    Status = r["status"].ToString() == "1" ? "Đang sử dụng" : "Phòng trống"
                });
            }
            return lst;
        }

    }
}