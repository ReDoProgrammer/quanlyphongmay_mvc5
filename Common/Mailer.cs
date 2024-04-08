using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
    public class Mailer
    {
        private static string email = ConfigurationManager.AppSettings["Email"];
        private static string epass = ConfigurationManager.AppSettings["EPass"];
        
        public static bool SendMail(string toEmail,string name, string subject, string body)
        {
            try
            {
                MailMessage msg = new MailMessage();
                var smtp = new SmtpClient()
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Credentials = new NetworkCredential(email,epass),
                    Timeout = 20000
                };
                MailAddress mailAddress = new MailAddress(email, name);

                msg.From = mailAddress;
                msg.To.Add(toEmail);
                msg.Subject = subject;
                msg.IsBodyHtml = true;
                msg.Body = body;
                smtp.Send(msg);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
