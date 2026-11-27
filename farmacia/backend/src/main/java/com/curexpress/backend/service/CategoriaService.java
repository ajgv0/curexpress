
package com.curexpress.backend.service;

import com.curexpress.backend.entity.Categoria;
import com.curexpress.backend.repository.CategoriaRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    // Registrar categoría
    public Categoria registrarCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    // Obtener todas las categorías
    public List<Categoria> obtenerCategorias() {
        return categoriaRepository.findAll();
    }

    // Buscar categoría por ID
    public Optional<Categoria> obtenerCategoriaPorId(Long id) {
        return categoriaRepository.findById(id);
    }

    // Actualizar categoría
    public Categoria actualizarCategoria(Long id, Categoria datos) {

        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        categoria.setNombre(datos.getNombre());
        categoria.setDescripcion(datos.getDescripcion());

        return categoriaRepository.save(categoria);
    }

    // Eliminar categoría
    public void eliminarCategoria(Long id) {

        if (!categoriaRepository.existsById(id)) {
            throw new RuntimeException("Categoría no encontrada");
        }

        categoriaRepository.deleteById(id);
    }
}
