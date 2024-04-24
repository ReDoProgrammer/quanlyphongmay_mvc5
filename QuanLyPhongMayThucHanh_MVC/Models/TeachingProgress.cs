using Newtonsoft.Json;
using QuanLyPhongMayThucHanh_MVC.DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace QuanLyPhongMayThucHanh_MVC.Models
{
    public class TeachingProgress:DB
    {
        public int Id { get; set; }
        public int LecturerId { get; set; }
        public string LecturerFullname { get; set; }
        public string LecturerUsername { get; set; }
        public int SubjectId { get; set; }
        public string SubjectAcronym { get; set; }
        public string SubjectName { get; set; }
        public string SchoolYear { get; set; }
        public int SemesterId { get; set; }
        public string SemesterName { get; set; }
        public int NumberOfStudents { get; set; }
        public int ClassRoomId { get; set; }
        public string ClassRoom { get; set; }
        public string ClassroomAcronym { get; set; }
        public int FacultyId { get; set; }
        public string FacultyAcronym { get; set; }
        public string FacultyName { get; set; }
        public bool Status { get; set; }
        public string StatusName { get; set; }

        private List<TeachingProgress> ConvertToList(DataTable dt)
        {
            var lst = new List<TeachingProgress>();
            foreach (DataRow r in dt.Rows)
            {
                lst.Add(new TeachingProgress
                {
                    Id = int.Parse(r["id"].ToString()),
                    LecturerFullname = r["lecturer_fullname"].ToString(),
                    LecturerUsername = r["lecturer_username"].ToString(),
                    SubjectAcronym = r["subject_acronym"].ToString(),
                    SubjectName = r["subject_name"].ToString(),
                    SchoolYear = r["school_year"].ToString(),
                    NumberOfStudents = int.Parse(r["number_of_students"].ToString()),
                    ClassRoom = r["classroom"].ToString(),
                    ClassroomAcronym = r["classroom_acronym"].ToString(),
                    FacultyAcronym = r["faculty_acronym"].ToString(),
                    FacultyName = r["faculty_name"].ToString(),
                    Status = Convert.ToBoolean(r["status_id"].ToString()),
                    StatusName = r["status"].ToString()
                });
            }
            return lst;
        }

        

        public List<TeachingProgress> Filter(int lecturer_id, int subject_id, int semester_id, string school_year, int classroom_id, string keyword, int page)
        {
           
            try
            {
                SqlParameter[] prs =
                   {
                new SqlParameter("@lecturer_id",lecturer_id),
                new SqlParameter("@subject_id",subject_id),
                new SqlParameter("@semester_id",semester_id),
                new SqlParameter("@school_year",school_year),
                new SqlParameter("@classroom_id",classroom_id),
                new SqlParameter("@keyword",keyword),
                new SqlParameter("@page",page)
            };
                return ConvertToList(ExecuteQuery("tp_filter",prs));
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public int TotalPages(int lecturer_id, int subject_id, int semester_id, string school_year, int classroom_id, string keyword, int page)
        {

            try
            {
                SqlParameter[] prs =
                   {
                new SqlParameter("@lecturer_id",lecturer_id),
                new SqlParameter("@subject_id",subject_id),
                new SqlParameter("@semester_id",semester_id),
                new SqlParameter("@school_year",school_year),
                new SqlParameter("@classroom_id",classroom_id),
                new SqlParameter("@keyword",keyword),
                new SqlParameter("@page",page)
            };
                return Convert.ToInt32(ExecuteScalar("tp_filter_pages", prs));
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public ResponseObject Create(int lecturer_id, int subject_id, int semester_id, string school_year,int number_of_students,int classroom_id)
        {
            try
            {
                SqlParameter[] prs =
                   {
                new SqlParameter("@lecturer_id",lecturer_id),
                new SqlParameter("@subject_id",subject_id),
                new SqlParameter("@semester_id",semester_id),
                new SqlParameter("@school_year",school_year),
                new SqlParameter("@number_of_students",number_of_students),
                new SqlParameter("@classroom_id",classroom_id)
            };
                var rs = (string)ExecuteScalar("[tp_insert]", prs);
                return JsonConvert.DeserializeObject<ResponseObject>(rs);
            }
            catch (Exception ex)
            {
                return new ResponseObject
                {
                    code = 500,
                    icon = "error",
                    header = "CREATE NEW TEACHING PROGRESS FAILED",
                    msg = ex.Message
                };
            }
        }

        public ResponseObject Update(int id,int lecturer_id, int subject_id, int semester_id, string school_year, int number_of_students, int classroom_id)
        {
            try
            {
                SqlParameter[] prs =
                   {
                        new SqlParameter("@id",id),
                        new SqlParameter("@lecturer_id",lecturer_id),
                        new SqlParameter("@subject_id",subject_id),
                        new SqlParameter("@semester_id",semester_id),
                        new SqlParameter("@school_year",school_year),
                        new SqlParameter("@number_of_students",number_of_students),
                        new SqlParameter("@classroom_id",classroom_id)
                    };
                var rs = (string)ExecuteScalar("[tp_update]", prs);
                return JsonConvert.DeserializeObject<ResponseObject>(rs);
            }
            catch (Exception ex)
            {
                return new ResponseObject
                {
                    code = 500,
                    icon = "error",
                    header = "UPDATE TEACHING PROGRESS FAILED",
                    msg = ex.Message
                };
            }
        }

        public ResponseObject Delete(int id)
        {
            try
            {
                SqlParameter[] prs ={new SqlParameter("@id",id)};
                var rs = (string)ExecuteScalar("[tp_delete]", prs);
                return JsonConvert.DeserializeObject<ResponseObject>(rs);
            }
            catch (Exception ex)
            {
                return new ResponseObject
                {
                    code = 500,
                    icon = "error",
                    header = "DELETE TEACHING PROGRESS FAILED",
                    msg = ex.Message
                };
            }
        }

        public TeachingProgress Detail(int id)
        {
            SqlParameter[] prs = { new SqlParameter("@id", id) };
            var r = ExecuteQuery("tp_detail",prs).Rows[0];
            if (r == null) return null;
            return new TeachingProgress
            {
                Id = int.Parse(r["id"].ToString()),
                LecturerId = int.Parse(r["lecturer_id"].ToString()),
                LecturerFullname = r["lecturer_fullname"].ToString(),
                LecturerUsername = r["lecturer_username"].ToString(),
                SubjectId = int.Parse(r["subject_id"].ToString()),
                SubjectAcronym = r["subject_acronym"].ToString(),
                SubjectName = r["subject_name"].ToString(),
                SchoolYear = r["school_year"].ToString(),
                SemesterId = int.Parse(r["semester_id"].ToString()),
                SemesterName = r["semester_name"].ToString(),
                NumberOfStudents = int.Parse(r["number_of_students"].ToString()),
                ClassRoomId = int.Parse(r["classroom_id"].ToString()),
                ClassRoom = r["classroom"].ToString(),
                ClassroomAcronym = r["classroom_acronym"].ToString(),
                FacultyId = int.Parse(r["faculty_id"].ToString()),
                FacultyAcronym = r["faculty_acronym"].ToString(),
                FacultyName = r["faculty_name"].ToString()
            };

        }
    }
}