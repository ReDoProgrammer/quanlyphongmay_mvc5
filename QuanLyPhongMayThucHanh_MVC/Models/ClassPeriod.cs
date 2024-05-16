using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace QuanLyPhongMayThucHanh_MVC.Models
{
    public class ClassPeriod:DB
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public int Order { get; set; }

        public ClassPeriod() { }
        public ClassPeriod(int Id,string Name, string StartTime, string EndTime) {
            this.Id = Id;
            this.Name = Name;
            this.StartTime = StartTime;
            this.EndTime = EndTime;
        }

        private List<ClassPeriod> ConvertToList(DataTable dt)
        {
            var lst = new List<ClassPeriod>();
            if (dt == null) return null;
            foreach (DataRow r in dt.Rows)
            {
                lst.Add(new ClassPeriod
                {
                    Id = int.Parse(r["id"].ToString()),
                    Name = r["name"].ToString(),
                    StartTime = r["start_time"].ToString(),
                    EndTime = r["end_time"].ToString(),
                    Order = int.Parse(r["order"].ToString())
                });
            }
            return lst;
        }
        public List<ClassPeriod> Select()
        {
            return ConvertToList(ExecuteQuery("[cp_select]"));
        }
    }
}