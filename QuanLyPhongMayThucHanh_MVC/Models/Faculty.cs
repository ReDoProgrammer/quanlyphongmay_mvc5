﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace QuanLyPhongMayThucHanh_MVC.Models
{
    public class Faculty:DB
    {
        public int Id { get; set; }
        public string Acronym { get; set; }
        public string Name { get; set; }
        public Faculty() { }
        public Faculty(int Id, string Acronym, string Name)
        {
            this.Id = Id;
            this.Acronym = Acronym;
            this.Name = Name;
        }

        public List<Faculty> ConvertToList(DataTable dt)
        {
            var lst = new List<Faculty>();
            foreach (DataRow r in dt.Rows)
            {
                lst.Add(new Faculty
                {
                    Id = int.Parse(r["id"].ToString()),
                    Acronym = r["acronym"].ToString(),
                    Name = r["name"].ToString()
                });
            }
            return lst;
        }

        public int Insert(string acronym, string name)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@acronym",acronym),
                new SqlParameter("@name",name)
            };
            return Convert.ToInt32(ExecuteScalar("faculty_insert",prs));
        }

        public int Update(int id,string acronym, string name)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@id",id),
                new SqlParameter("@acronym",acronym),
                new SqlParameter("@name",name)
            };
            return ExecuteNonQuery("faculty_update", prs);
        }
        public int Delete(int id)
        {
            SqlParameter[] prs =
            {
                new SqlParameter("@id",id)               
            };
            return ExecuteNonQuery("faculty_delete", prs);
        }

        public List<Faculty> Select()
        {
            return ConvertToList(ExecuteQuery("faculty_select"));
        }

        public Faculty Detail(int id)
        {
            SqlParameter[] prs = { new SqlParameter("@id", id) };
            var r = ExecuteQuery("faculty_detail", prs).Rows[0];
            if (r == null) return null;
            return new Faculty()
            {
                Id = int.Parse(r["id"].ToString()),
                Acronym = r["acronym"].ToString(),
                Name = r["name"].ToString()
            };
        }

    }
}