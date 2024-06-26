﻿using Newtonsoft.Json;
using QuanLyPhongMayThucHanh_MVC.DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace QuanLyPhongMayThucHanh_MVC.Models
{
    public class ClassRoom : DB
    {
        public int Id { get; set; }
        public string Acronym { get; set; }
        public string Name { get; set; }
        public string Fullname { get; set; }
        public string AcademicYear { get; set; }
        public int FacultyId { get; set; }
        public string FacultyAcronym { get; set; }
        public string FacultyName { get; set; }

        private List<ClassRoom> ConvertToList(DataTable dt)
        {
            var lst = new List<ClassRoom>();
            if (dt == null) return null;
            foreach (DataRow r in dt.Rows)
            {
                lst.Add(new ClassRoom
                {
                    Id = int.Parse(r["id"].ToString()),
                    Acronym = r["acronym"].ToString(),
                    Name = r["name"].ToString(),
                    Fullname = r["fullname"].ToString(),
                    FacultyId = int.Parse(r["faculty_id"].ToString()),
                    FacultyAcronym = r["faculty_acronym"].ToString(),
                    FacultyName = r["faculty_name"].ToString(),
                    AcademicYear = r["academic_year"].ToString()
                });
            }
            return lst;
        }

        public List<ClassRoom> Select(int faculty_id, string keyword)
        {
            SqlParameter[] prs = {
                new SqlParameter("@faculty_id",faculty_id),
                new SqlParameter("@keyword",keyword)
            };
            return ConvertToList(ExecuteQuery("[classroom_search]", prs));
        }
        public List<ClassRoom> SelectByFaculty(int faculty_id)
        {
            SqlParameter[] prs = { new SqlParameter("@faculty_id", faculty_id) };
            return ConvertToList(ExecuteQuery("[classroom_select_by_faculty]", prs));
        }


        public string Create(string name, string academic_year, int faculty_id)
        {
            try
            {
                SqlParameter[] prs =
                   {
                        new SqlParameter("@name",name),
                        new SqlParameter("@academic_year",academic_year),
                        new SqlParameter("@faculty_id",faculty_id)
                    };
                return (string)ExecuteScalar("[classroom_insert]", prs);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string Update(int id, string name, string academic_year, int faculty_id)
        {
            try
            {
                SqlParameter[] prs =
                   {
                new SqlParameter("@id",id),
                new SqlParameter("@name",name),
                new SqlParameter("@academic_year",academic_year),
                new SqlParameter("@faculty_id",faculty_id)
            };
                return (string)ExecuteScalar("[classrooms_update]", prs);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string Delete(int id)
        {
            try
            {
                SqlParameter[] prs = { new SqlParameter("@id", id) };
                return (string)ExecuteScalar("[classroom_delete]", prs);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ClassRoom Detail(int id)
        {
            SqlParameter[] prs = { new SqlParameter("@id", id) };
            var r = ExecuteQuery("classroom_detail", prs).Rows[0];
            if (r == null) return null;
            var cr = new ClassRoom();
            cr.Id = int.Parse(r["id"].ToString());
            cr.Acronym = r["acronym"].ToString();
            cr.Name = r["name"].ToString();
            cr.Fullname = r["fullname"].ToString();
            cr.FacultyId = int.Parse(r["faculty_id"].ToString());
            cr.FacultyAcronym = r["faculty_acronym"].ToString();
            cr.FacultyName = r["faculty_name"].ToString();
            cr.AcademicYear = r["academic_year"].ToString();
            return cr;

        }
    }
}