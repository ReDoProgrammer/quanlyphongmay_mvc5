using System;
using System.Collections.Generic;
using System.Data;
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
    }
}