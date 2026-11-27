
package com.curexpress.backend.service;

import com.curexpress.backend.entity.Pedido;
import com.curexpress.backend.entity.EstadoPedido;
import com.curexpress.backend.repository.PedidoRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;

    public PedidoService(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    // Registrar pedido
    public Pedido registrarPedido(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    // Obtener todos los pedidos
    public List<Pedido> obtenerPedidos() {
        return pedidoRepository.findAll();
    }

    // Buscar pedido por ID
    public Optional<Pedido> obtenerPedidoPorId(Long id) {
        return pedidoRepository.findById(id);
    }

    // Obtener pedidos de un usuario
    public List<Pedido> obtenerPedidosPorUsuario(Long usuarioId) {
        return pedidoRepository.findByUsuarioId(usuarioId);
    }

    // Actualizar estado del pedido
    public Pedido actualizarEstado(Long id, EstadoPedido nuevoEstado) {

        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

        pedido.setEstado(nuevoEstado);

        return pedidoRepository.save(pedido);
    }

    // Eliminar pedido
    public void eliminarPedido(Long id) {

        if (!pedidoRepository.existsById(id)) {
            throw new RuntimeException("Pedido no encontrado");
        }

        pedidoRepository.deleteById(id);
    }
}
