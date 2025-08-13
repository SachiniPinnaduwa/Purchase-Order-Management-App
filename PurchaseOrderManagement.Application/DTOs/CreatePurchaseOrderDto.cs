using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PurchaseOrderManagement.Application.DTOs;

public record CreatePurchaseOrderDto(
    [Required] string PODescription,
    [Required] string SupplierName,
    [Required] DateTime OrderDate,
    [Required][Range(0.01, double.MaxValue)] decimal TotalAmount);