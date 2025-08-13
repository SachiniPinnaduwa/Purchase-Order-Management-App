using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PurchaseOrderManagement.Application.DTOs;

public record PurchaseOrderItemDto(
    int Id,
    string PONumber,
    string PODescription,
    string SupplierName,
    DateTime OrderDate,
    decimal TotalAmount,
    string Status);