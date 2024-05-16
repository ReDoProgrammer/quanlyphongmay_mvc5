﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace QuanLyPhongMayThucHanh_MVC.Models
{
    public class Statistic:DB
    {
        public string Id { get; set; }
        public string RoomName { get; set; }
        public string Faculty { get; set; }
        public string Classroom { get; set; }
        public string Subject { get; set; }
        public string Semester { get; set; }
        public string Lecturer { get; set; }
        public string ClassPeriod { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }

        private List<Statistic> ConvertToList(DataTable dt)
        {
            if (dt == null) return null;
            var lst = new List<Statistic>();
            foreach(DataRow r in dt.Rows)
            {
                lst.Add(new Statistic
                {
                    Id = r["id"].ToString(),
                    RoomName = r["roomname"].ToString(),
                    Faculty = r["faculty_name"].ToString(),
                    Classroom = r["classname"].ToString(),
                    Subject = r["subject"].ToString(),
                    Semester = r["semester"].ToString(),
                    Lecturer = r["lecturer"].ToString(),
                    ClassPeriod = r["class_period"].ToString(),
                    FromDate = r["fromdate"].ToString(),
                    ToDate = r["todate"].ToString()
                });
            }
            return lst;
        }
        public List<Statistic> Filter(int classroom_id, int lecturer_id, DateTime fromdate, DateTime todate,int subject_id, string keyword)
        {
            try
            {
                SqlParameter[] prs =
                   {
                new SqlParameter("@classroom_id",classroom_id),
                new SqlParameter("@lecturer_id",lecturer_id),
                new SqlParameter("@fromdate",fromdate),
                new SqlParameter("@todate",todate),
                new SqlParameter("@subject_id",subject_id),
                new SqlParameter("@keyword",keyword)
            };
                return ConvertToList(ExecuteQuery("statistic_filter", prs));
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}