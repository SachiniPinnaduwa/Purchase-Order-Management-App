using AutoMapper;
using PurchaseOrderManagement.Application.DTOs;
using PurchaseOrderManagement.Core.Entities;
using PurchaseOrderManagement.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PurchaseOrderManagement.Application.Services;

public class PurchaseOrderService
{
    private readonly IPurchaseOrderRepository _repository;
    private readonly IMapper _mapper;

    public PurchaseOrderService(IPurchaseOrderRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<PurchaseOrderItemDto>> GetPurchaseOrdersAsync()
    {
        var orders = await _repository.GetPurchaseOrderListAsync();
        return _mapper.Map<IEnumerable<PurchaseOrderItemDto>>(orders);
    }

    public async Task<PurchaseOrderItemDto> GetPurchaseOrderByIdAsync(int id)
    {
        var order = await _repository.GetPurchaseOrderByIdAsync(id);
        return _mapper.Map<PurchaseOrderItemDto>(order);
    }

    public async Task<PurchaseOrderItemDto> CreatePurchaseOrderAsync(CreatePurchaseOrderDto dto)
    {
        var order = _mapper.Map<PurchaseOrder>(dto); // Convert DTO to Entity
        var createdOrder = await _repository.AddPurchaseOrderAsync(order); // Save to DB
        return _mapper.Map<PurchaseOrderItemDto>(createdOrder); // Convert back to DTO
    }

    public async Task UpdatePurchaseOrderAsync(UpdatePurchaseOrderDto dto)
    {
        var existingOrder = await _repository.GetPurchaseOrderByIdAsync(dto.Id);
        _mapper.Map(dto, existingOrder);
        await _repository.UpdatePurchaseOrderAsync(existingOrder);
    }

    public async Task DeletePurchaseOrderAsync(int id)
    {
        var order = await _repository.GetPurchaseOrderByIdAsync(id);
        await _repository.DeletePurchaseOrderAsync(order);
    }
}
