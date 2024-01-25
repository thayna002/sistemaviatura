package br.mil.mar.bnic.sisvtr.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.mil.mar.bnic.sisvtr.model.PedidoViatura;
import br.mil.mar.bnic.sisvtr.model.TipoViatura;

@Repository
public interface TipoViaturaRespository extends JpaRepository<TipoViatura, Long>{

    Page<TipoViatura> findAll(Pageable pageable);
    Page<TipoViatura> findByTipo(String tipo, Pageable pageable);

}