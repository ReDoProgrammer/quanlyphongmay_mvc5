using QuanLyPhongMayThucHanh_MVC.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace QuanLyPhongMayThucHanh_MVC.Areas.admin.Models
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
        public string falculty { get; set; }
        public Lecturer()
        {

        }
        public Lecturer(int id, string username, string fullname, string avatar, string phone, string email, string position, string falculty)
        {
            this.id = id;
            this.username = username;
            this.fullname = fullname;
            this.avatar = avatar;
            this.phone = phone;
            this.email = email;
            this.position = position;
            this.falculty = falculty;
        }
        public int Login(string username, string password)
        {
            SqlParameter[] pars = {
                new SqlParameter("@username", username),
                new SqlParameter("@password", password)
            };
            return (int)ExecuteScalar("admin_login", pars);
        }

        public Lecturer Profile(string username)
        {
            SqlParameter[] param =
            {
                new SqlParameter("@username",username)
            };
            var rs = ExecuteQuery("lecturer_profile", param);
            if (rs == null) return null;
            var gv = rs.Rows[0];

            var lec = new Lecturer(
                int.Parse(gv["id"].ToString()),
               username,
               gv["fullname"].ToString(),
               gv["avatar"].ToString(),
               gv["phone"].ToString(),
               gv["email"].ToString(),
               gv["position"].ToString(),
               gv["falculty"].ToString()
                );
            return lec;
        }


    }
}
