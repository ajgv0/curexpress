
package com.curexpress.backend.controller;

import com.curexpress.backend.entity.Categoria;
import com.curexpress.backend.service.CategoriaService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    // Registrar categoría
    @PostMapping
    public Categoria registrar(@RequestBody Categoria categoria) {
        return categoriaService.registrarCategoria(categoria);
    }

    // Obtener todas las categorías
    @GetMapping
    public List<Categoria> obtenerTodas() {
        return categoriaService.obtenerCategorias();
    }

    // Obtener categoría por ID
    @GetMapping("/{id}")
    public Categoria obtenerPorId(@PathVariable Long id) {
        return categoriaService.obtenerCategoriaPorId(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
    }

    // Actualizar categoría
    @PutMapping("/{id}")
    public Categoria actualizar(@PathVariable Long id, @RequestBody Categoria categoria) {
        return categoriaService.actualizarCategoria(id, categoria);
    }

    // Eliminar categoría
    @DeleteMapping("/{id}")
    public String eliminar(@PathVariable Long id) {
        categoriaService.eliminarCategoria(id);
        return "Categoría eliminada correctamente";
    }
}
