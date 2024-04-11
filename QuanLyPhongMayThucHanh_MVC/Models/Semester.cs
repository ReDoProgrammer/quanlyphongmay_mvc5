using Common;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace QuanLyPhongMayThucHanh_MVC.Models
{
    public class Semester:DB
    {
        public int id { get; set; }
        public string name { get; set; }
        private List<Semester> ConvertToList(DataTable dt)
        {
            var lst = new List<Semester>();
            foreach (DataRow r  in dt.Rows)
            {
                lst.Add(new Semester
                {
                    id = int.Parse(r["id"].ToString()),
                    name = r["name"].ToString()
                });
            }
            return lst;
        }

        public ResponseObject Insert(string name)
        {
            SqlParameter[] prs = { new SqlParameter("@name", name) };
            var rs = (string)ExecuteScalar("semester_insert",prs);
            return JsonConvert.DeserializeObject<ResponseObject>(rs);
        }
        public ResponseObject Update(int id,string name)
        {
            SqlParameter[] prs = {
                new SqlParameter("@id", id),
                new SqlParameter("@name", name)
            };
            var rs = (string)ExecuteScalar("semester_update", prs);
            return JsonConvert.DeserializeObject<ResponseObject>(rs);
        }

        public ResponseObject Delete(int id)
        {
            SqlParameter[] prs = {
                new SqlParameter("@id", id)               
            };
            var rs = (string)ExecuteScalar("semester_delete", prs);
            return JsonConvert.DeserializeObject<ResponseObject>(rs);
        }

        public Semester Detail(int id)
        {
            SqlParameter[] prs = { new SqlParameter("@id", id) };
            var r = ExecuteQuery("semester_detail", prs).Rows[0];
            if (r == null) return null;
            return new Semester
            {
                id = int.Parse(r["id"].ToString()),
                name = r["name"].ToString()
            };
        }

        public List<Semester> Select()
        {
            return ConvertToList(ExecuteQuery("semester_select"));
        }
    }
}