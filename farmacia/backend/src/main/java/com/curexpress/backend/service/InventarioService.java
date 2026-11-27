
package com.curexpress.backend.service;

import com.curexpress.backend.entity.Inventario;
import com.curexpress.backend.repository.InventarioRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventarioService {

    private final InventarioRepository inventarioRepository;

    public InventarioService(InventarioRepository inventarioRepository) {
        this.inventarioRepository = inventarioRepository;
    }

    // Registrar inventario
    public Inventario registrarInventario(Inventario inventario) {
        return inventarioRepository.save(inventario);
    }

    // Obtener todo el inventario
    public List<Inventario> obtenerInventario() {
        return inventarioRepository.findAll();
    }

    // Buscar inventario por ID
    public Optional<Inventario> obtenerInventarioPorId(Long id) {
        return inventarioRepository.findById(id);
    }

    // Buscar inventario por producto
    public Optional<Inventario> obtenerPorProducto(Long productoId) {
        return inventarioRepository.findByProductoId(productoId);
    }

    // Actualizar inventario
    public Inventario actualizarInventario(Long id, Inventario datos) {

        Inventario inventario = inventarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventario no encontrado"));

        inventario.setExistencias(datos.getExistencias());
        inventario.setStockMinimo(datos.getStockMinimo());

        return inventarioRepository.save(inventario);
    }

    // Eliminar registro de inventario
    public void eliminarInventario(Long id) {

        if (!inventarioRepository.existsById(id)) {
            throw new RuntimeException("Inventario no encontrado");
        }

        inventarioRepository.deleteById(id);
    }
}
