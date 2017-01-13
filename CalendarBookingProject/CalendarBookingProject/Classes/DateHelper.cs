using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CalendarBookingProject.Classes
{
    public static class DateHelper
    {
        public static bool SameMonth(DateTime first, DateTime second)
        {
            if(first.Year == second.Year && first.Month == second.Month)
            {
                return true;
            }
            return false;
        }

        internal static bool DateThirdValidator(DateTime dateFrom, DateTime dateTo)
        {
            TimeSpan firstPartStart = new TimeSpan(0, 0, 0, 0);
            TimeSpan firstPartEnd = new TimeSpan(0, 8, 0, 0);

            TimeSpan secondPartStart = new TimeSpan(0, 8, 0, 0);
            TimeSpan secondPartEnd = new TimeSpan(0, 16, 0, 0);

            TimeSpan thirdPartStart = new TimeSpan(0, 16, 0, 0);
            TimeSpan thirdPartEnd = new TimeSpan(0, 24, 0, 0);

            if(dateFrom.CompareTo(firstPartStart) == 0 && dateTo.CompareTo(firstPartEnd) == 0)
            {
                return true;
            }

            if (dateFrom.CompareTo(secondPartStart) == 0 && dateTo.CompareTo(secondPartEnd) == 0)
            {
                return true;
            }

            if (dateFrom.CompareTo(thirdPartStart) == 0 && dateTo.CompareTo(thirdPartEnd) == 0)
            {
                return true;
            }

            return false;
        }

        internal static bool DateFromCurrentMonth(DateTime dateFrom, DateTime dateTo, DateTime timeNow)
        {
            if(dateFrom.Year == timeNow.Year && dateFrom.Month == timeNow.Month
                && dateTo.Year == timeNow.Year && dateTo.Month == timeNow.Month)
            {
                return true;
            }

            return false;
        }

        internal static bool EqualDateTime(DateTime dateFrom1, DateTime dateFrom2)
        {
            if(dateFrom1.TimeOfDay.CompareTo(dateFrom2.TimeOfDay) == 0)
            {
                return true;
            }
            return false;
        }
    }
}