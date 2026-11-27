
package com.curexpress.backend.controller;

import com.curexpress.backend.entity.Pedido;
import com.curexpress.backend.entity.EstadoPedido;
import com.curexpress.backend.service.PedidoService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    // Registrar pedido
    @PostMapping
    public Pedido registrar(@RequestBody Pedido pedido) {
        return pedidoService.registrarPedido(pedido);
    }

    // Obtener todos los pedidos
    @GetMapping
    public List<Pedido> obtenerTodos() {
        return pedidoService.obtenerPedidos();
    }

    // Obtener pedido por ID
    @GetMapping("/{id}")
    public Pedido obtenerPorId(@PathVariable Long id) {
        return pedidoService.obtenerPedidoPorId(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
    }

    // Obtener pedidos de un usuario
    @GetMapping("/usuario/{usuarioId}")
    public List<Pedido> obtenerPorUsuario(@PathVariable Long usuarioId) {
        return pedidoService.obtenerPedidosPorUsuario(usuarioId);
    }

    // Actualizar estado
    @PutMapping("/{id}/estado")
    public Pedido actualizarEstado(
            @PathVariable Long id,
            @RequestBody EstadoPedido nuevoEstado) {

        return pedidoService.actualizarEstado(id, nuevoEstado);
    }

    // Eliminar pedido
    @DeleteMapping("/{id}")
    public String eliminar(@PathVariable Long id) {
        pedidoService.eliminarPedido(id);
        return "Pedido eliminado correctamente";
    }
}
