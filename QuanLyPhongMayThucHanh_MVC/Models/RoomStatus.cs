using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace QuanLyPhongMayThucHanh_MVC.Models
{
    public class RoomStatus:DB
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool HasRemark { get; set; }
        private List<RoomStatus> ConvertToList(DataTable dt)
        {
            if (dt == null) return null;
            var lst = new List<RoomStatus>();
            foreach(DataRow r in dt.Rows)
            {
                lst.Add(new RoomStatus
                {
                    Id = int.Parse(r["id"].ToString()),
                    Name = r["name"].ToString(),
                    HasRemark = bool.Parse(r["has_remark"].ToString())
                });
            }
            return lst;
        }

        public string Insert(string name, bool has_remark)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@name",name),
                new SqlParameter("@has_remark",has_remark)
            };
            return (string)ExecuteScalar("rs_insert", prs);
        }
        public string Update(int id,string name, bool has_remark)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@id",id),
                new SqlParameter("@name",name),
                new SqlParameter("@has_remark",has_remark)
            };
            return (string)ExecuteScalar("rs_update", prs);
        }
        public string Delete(int id)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@id",id)              
            };
            return (string)ExecuteScalar("rs_delete", prs);
        }
        public RoomStatus Detail(int id)
        {
            SqlParameter[] prs = { new SqlParameter("@id", id) };
            var r = ExecuteQuery("rs_detail", prs);
            if (r == null) return null;
            var d = r.Rows[0];
            return new RoomStatus
            {
                Id = int.Parse(d["id"].ToString()),
                Name = d["name"].ToString(),
                HasRemark = bool.Parse(d["has_remark"].ToString())
            };
        }

        public List<RoomStatus> Select()
        {
            return ConvertToList(ExecuteQuery("rs_select"));
        }
    } 
}