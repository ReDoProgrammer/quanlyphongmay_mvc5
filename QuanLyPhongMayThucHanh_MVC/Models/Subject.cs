using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace QuanLyPhongMayThucHanh_MVC.Models
{
    public class Subject:DB
    {
        public int Id { get; set; }
        public string Acronym { get; set; }
        public string Name { get; set; }

        public Subject() {  }
        public Subject(int Id, string Acronym, string Name)
        {
            this.Id = Id;
            this.Acronym = Acronym;
            this.Name = Name;
        }

        public List<Subject> OwnCurrentSubjects(int lecturer_id, bool is_finished)
        {
            try
            {
                SqlParameter[] prs =
                   {
                new SqlParameter("@lecturer_id",lecturer_id),
                new SqlParameter("@is_finished",is_finished ==true?1:0)
            };
                return ConvertToList(ExecuteQuery("tp_own_current_subjects", prs));
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        public List<Subject> Select()
        {

            return ConvertToList(ExecuteQuery("[subject_select]"));
        }

        public Subject Detail(int id)
        {
            SqlParameter[] prs = { new SqlParameter("@id", id) };
            var r = ExecuteQuery("subject_detail", prs).Rows[0];
            if (r == null) return null;
            return new Subject
            {
                Id = int.Parse(r["id"].ToString()),
                Acronym = r["acronym"].ToString(),
                Name = r["name"].ToString()
            };
        }

        public string Insert(string name)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@name",name)
            };
            return (string)ExecuteScalar("subject_insert", prs);
        }

        public string Update(int id, string name)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@id",id),
                new SqlParameter("@name",name)
            };
            return (string)ExecuteScalar("subject_update", prs);
        }
        public string Delete(int id)
        {
            SqlParameter[] prs = { new SqlParameter("@id", id) };
            return (string)ExecuteScalar("subject_delete", prs);
        }

        private List<Subject> ConvertToList(DataTable dt)
        {
            if (dt == null) return null;
            var lst = new List<Subject>();
            foreach (DataRow r in dt.Rows)
            {
                lst.Add(new Subject
                {
                    Id = int.Parse(r["id"].ToString()),
                    Acronym = r["acronym"].ToString(),
                    Name = r["name"].ToString()
                });
            }
            return lst;
        }

    }
}