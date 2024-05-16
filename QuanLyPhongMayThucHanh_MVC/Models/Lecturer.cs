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
    public class Lecturer : DB
    {
        public int id { get; set; }
        public string username { get; set; }
        public string fullname { get; set; }
        public string avatar { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string position { get; set; }
        public int position_id { get; set; }
        public string faculty { get; set; }
        public int faculty_id { get; set; }
        public string status { get; set; }
        public int is_actived { get; set; }

        //addional info
        public string created_at { get; set; }
        public bool gender { get; set; }
        public string address { get; set; }
        public string birthdate { get; set; }
        public bool marital_status { get; set; }
        public string about { get; set; }
        public string facebook { get; set; }

        public Lecturer() { }

        public List<Lecturer> ConvertToList(DataTable dt)
        {
            var lst = new List<Lecturer>();
            if (dt == null) return null;
            foreach (DataRow r in dt.Rows)
            {
                lst.Add(new Lecturer
                {
                    id = int.Parse(r["id"].ToString()),
                    faculty = r["faculty"].ToString(),
                    position = r["position"].ToString(),
                    username = r["username"].ToString(),
                    fullname = r["fullname"].ToString(),
                    phone = r["phone"].ToString(),
                    email = r["email"].ToString(),
                    status = r["status"].ToString(),
                    is_actived = int.Parse(r["is_actived"].ToString())

                });
            }
            return lst;
        }

        public bool CheckUsername(string username, int id = 0)
        {
            SqlParameter[] prs = {
                new SqlParameter("@username", username),
                new SqlParameter("@id", id)
            };
            return Convert.ToInt32(ExecuteScalar("lecturer_checkusername", prs)) > 0;
        }
        public bool CheckEmail(string email, int id = 0)
        {
            SqlParameter[] prs = {
                new SqlParameter("@email", email),
                new SqlParameter("@id", id)
            };
            return Convert.ToInt32(ExecuteScalar("lecturer_checkemail", prs)) > 0;
        }

        public bool CheckPhone(string phone, int id = 0)
        {
            SqlParameter[] prs = {
                new SqlParameter("@phone", phone),
                new SqlParameter("@id", id)

            };
            return Convert.ToInt32(ExecuteScalar("lecturer_checkphone", prs)) > 0;
        }
        public List<Lecturer> ListActived()
        {
            return ConvertToList(ExecuteQuery("lecturer_select_actived"));
        }

        public List<Lecturer> Search(int faculty_id, string keyword)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@faculty_id",faculty_id),
                new SqlParameter("@keyword",keyword)
            };
            return ConvertToList(ExecuteQuery("[lecturer_search]", prs));
        }
        public Lecturer Detail(int id)
        {
            SqlParameter[] prs = { new SqlParameter("@id", id) };
            var r = ExecuteQuery("lecturer_detail", prs).Rows[0];
            if (r == null) return null;
            return new Lecturer
            {
                id = int.Parse(r["id"].ToString()),
                faculty = r["faculty"].ToString(),
                faculty_id = int.Parse(r["faculty_id"].ToString()),
                position = r["position"].ToString(),
                position_id = int.Parse(r["position_id"].ToString()),
                username = r["username"].ToString(),
                fullname = r["fullname"].ToString(),
                phone = r["phone"].ToString(),
                email = r["email"].ToString(),
                status = r["status"].ToString(),
                is_actived = int.Parse(r["is_actived"].ToString())
            };
        }

        public string SignUp(string username, string fullname, string password, string email, string phone, int faculty_id, int position_id)
        {
            try
            {
                SqlParameter[] prs =
                   {
                new SqlParameter("@username",username),
                new SqlParameter("@password",password),
                new SqlParameter("@fullname",fullname),
                new SqlParameter("@phone",phone),
                new SqlParameter("@email",email),
                new SqlParameter("@position_id",position_id),
                new SqlParameter("@faculty_id",faculty_id)
            };
                return (string)ExecuteScalar("[lecturer_register]", prs);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public string Create(string username, string password, string fullname, string phone, string email, int position_id, int faculty_id)
        {
            try
            {
                SqlParameter[] prs =
                   {
                new SqlParameter("@username",username),
                new SqlParameter("@password",password),
                new SqlParameter("@fullname",fullname),
                new SqlParameter("@phone",phone),
                new SqlParameter("@email",email),
                new SqlParameter("@position_id",position_id),
                new SqlParameter("@faculty_id",faculty_id)
            };
                return (string)ExecuteScalar("lecturer_insert", prs);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public string Delete(int id)
        {
            try
            {
                SqlParameter[] prs = { new SqlParameter("@id", id) };
                return (string)ExecuteScalar("lecturer_delete", prs);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public string Update(int id, string fullname, string phone, string email, int position_id, int faculty_id)
        {
            try
            {
                SqlParameter[] prs =
                   {
                        new SqlParameter("@id",id),
                        new SqlParameter("@fullname",fullname),
                        new SqlParameter("@phone",phone),
                        new SqlParameter("@email",email),
                        new SqlParameter("@position_id",position_id),
                        new SqlParameter("@faculty_id",faculty_id)
                    };
                return (string)ExecuteScalar("lecturer_update", prs);
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public string Active(int id)
        {
            try
            {
                SqlParameter[] prs ={new SqlParameter("@id",id)};
                return (string)ExecuteScalar("[lecturer_active]", prs);
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public Lecturer(int id, string username, string fullname, string avatar, string phone, string email, string position, string faculty)
        {
            this.id = id;
            this.username = username;
            this.fullname = fullname;
            this.avatar = avatar;
            this.phone = phone;
            this.email = email;
            this.position = position;
            this.faculty = faculty;
        }
        public int Login(string username, string password)
        {
            SqlParameter[] pars = {
                new SqlParameter("@username", username),
                new SqlParameter("@password", password)
            };
            return (int)ExecuteScalar("lecturer_login", pars);
        }
        public int AdminLogin(string username, string password)
        {
            SqlParameter[] pars = {
                new SqlParameter("@username", username),
                new SqlParameter("@password", password)
            };
            return (int)ExecuteScalar("admin_login", pars);
        }
        public Lecturer Profile(string username)
        {
            try
            {
                SqlParameter[] param =
                   {
                new SqlParameter("@username",username)
            };
                var rs = ExecuteQuery("lecturer_profile", param);
                if (rs == null) return null;
                var gv = rs.Rows[0];

                var lec = new Lecturer();
                lec.id = int.Parse(gv["id"].ToString());
                lec.username = gv["username"].ToString();
                lec.fullname = gv["fullname"].ToString();
                lec.avatar = gv["avatar"].ToString();
                lec.phone = gv["phone"].ToString();
                lec.email = gv["email"].ToString();
                lec.position_id = int.Parse(gv["position_id"].ToString());
                lec.position = gv["position"].ToString();
                lec.faculty_id = int.Parse(gv["faculty_id"].ToString());
                lec.faculty = gv["faculty"].ToString();
                lec.facebook = gv["facebook"].ToString();
                lec.about = gv["about"].ToString();
                lec.created_at = gv["created_at"].ToString();
                lec.gender = bool.Parse(gv["gender"].ToString());
                lec.marital_status = bool.Parse(gv["marital_status"].ToString());
                lec.address = gv["address"].ToString();

                return lec;
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public Lecturer Admin()
        {

            var gv = ExecuteQuery("[lecturer_admin]").Rows[0];

            var lec = new Lecturer(
                int.Parse(gv["id"].ToString()),
               username,
               gv["fullname"].ToString(),
               gv["avatar"].ToString(),
               gv["phone"].ToString(),
               gv["email"].ToString(),
               gv["position"].ToString(),
               gv["faculty"].ToString()
                );
            return lec;
        }



    }
}