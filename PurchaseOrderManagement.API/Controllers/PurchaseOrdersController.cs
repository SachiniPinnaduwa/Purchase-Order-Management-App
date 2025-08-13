using Microsoft.AspNetCore.Mvc;
using PurchaseOrderManagement.Application.DTOs;
using PurchaseOrderManagement.Application.Services;

namespace PurchaseOrderManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PurchaseOrdersController : ControllerBase
{
    private readonly PurchaseOrderService _service;

    public PurchaseOrdersController(PurchaseOrderService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PurchaseOrderItemDto>>> Get()
    {
        var orders = await _service.GetPurchaseOrdersAsync();
        return Ok(orders);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PurchaseOrderItemDto>> Get(int id)
    {
        var order = await _service.GetPurchaseOrderByIdAsync(id);
        return Ok(order);
    }

    [HttpPost]
    public async Task<ActionResult<PurchaseOrderItemDto>> Post([FromBody] CreatePurchaseOrderDto dto)
    {
        var createdOrder = await _service.CreatePurchaseOrderAsync(dto);
        return CreatedAtAction(nameof(Get), new { id = createdOrder.Id }, createdOrder);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] UpdatePurchaseOrderDto dto)
    {
        if (id != dto.Id) return BadRequest();
        await _service.UpdatePurchaseOrderAsync(dto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeletePurchaseOrderAsync(id);
        return NoContent();
    }
}