

using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
       
        [HttpGet] //api/activities  
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediatr.Send(new List.Query());
        }
 
 
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id) 
        {
            return await Mediatr.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult>CreateActivity(Activity activity){
            return Ok(await Mediatr.Send(new Create.Command{Activity = activity}));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult>EditActivity(Guid id, Activity activity){
            activity.Id = id;

            return Ok(await Mediatr.Send(new Edit.Command{Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(Guid id){
            return Ok(await Mediatr.Send(new Delete.Command{Id = id}));
        }

    }
}