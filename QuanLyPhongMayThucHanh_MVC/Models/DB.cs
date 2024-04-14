using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace QuanLyPhongMayThucHanh_MVC.Models
{
   
    public class DB
    {
        private readonly string connectionString;
        private string serverName;
        private string databaseName;
        private string userName;
        private string password;

        // khai báo các biến phục vụ truy vấn dữ liệu
        private SqlConnection conn;
        private SqlCommand cmd;
        private DataTable dt;
        private SqlDataAdapter adapter;
        protected DB()//hàm dựng/hàm khởi tạo/constructor <=> chạy đầu tiên khi class được gọi
        {
            this.serverName = @".\SQLExpress";
            this.databaseName = "labs_db";
            this.userName = "sa";
            this.password = "17052016";
            this.connectionString = $"Server={serverName};Database={databaseName};User Id={userName};Password={password};";

            this.conn = new SqlConnection(this.connectionString);
        }
       

        /*
         
             Trường hợp thêm mới dữ liệu sẽ trả về id ( khóa chính của dòng dữ liệu được thêm
             -- Vì dữ liệu có thể là số nguyên hoặc chuỗi
             -- Do đó hàm này có kiểu trả về là kiểu object
             -- Tùy theo trường hợp cụ thể ( theo table) mà chúng ta sẽ có phương án ép kiểu sang số nguyên or chuỗi (string)
             */
        protected object ExecuteScalar(string storedProcedureName, SqlParameter[] parameters)
        {
            try
            {
                if (this.conn.State == ConnectionState.Closed)
                {
                    this.conn.Open();
                }

                this.cmd = new SqlCommand(storedProcedureName, this.conn);
                this.cmd.CommandType = CommandType.StoredProcedure;

                if (parameters != null && parameters.Length > 0)
                {
                    this.cmd.Parameters.AddRange(parameters);
                }

                object result = this.cmd.ExecuteScalar(); // Thực thi stored procedure và lấy kết quả trả về

                return result;
            }
            catch (SqlException ex)
            {
                // Xử lý lỗi SQL               
                return null; // Hoặc giá trị mặc định khác để chỉ ra rằng đã xảy ra lỗi
            }
            catch (Exception ex)
            {
                // Xử lý lỗi khác              
                return null; // Hoặc giá trị mặc định khác để chỉ ra rằng đã xảy ra lỗi
            }
            finally
            {
                if (this.conn.State == ConnectionState.Open)
                {
                    this.conn.Close();
                }
            }
        }


        protected DataTable ExecuteQuery(string storedProcedureName, SqlParameter[] parameters = null)
        {

            try
            {
                if (this.conn.State == ConnectionState.Closed)// nếu kết nối đang đóng
                {
                    this.conn.Open();// mở kết nối csdl
                }

                this.cmd = new SqlCommand(storedProcedureName, this.conn);
                this.cmd.CommandType = CommandType.StoredProcedure;
                if (parameters != null)
                {
                    this.cmd.Parameters.AddRange(parameters);
                }


                this.dt = new DataTable();
                this.adapter = new SqlDataAdapter(this.cmd);

                this.adapter.Fill(this.dt);
                return this.dt;
            }
            catch (Exception ex)
            {
                return null;
            }
            finally
            {
                this.conn.Close();
            }

        }



        // hàm thực thi truy vấn dùng cho cả 2 trường hợp update và delete
        protected int ExecuteNonQuery(string storedProcedureName, SqlParameter[] parameters = null)
        {
            try
            {
                if (this.conn.State == ConnectionState.Closed)// nếu kết nối đang đóng
                {
                    this.conn.Open();// mở kết nối csdl
                }

                // cấp phát bộ nhớ cho cmd
                this.cmd = new SqlCommand(storedProcedureName, this.conn);

                // chỉ rõ kiểu thực thi là dạng sử dụng stored procedure
                this.cmd.CommandType = CommandType.StoredProcedure;

                // truyền tham số cho cmd
                if (parameters != null)
                {
                    this.cmd.Parameters.AddRange(parameters);
                }

                return cmd.ExecuteNonQuery();// trả về số dòng bị tác động: chỉnh sửa or xóa
            }
            catch (Exception ex)//nếu gặp lỗi
            {
                return -1;//trả về kết quả -1

            }
            finally// cuối cùng cho dù thực thi thành công hay gặp lỗi cũng đóng kết nối csdl lại
            {
                this.conn.Close();
            }

        }
    }
}
