using System.Web;
using System.Web.Optimization;

namespace CalendarBookingProject
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                       "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/angular/library").Include(
                        "~/Scripts/bower_components/moment/min/moment.min.js",
                        "~/Scripts/bower_components/angular/angular.js",
                        "~/Scripts/bower_components/angular-route/angular-route.js",
                        "~/Scripts/bower_components/angular-resource/angular-resource.js",
                        "~/Scripts/bower_components/angular-animate/angular-animate.js",
                        "~/Scripts/bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
                        "~/Scripts/bower_components/angular-ui-calendar/src/calendar.js",
                        "~/Scripts/bower_components/fullcalendar/dist/fullcalendar.min.js",
                        "~/Scripts/bower_components/fullcalendar/dist/gcal.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/angular/app").Include(
                        "~/App/App.js",

                        "~/App/DataServices/services.data.module.js",
                        "~/App/DataServices/*.data.js",

                        "~/App/Core/core.module.js",
                        "~/App/Core/config.js",

                        "~/App/Main/main.module.js",
                        "~/App/Main/*.controller.js",
                        "~/App/Main/*.service.js",

                        "~/Scripts/bower_components/angular-resource/angular-resource.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Scripts/bower_components/fullcalendar/dist/fullcalendar.css"));

            bundles.Add(new StyleBundle("~/Content/login").Include(
                      "~/Content/login.css"));
        }
    }
}
