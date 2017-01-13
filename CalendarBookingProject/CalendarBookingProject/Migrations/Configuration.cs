namespace CalendarBookingProject.Migrations
{
    using Microsoft.AspNet.Identity;
    using Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<CalendarBookingProject.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(CalendarBookingProject.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            var passwordHash = new PasswordHasher();

            var user1 = new ApplicationUser()
            {
                UserName = "user1",
                Email = "user1",
                PasswordHash = passwordHash.HashPassword("password"),
                SecurityStamp = "security"
            };
            var user2 = new ApplicationUser()
            {
                UserName = "user2",
                Email = "user2",
                PasswordHash = passwordHash.HashPassword("password"),
                SecurityStamp = "security"
            };
            var user3 = new ApplicationUser()
            {
                UserName = "user3",
                Email = "user3",
                PasswordHash = passwordHash.HashPassword("password"),
                SecurityStamp = "security"
            };

            var users = new List<ApplicationUser>()
            {
                user1,user2, user3
            };

            context.Users.AddOrUpdate(users.ToArray());



            var bookings = new List<Booking>()
            {
                new Booking()
                {
                    User = user1,
                    DateFrom = DateTime.UtcNow,
                    DateTo = DateTime.UtcNow,
                },
                new Booking()
                {
                    User = user2,
                    DateFrom = DateTime.UtcNow,
                    DateTo = DateTime.UtcNow,
                },
                new Booking()
                {
                    User = user3,
                    DateFrom = DateTime.UtcNow,
                    DateTo = DateTime.UtcNow,
                }
            };

            context.Bookings.AddOrUpdate(bookings.ToArray());


        }
    }
}
