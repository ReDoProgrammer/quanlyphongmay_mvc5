using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace QuanLyPhongMayThucHanh_MVC.Models
{
    public class Position:DB
    {
        public int Id { get; set; }
        public string Acronym { get; set; }
        public string Name { get; set; }
        public Position() { }
        private List<Position> ConvertToList(DataTable dt)
        {
            if (dt == null) return null;
            var lst = new List<Position>();
            foreach(DataRow r in dt.Rows)
            {
                lst.Add(new Position
                {
                    Id = int.Parse(r["id"].ToString()),
                    Acronym = r["acronym"].ToString(),
                    Name = r["name"].ToString()
                });
            }
            return lst;
        }

        public List<Position> List()
        {
            return ConvertToList(ExecuteQuery("[positon_select]"));
        }

        public string Insert(string acronym, string name)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@acronym",acronym),
                new SqlParameter("@name",name)
            };
            return (string)ExecuteScalar("[positon_insert]", prs);
        }
        public string Update(int id, string acronym, string name)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@id",id),
                new SqlParameter("@acronym",acronym),
                new SqlParameter("@name",name)
            };
            return (string)ExecuteScalar("[positon_update]", prs);
        }
        public string Delete(int id)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@id",id)               
            };
            return (string)ExecuteScalar("[positon_delete]", prs);
        }
        public Position Detail(int id)
        {
            SqlParameter[] prs = { new SqlParameter("@id", id) };
            var r = ExecuteQuery("[positon_select_one]", prs).Rows[0];
            if (r == null) return null;
            return new Position
            {
                Id = int.Parse(r["id"].ToString()),
                Acronym = r["acronym"].ToString(),
                Name = r["name"].ToString()
            };
        }
    }
}