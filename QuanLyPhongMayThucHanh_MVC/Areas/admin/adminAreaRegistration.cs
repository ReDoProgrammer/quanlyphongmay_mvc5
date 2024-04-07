using System.Web.Mvc;

namespace QuanLyPhongMayThucHanh_MVC.Areas.admin
{
    public class adminAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "admin";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "admin_default",
                "admin/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional },
                new[] { "QuanLyPhongMayThucHanh_MVC.Areas.Admin.Controllers" }
            );
        }
    }
}