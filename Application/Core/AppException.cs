using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace Application.Core
{
    public class AppException
    {
        public AppException(int statusCode, string message, string details = null)
        {
            StatusCode = statusCode;
            Messsage = message;
            Details = details;

        }

        public int StatusCode {get; set;}
        public string Messsage {get; set;}
        public string Details {get; set;}
    }
}