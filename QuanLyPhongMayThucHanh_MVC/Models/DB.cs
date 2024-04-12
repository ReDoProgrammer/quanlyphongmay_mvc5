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


        public string GetJsonData(string procedureName, SqlParameter[] parameters)
        {
            try
            {

                if (this.conn.State == ConnectionState.Closed)
                {
                    this.conn.Open();
                }
                SqlCommand command = new SqlCommand(procedureName, this.conn);
                    command.CommandType = CommandType.StoredProcedure;

                    if (parameters != null)
                    {
                        command.Parameters.AddRange(parameters);
                    }

                    // Thực thi stored procedure
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            // Load dữ liệu từ SqlDataReader vào DataTable
                            DataTable dataTable = new DataTable();
                            dataTable.Load(reader);

                            // Lấy số trang
                            int totalRows = dataTable.Rows.Count;
                            int pageSize = 10;
                            int totalPages = (int)Math.Ceiling((double)totalRows / pageSize);

                            // Tạo object chứa tất cả thông tin
                            var result = new
                            {
                                code = 200,
                                icon = "success",
                                msg = "Load teaching progress successfully",
                                header = "SUCCESSFULLY",
                                json_output = JsonConvert.SerializeObject(dataTable),
                                current_page = parameters[Array.FindIndex(parameters, p => p.ParameterName == "@page")].Value,
                                total_pages = totalPages
                            };

                            // Chuyển object thành JSON
                            return JsonConvert.SerializeObject(result);
                        }
                        else
                        {
                            return null;
                        }
                    }
               
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(new { error = ex.Message });
            }
            finally
            {
                if (this.conn.State == ConnectionState.Open)
                {
                    this.conn.Close();
                }
            }
        }

        public string GetJsonString(string procedureName, SqlParameter[] parameters)
        {
            try
            {
                if (this.conn.State == ConnectionState.Closed)
                {
                    this.conn.Open();
                }
                SqlCommand command = new SqlCommand(procedureName, this.conn);
                command.CommandType = CommandType.StoredProcedure;

                if (parameters != null)
                {
                    command.Parameters.AddRange(parameters);
                }

                // Thực thi stored procedure
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.HasRows)
                    {
                        // Load dữ liệu từ SqlDataReader vào DataTable
                        DataTable dataTable = new DataTable();
                        dataTable.Load(reader);

                        // Lấy số trang
                        int totalRows = dataTable.Rows.Count;
                        int pageSize = 10;
                        int totalPages = (int)Math.Ceiling((double)totalRows / pageSize);

                        // Tạo object chứa cả dữ liệu và số trang
                        var result = new
                        {
                            data = dataTable,
                            total_pages = totalPages
                        };

                        // Chuyển object thành JSON
                        return JsonConvert.SerializeObject(result);
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(new { error = ex.Message });
            }
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
