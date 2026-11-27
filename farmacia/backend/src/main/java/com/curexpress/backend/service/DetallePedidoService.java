
package com.curexpress.backend.service;

import com.curexpress.backend.entity.DetallePedido;
import com.curexpress.backend.repository.DetallePedidoRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DetallePedidoService {

    private final DetallePedidoRepository detallePedidoRepository;

    public DetallePedidoService(DetallePedidoRepository detallePedidoRepository) {
        this.detallePedidoRepository = detallePedidoRepository;
    }

    // Registrar detalle de pedido
    public DetallePedido registrarDetalle(DetallePedido detalle) {
        return detallePedidoRepository.save(detalle);
    }

    // Obtener todos los detalles
    public List<DetallePedido> obtenerDetalles() {
        return detallePedidoRepository.findAll();
    }

    // Buscar detalle por ID
    public Optional<DetallePedido> obtenerDetallePorId(Long id) {
        return detallePedidoRepository.findById(id);
    }

    // Obtener productos de un pedido
    public List<DetallePedido> obtenerDetallesPorPedido(Long pedidoId) {
        return detallePedidoRepository.findByPedidoId(pedidoId);
    }

    // Actualizar detalle
    public DetallePedido actualizarDetalle(Long id, DetallePedido datos) {

        DetallePedido detalle = detallePedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Detalle de pedido no encontrado"));

        detalle.setCantidad(datos.getCantidad());
        detalle.setPrecioUnitario(datos.getPrecioUnitario());
        detalle.setProducto(datos.getProducto());

        return detallePedidoRepository.save(detalle);
    }

    // Eliminar detalle
    public void eliminarDetalle(Long id) {

        if (!detallePedidoRepository.existsById(id)) {
            throw new RuntimeException("Detalle de pedido no encontrado");
        }

        detallePedidoRepository.deleteById(id);
    }
}
