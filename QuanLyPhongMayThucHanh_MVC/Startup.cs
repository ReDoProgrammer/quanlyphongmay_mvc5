using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(QuanLyPhongMayThucHanh_MVC.Startup))]
namespace QuanLyPhongMayThucHanh_MVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
