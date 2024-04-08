using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace QuanLyPhongMayThucHanh_MVC.Models
{
    public class PracticeSchedule:DB
    {
        public int Id { get; set; }
        public string Room { get; set; }
        public string Subject { get; set; }
        public string Lecturer { get; set; }
        public string ClassPeriod { get; set; }
        public string Note { get; set; }
        public string Status { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }

        private List<PracticeSchedule> ConvertToList(DataTable dt)
        {
            var lst = new List<PracticeSchedule>();
            foreach (DataRow r in dt.Rows)
            {

            }
            return lst;
        }

        public int Book(DateTime book_date,int room_id, int subject_id,int lecturer_id,int class_period_id,string note , int created_by)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@book_date",book_date.ToString("yyyy-MM-dd")),
                new SqlParameter("@room_id",room_id),
                new SqlParameter("@subject_id",subject_id),
                new SqlParameter("@lecturer_id",lecturer_id),
                new SqlParameter("@class_period_id",class_period_id),
                new SqlParameter("@note",note),
                new SqlParameter("@created_by",created_by)
            };
            return (int)ExecuteScalar("ps_book", prs);
        }
    }
}