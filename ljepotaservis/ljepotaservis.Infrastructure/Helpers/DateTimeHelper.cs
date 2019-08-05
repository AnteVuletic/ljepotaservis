using System;

namespace ljepotaservis.Infrastructure.Helpers
{
    public static class DateTimeHelper
    {
        public static DateTime ParseAndAdjustDateTime(this DateTime dateTime)
        {
            return new DateTime(dateTime.Year, dateTime.Month, dateTime.Day,
                dateTime.Hour + 2, dateTime.Minute, 0, DateTimeKind.Unspecified);
        }

        public static string FormatOpenClose(this DateTime dateTime)
        {
            return dateTime.Minute < 10 ? $"{dateTime.Hour}:0{dateTime.Minute}" : $"{dateTime.Hour}:{dateTime.Minute}";
        }
    }
}
