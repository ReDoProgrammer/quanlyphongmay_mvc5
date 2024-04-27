using Newtonsoft.Json;
using QuanLyPhongMayThucHanh_MVC.DTO;
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
        public int order { get; set; }
        private List<Semester> ConvertToList(DataTable dt)
        {
            var lst = new List<Semester>();
            foreach (DataRow r  in dt.Rows)
            {
                lst.Add(new Semester
                {
                    id = int.Parse(r["id"].ToString()),
                    order = int.Parse(r["order"].ToString()),
                    name = r["name"].ToString()
                });
            }
            return lst;
        }

        public string Insert(string name, int order)
        {
            SqlParameter[] prs = {
                new SqlParameter("@name", name),
                new SqlParameter("@order", order),
            };
            return (string)ExecuteScalar("semester_insert", prs);
        }
        public string Update(int id,string name, int order)
        {
            SqlParameter[] prs = {
                new SqlParameter("@id", id),
                new SqlParameter("@name", name),
                new SqlParameter("@order", order)
            };
            return (string)ExecuteScalar("semester_update", prs);
        }

        public string Delete(int id)
        {
            SqlParameter[] prs = {
                new SqlParameter("@id", id)               
            };
            return (string)ExecuteScalar("semester_delete", prs);
        }

        public Semester Detail(int id)
        {
            SqlParameter[] prs = { new SqlParameter("@id", id) };
            var r = ExecuteQuery("semester_detail", prs).Rows[0];
            if (r == null) return null;
            return new Semester
            {
                id = int.Parse(r["id"].ToString()),
                order = int.Parse(r["order"].ToString()),
                name = r["name"].ToString()
            };
        }

        public List<Semester> Select()
        {
            return ConvertToList(ExecuteQuery("semester_select"));
        }
    }
}