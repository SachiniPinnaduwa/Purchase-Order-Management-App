using PurchaseOrderManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PurchaseOrderManagement.Core.Interfaces;

public interface IPurchaseOrderRepository
{
    Task<PurchaseOrder> GetPurchaseOrderByIdAsync(int id);
    Task<IEnumerable<PurchaseOrder>> GetPurchaseOrderListAsync();
    Task<PurchaseOrder> AddPurchaseOrderAsync(PurchaseOrder purchaseOrder);
    Task UpdatePurchaseOrderAsync(PurchaseOrder purchaseOrder);
    Task DeletePurchaseOrderAsync(PurchaseOrder purchaseOrder);
}
