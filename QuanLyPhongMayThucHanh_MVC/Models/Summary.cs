using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace QuanLyPhongMayThucHanh_MVC.Models
{
    public class Summary:DB
    {
        public string number_of_rooms { get; set; }
        public string total_pc { get; set; }
        public string total_broken_pc { get; set; }
        public string total_active_pc { get; set; }
        public string number_of_classrooms { get; set; }
        public string number_of_classes { get; set; }
        public string total_students { get; set; }
        public string number_of_lecturers { get; set; }
        public string number_of_subjects { get; set; }
        public string number_of_faculties { get; set; }
        public Summary GetSummary()
        {
            var dt = ExecuteQuery("statistic_summary");
            if (dt == null) return null;
            var r = dt.Rows[0];
            return new Summary {
                number_of_rooms = r["number_of_rooms"].ToString(),
                total_pc = r["total_pc"].ToString(),
                total_broken_pc = r["total_broken_pc"].ToString(),
                total_active_pc = r["total_active_pc"].ToString(),
                number_of_classes = r["number_of_classes"].ToString(),
                number_of_classrooms = r["number_of_classrooms"].ToString(),
                total_students = r["total_students"].ToString(),
                number_of_lecturers = r["number_of_lecturers"].ToString(),
                number_of_subjects = r["number_of_subjects"].ToString(),
                number_of_faculties = r["number_of_faculties"].ToString()
            };
        }
    }
    
}