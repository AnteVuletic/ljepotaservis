namespace ljepotaservis.Infrastructure.Helpers
{
    public static class RoleHelper
    {
        public const string SuperAdmin = "SuperAdmin";
        public const string Owner = "Owner";
        public const string User = "User";
        public const string Employee = "Employee";
        public const string OwnerUserEmployee = Owner + ", " + User + ", " + Employee;
        public const string OwnerEmployee = Owner + ", " + Employee;

    }
}
