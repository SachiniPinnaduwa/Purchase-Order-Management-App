using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PurchaseOrderManagement.Application.DTOs;

public record UpdatePurchaseOrderDto(
    [Required] int Id,
    string PODescription,
    string SupplierName,
    DateTime OrderDate,
    [Range(0.01, double.MaxValue)] decimal TotalAmount,
    string Status);
