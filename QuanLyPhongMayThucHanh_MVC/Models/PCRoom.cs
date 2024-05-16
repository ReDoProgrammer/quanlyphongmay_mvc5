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
        public int StatusId { get; set; }
        public int Broken { get; set; }
        public List<PCRoom> Search(string keyword)
        {
            SqlParameter[] pars =
            {
                new SqlParameter("@keyword",keyword)
            };
            return ConvertToList(ExecuteQuery("[room_search]", pars));
        }

        public List<PCRoom> Lookup(DateTime date, int class_period_id_1,int @class_period_id_2)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@date",date.ToString("yyyy-MM-dd")),              
                new SqlParameter("@class_period_id_1",class_period_id_1),
                new SqlParameter("@class_period_id_2",class_period_id_2)
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
                SSD = r["SSD"].ToString(),
                StatusId = int.Parse(r["status_id"].ToString())

            };
            return room;
        }

        public string Insert(string name, string location, int number_of_pc,int activepc, string monitor, string mainboard, string cpu, string ram, string vga, string ssd, string hdd, string keyboard, string mouse, string headphone, string speaker, string psu, string note,int status_id)
        {
            SqlParameter[] prs =
            {
                new SqlParameter ("@name",name),
                new SqlParameter ("@number_of_pc",number_of_pc),
                new SqlParameter ("@activepc",activepc),
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
                new SqlParameter ("@SSD",ssd),
                new SqlParameter ("@status_id",status_id)
            };
            return (string)ExecuteScalar("[room_insert]", prs);

        }


        public string Update(int id,string name, string location, int number_of_pc,int activepc, string monitor, string mainboard, string cpu, string ram, string vga, string ssd, string hdd, string keyboard, string mouse, string headphone, string speaker, string psu, string note,int status_id)
        {
            SqlParameter[] prs =
            {
                new SqlParameter ("@id",id),
                new SqlParameter ("@name",name),
                new SqlParameter ("@number_of_pc",number_of_pc),
                new SqlParameter ("@activepc",activepc),
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
                new SqlParameter ("@SSD",ssd),
                new SqlParameter ("@status_id",status_id)
            };
            return (string)ExecuteScalar("[room_update]", prs);

        }
        public string Delete(int id)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@id",id)
            };
            return (string)ExecuteScalar("[room_delete]", prs);
        }

        private List<PCRoom> ConvertToList(DataTable dt)
        {
            if (dt == null) return null;
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
                    StatusId = int.Parse(r["status_id"].ToString()),
                    Status = r["status"].ToString(),
                    Broken = int.Parse(r["broken"].ToString())
                });
            }
            return lst;
        }
    }
}