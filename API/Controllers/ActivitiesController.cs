

using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
       
        [HttpGet] //api/activities  
        public async Task<IActionResult> GetActivities()
        {
            return HandleResult(await Mediatr.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id) 
        {
            return HandleResult(await Mediatr.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult>CreateActivity(Activity activity){
            return HandleResult(await Mediatr.Send(new Create.Command{Activity = activity}));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult>EditActivity(Guid id, Activity activity){
            activity.Id = id; 

            return HandleResult(await Mediatr.Send(new Edit.Command{Activity = activity}));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id){
            return HandleResult(await Mediatr.Send(new Delete.Command{Id = id}));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediatr.Send(new UpdateAttendance.Command { Id = id}));
        }

    }
}