
package com.curexpress.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventario")
public class Inventario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "producto_id", nullable = false, unique = true)
    private Producto producto;

    @Column(nullable = false)
    private Integer existencias = 0;

    private Integer stockMinimo = 5;

    private LocalDateTime ultimaActualizacion;

    public Inventario() {
    }

    @PreUpdate
    @PrePersist
    public void actualizarFecha() {
        ultimaActualizacion = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Integer getExistencias() {
        return existencias;
    }

    public void setExistencias(Integer existencias) {
        this.existencias = existencias;
    }

    public Integer getStockMinimo() {
        return stockMinimo;
    }

    public void setStockMinimo(Integer stockMinimo) {
        this.stockMinimo = stockMinimo;
    }

    public LocalDateTime getUltimaActualizacion() {
        return ultimaActualizacion;
    }
}
