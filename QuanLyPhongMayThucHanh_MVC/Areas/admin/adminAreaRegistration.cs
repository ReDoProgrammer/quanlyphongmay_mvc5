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
                "Admin_default",
                "Admin/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "Admin_Specific",
                "Admin/",
                new { controller = "Home", action = "Index" }
            );

        }
    }
}