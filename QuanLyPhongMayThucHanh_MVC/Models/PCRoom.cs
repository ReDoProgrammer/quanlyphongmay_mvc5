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
            return ConvertToList(ExecuteQuery("[room_search]", pars));
        }

        public List<PCRoom> Lookup(DateTime date, int cp)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@date",date.ToString("yyyy-MM-dd")),              
                new SqlParameter("@class_period_id",cp)
            };         
            return ConvertToList(ExecuteQuery("room_lookup", prs));
        }

        public PCRoom Detail(int id)
        {
            SqlParameter[] p = { new SqlParameter("@id", id) };
            var r = ExecuteQuery("[room_detail]", p).Rows[0];
            var room = new PCRoom
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
                SSD = r["SSD"].ToString()
            };
            return room;
        }

        public int Insert(string name, string location, int number_of_pc, string monitor, string mainboard, string cpu, string ram, string vga, string ssd, string hdd, string keyboard, string mouse, string headphone, string speaker, string psu, string note)
        {
            SqlParameter[] prs =
            {
                new SqlParameter ("@name",name),
                new SqlParameter ("@number_of_pc",number_of_pc),
                new SqlParameter ("@location",location),
                new SqlParameter ("@note",note),
                new SqlParameter ("@CPU",cpu),
                new SqlParameter ("@VGA",vga),
                new SqlParameter ("@Mainboard",mainboard),
                new SqlParameter ("@PSU",psu),
                new SqlParameter ("@Keyboard",keyboard),
                new SqlParameter ("@Mouse",mouse),
                new SqlParameter ("@Monitor",monitor),
                new SqlParameter ("@Headphone",headphone),
                new SqlParameter ("@Speaker",speaker),
                new SqlParameter ("@RAM",ram),
                new SqlParameter ("@HDD",hdd),
                new SqlParameter ("@SSD",ssd)
            };
            return (int)ExecuteScalar("[room_insert]", prs);

        }


        public int Update(int id,string name, string location, int number_of_pc, string monitor, string mainboard, string cpu, string ram, string vga, string ssd, string hdd, string keyboard, string mouse, string headphone, string speaker, string psu, string note)
        {
            SqlParameter[] prs =
            {
                new SqlParameter ("@id",id),
                new SqlParameter ("@name",name),
                new SqlParameter ("@number_of_pc",number_of_pc),
                new SqlParameter ("@location",location),
                new SqlParameter ("@note",note),
                new SqlParameter ("@CPU",cpu),
                new SqlParameter ("@VGA",vga),
                new SqlParameter ("@Mainboard",mainboard),
                new SqlParameter ("@PSU",psu),
                new SqlParameter ("@Keyboard",keyboard),
                new SqlParameter ("@Mouse",mouse),
                new SqlParameter ("@Monitor",monitor),
                new SqlParameter ("@Headphone",headphone),
                new SqlParameter ("@Speaker",speaker),
                new SqlParameter ("@RAM",ram),
                new SqlParameter ("@HDD",hdd),
                new SqlParameter ("@SSD",ssd)
            };
            return ExecuteNonQuery("[room_update]", prs);

        }
        public int Delete(int id)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@id",id)
            };
            return ExecuteNonQuery("[room_delete]", prs);
        }

        private List<PCRoom> ConvertToList(DataTable dt)
        {
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