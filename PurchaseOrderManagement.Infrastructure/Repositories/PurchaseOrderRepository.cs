using Microsoft.EntityFrameworkCore;
using PurchaseOrderManagement.Core.Entities;
using PurchaseOrderManagement.Core.Interfaces;
using PurchaseOrderManagement.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PurchaseOrderManagement.Infrastructure.Repositories;

public class PurchaseOrderRepository : IPurchaseOrderRepository
{
    private readonly AppDbContext _dbContext;

    public PurchaseOrderRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PurchaseOrder> GetPurchaseOrderByIdAsync(int id)
    {
        return await _dbContext.PurchaseOrders.FindAsync(id);
    }

    public async Task<IEnumerable<PurchaseOrder>> GetPurchaseOrderListAsync()
    {
        return await _dbContext.PurchaseOrders.ToListAsync();
    }

    public async Task<PurchaseOrder> AddPurchaseOrderAsync(PurchaseOrder purchaseOrder)
    {
        await _dbContext.PurchaseOrders.AddAsync(purchaseOrder);
        await _dbContext.SaveChangesAsync();
        return purchaseOrder;
    }

    public async Task UpdatePurchaseOrderAsync(PurchaseOrder purchaseOrder)
    {
        _dbContext.Entry(purchaseOrder).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeletePurchaseOrderAsync(PurchaseOrder purchaseOrder)
    {
        _dbContext.PurchaseOrders.Remove(purchaseOrder);
        await _dbContext.SaveChangesAsync();
    }
}
