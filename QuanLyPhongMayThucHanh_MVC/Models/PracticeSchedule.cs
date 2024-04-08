using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace QuanLyPhongMayThucHanh_MVC.Models
{
    public class PracticeSchedule : DB
    {
        public long Id { get; set; }
        public string Room { get; set; }
        public string Subject { get; set; }
        public string Lecturer { get; set; }
        public string ClassPeriod { get; set; }
        public string Note { get; set; }
        public string Status { get; set; }
        public int StatusId { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }

        public PracticeSchedule() { }
        private List<PracticeSchedule> ConvertToList(DataTable dt)
        {
            var lst = new List<PracticeSchedule>();
            foreach (DataRow r in dt.Rows)
            {
                lst.Add(new PracticeSchedule()
                {
                    Id = long.Parse(r["id"].ToString()),
                    Room = r["room"].ToString(),
                    Subject = r["subject"].ToString(),
                    Lecturer = r["lecturer"].ToString(),
                    ClassPeriod = r["class_period"].ToString(),
                    StartDate = r["start_date"].ToString(),
                    EndDate = r["end_date"].ToString(),
                    Note = r["note"].ToString(),
                    StatusId = int.Parse(r["status_id"].ToString()),
                    Status = r["status"].ToString()
                });
            }
            return lst;
        }

        public int Book(DateTime book_date, int room_id, int subject_id, int lecturer_id, int class_period_id, string note, int created_by)
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
            return Convert.ToInt32(ExecuteScalar("ps_book", prs));
        }

        public List<PracticeSchedule> Calendar(DateTime from_date, DateTime to_date)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@from_date",from_date.ToString("yyyy-MM-dd HH:mm")),
                new SqlParameter("@to_date",to_date.ToString("yyyy-MM-dd HH:mm"))
            };
            return ConvertToList(ExecuteQuery("ps_calendar", prs));
        }

        public List<PracticeSchedule> OwnCalendar(DateTime from_date, DateTime to_date,int lecturer_id)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@from_date",from_date.ToString("yyyy-MM-dd HH:mm")),
                new SqlParameter("@to_date",to_date.ToString("yyyy-MM-dd HH:mm")),
                new SqlParameter("@lecturer_id",lecturer_id)
            };
            return ConvertToList(ExecuteQuery("[ps_own_calendar]", prs));
        }

        public PracticeSchedule Detail(int id)
        {
            SqlParameter[] prs = { new SqlParameter("@id", id) };
            DataRow r = ExecuteQuery("ps_detail", prs).Rows[0];
            return new PracticeSchedule()
            {
                Id = long.Parse(r["id"].ToString()),
                Room = r["room"].ToString(),
                Subject = r["subject"].ToString(),
                Lecturer = r["subject"].ToString(),
                ClassPeriod = r["class_period"].ToString(),
                StartDate = r["start_date"].ToString(),
                EndDate = r["end_date"].ToString(),
                Note = r["note"].ToString(),
                StatusId = int.Parse(r["status_id"].ToString()),
                Status = r["status"].ToString()
            };
        }
    }
}