﻿using System;
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
        public string LecturerEmail { get; set; }
        public string ClassPeriod { get; set; }
        public string Note { get; set; }
        public string Status { get; set; }
        public int StatusId { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }

        public PracticeSchedule() { }
        private List<PracticeSchedule> ConvertToList(DataTable dt)
        {
            try
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
                        ClassPeriod = r["period"].ToString(),
                        StartDate = r["start_date"].ToString(),
                        EndDate = r["end_date"].ToString(),
                        Note = r["note"].ToString(),
                        StatusId = int.Parse(r["status_id"].ToString()),
                        Status = r["status"].ToString()
                    });
                }
                return lst;
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public int Book(DateTime book_date, int room_id, int teaching_process_id, int class_period_id_1, int class_period_id_2, string note, int created_by)
        {
            try
            {
                SqlParameter[] prs =
                   {
                        new SqlParameter("@book_date",book_date.ToString("yyyy-MM-dd")),
                        new SqlParameter("@room_id",room_id),
                        new SqlParameter("@teaching_process_id",teaching_process_id),
                        new SqlParameter("@class_period_id_1",class_period_id_1),
                        new SqlParameter("@class_period_id_2",class_period_id_2),
                        new SqlParameter("@note",note),
                        new SqlParameter("@created_by",created_by)
                    };
                return Convert.ToInt32(ExecuteScalar("ps_book", prs));
            }
            catch (Exception ex)
            {
                return -1;
            }
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

        public List<PracticeSchedule> OwnCalendar(DateTime from_date, DateTime to_date, int lecturer_id)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@from_date",from_date.ToString("yyyy-MM-dd HH:mm")),
                new SqlParameter("@to_date",to_date.ToString("yyyy-MM-dd HH:mm")),
                new SqlParameter("@lecturer_id",lecturer_id)
            };
            return ConvertToList(ExecuteQuery("[ps_own_calendar]", prs));
        }
        public List<PracticeSchedule> LatestCalendars()
        {          
            return ConvertToList(ExecuteQuery("[ps_latest]"));
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
                Lecturer = r["lecturer"].ToString(),
                LecturerEmail = r["lecturer_email"].ToString(),
                ClassPeriod = r["period"].ToString(),
                StartDate = r["start_date"].ToString(),
                EndDate = r["end_date"].ToString(),
                Note = r["note"].ToString(),
                StatusId = int.Parse(r["status_id"].ToString()),
                Status = r["status"].ToString()
            };
        }

        public int Delete(int id)
        {
            SqlParameter[] prs = { new SqlParameter("@id", id) };
            return Convert.ToInt32(ExecuteNonQuery("ps_delete", prs));
        }

        public bool ActiveCalendar(int id)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@id",id)
            };
            return Convert.ToInt32(ExecuteScalar("ps_submit", prs)) > 0;
        }
    }
}