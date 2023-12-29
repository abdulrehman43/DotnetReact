using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController: BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] Add.Command command)
        {
            return HandleResult(await Mediatr.Send(command));
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(string id)
        {
            return HandleResult(await Mediatr.Send(new Delete.Command { Id = id }));
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> setMain(string id)
        {
            return HandleResult(await Mediatr.Send(new SetMain.Command { Id = id }));
        }

    }
}
