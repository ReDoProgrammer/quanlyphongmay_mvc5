using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace QuanLyPhongMayThucHanh_MVC.Models
{
    public class OwnSummary:DB
    {
        public string Id { get; set; }
        public string FacultyName { get; set; }
        public string ClassRoom { get; set; }
        public string SubjectName { get; set; }
        public string SchoolYear { get; set; }
        public string NumberOfStudents { get; set; }
        private List<OwnSummary> ConvertToList(DataTable dt)
        {
            if (dt == null) return null;
            var lst = new List<OwnSummary>();
            foreach(DataRow r in dt.Rows)
            {
                lst.Add(new OwnSummary
                {

                    Id = r["id"].ToString(),
                    FacultyName = r["facultyname"].ToString(),
                    ClassRoom = r["classroom"].ToString(),
                    SubjectName = r["subjectname"].ToString(),
                    SchoolYear = r["school_year"].ToString(),
                    NumberOfStudents = r["number_of_students"].ToString()
                });
            }
            return lst;
        }

        public List<OwnSummary> GetSummary(int lecturer_id)
        {
            SqlParameter[] prs = { new SqlParameter("@lecturer_id", lecturer_id) };
            return ConvertToList(ExecuteQuery("statistic_own_summary", prs));
        }
    }
}