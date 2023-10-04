using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
[ApiController]
[Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediatr;
        
        protected IMediator Mediatr => _mediatr ??=
        HttpContext.RequestServices.GetService<IMediator>();
        
    }
}