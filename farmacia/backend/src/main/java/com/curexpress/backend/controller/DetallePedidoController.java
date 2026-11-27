
package com.curexpress.backend.controller;

import com.curexpress.backend.entity.DetallePedido;
import com.curexpress.backend.service.DetallePedidoService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detalles-pedido")
@CrossOrigin(origins = "*")
public class DetallePedidoController {

    private final DetallePedidoService detallePedidoService;

    public DetallePedidoController(DetallePedidoService detallePedidoService) {
        this.detallePedidoService = detallePedidoService;
    }

    // Registrar detalle
    @PostMapping
    public DetallePedido registrar(@RequestBody DetallePedido detalle) {
        return detallePedidoService.registrarDetalle(detalle);
    }

    // Obtener todos los detalles
    @GetMapping
    public List<DetallePedido> obtenerTodos() {
        return detallePedidoService.obtenerDetalles();
    }

    // Obtener detalle por ID
    @GetMapping("/{id}")
    public DetallePedido obtenerPorId(@PathVariable Long id) {
        return detallePedidoService.obtenerDetallePorId(id)
                .orElseThrow(() -> new RuntimeException("Detalle no encontrado"));
    }

    // Obtener productos de un pedido
    @GetMapping("/pedido/{pedidoId}")
    public List<DetallePedido> obtenerPorPedido(@PathVariable Long pedidoId) {
        return detallePedidoService.obtenerDetallesPorPedido(pedidoId);
    }

    // Actualizar detalle
    @PutMapping("/{id}")
    public DetallePedido actualizar(@PathVariable Long id, @RequestBody DetallePedido detalle) {
        return detallePedidoService.actualizarDetalle(id, detalle);
    }

    // Eliminar detalle
    @DeleteMapping("/{id}")
    public String eliminar(@PathVariable Long id) {
        detallePedidoService.eliminarDetalle(id);
        return "Detalle eliminado correctamente";
    }
}
