using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CalendarBookingProject.Models
{
    public class Booking
    {
        [Key]
        public int ID { get; set; }

        [ForeignKey("User")]
        public string UserID { get; set; }

        public DateTime DateFrom { get; set; }

        public DateTime DateTo { get; set; }

        public virtual ApplicationUser User { get; set; }
    }
}