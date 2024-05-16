using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace QuanLyPhongMayThucHanh_MVC.Models
{
    public class OwnRecentCalendar:DB 
    {
        public string Id { get; set; }
        public string FacultyName { get; set; }
        public string ClassRoom { get; set; }
        public string Subject { get; set; }
        public string NumberOfStudents { get; set; }
        public string Room { get; set; }
        public string ClassPeriod { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Status { get; set; }

        private List<OwnRecentCalendar> ConvertToList(DataTable dt)
        {
            var lst = new List<OwnRecentCalendar>();
            if (dt == null) return null;
            foreach (DataRow r in dt.Rows)
            {
                lst.Add(new OwnRecentCalendar
                {
                    Id = r["id"].ToString(),
                    FacultyName = r["facultyname"].ToString(),
                    ClassRoom = r["classroom"].ToString(),
                    Subject = r["subject"].ToString(),
                    NumberOfStudents = r["number_of_students"].ToString(),
                    Room = r["room"].ToString(),
                    ClassPeriod = r["classperiod"].ToString(),
                    StartDate = r["startdate"].ToString(),
                    EndDate = r["endate"].ToString(),
                    Status = r["status"].ToString()
                });
            }
            return lst;
        }

        public List<OwnRecentCalendar> OwnRencentCalendar(int lecturer_id)
        {
            SqlParameter[] prs = { new SqlParameter("@lecturer_id", lecturer_id) };
            return ConvertToList(ExecuteQuery("lecturer_own_recent_calendars", prs));
        }
    }
}