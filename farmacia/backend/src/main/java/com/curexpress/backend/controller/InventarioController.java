
package com.curexpress.backend.controller;

import com.curexpress.backend.entity.Inventario;
import com.curexpress.backend.service.InventarioService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventario")
@CrossOrigin(origins = "*")
public class InventarioController {

    private final InventarioService inventarioService;

    public InventarioController(InventarioService inventarioService) {
        this.inventarioService = inventarioService;
    }

    // Registrar inventario
    @PostMapping
    public Inventario registrar(@RequestBody Inventario inventario) {
        return inventarioService.registrarInventario(inventario);
    }

    // Obtener todo el inventario
    @GetMapping
    public List<Inventario> obtenerTodos() {
        return inventarioService.obtenerInventario();
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public Inventario obtenerPorId(@PathVariable Long id) {
        return inventarioService.obtenerInventarioPorId(id)
                .orElseThrow(() -> new RuntimeException("Inventario no encontrado"));
    }

    // Buscar inventario de un producto
    @GetMapping("/producto/{productoId}")
    public Inventario obtenerPorProducto(@PathVariable Long productoId) {
        return inventarioService.obtenerPorProducto(productoId)
                .orElseThrow(() -> new RuntimeException("Inventario no encontrado"));
    }

    // Actualizar inventario
    @PutMapping("/{id}")
    public Inventario actualizar(@PathVariable Long id, @RequestBody Inventario inventario) {
        return inventarioService.actualizarInventario(id, inventario);
    }

    // Eliminar inventario
    @DeleteMapping("/{id}")
    public String eliminar(@PathVariable Long id) {
        inventarioService.eliminarInventario(id);
        return "Inventario eliminado correctamente";
    }
}
