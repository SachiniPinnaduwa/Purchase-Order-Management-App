
using Microsoft.EntityFrameworkCore;
using PurchaseOrderManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace PurchaseOrderManagement.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<PurchaseOrder> PurchaseOrders { get; set; } // Database table

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PurchaseOrder>()
            .Property(p => p.TotalAmount)
            .HasPrecision(18, 2); // Configures decimal precision
    }
}
