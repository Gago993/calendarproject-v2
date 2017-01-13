using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CalendarBookingProject.Startup))]
namespace CalendarBookingProject
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
