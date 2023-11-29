package br.mil.mar.bnic.sisvtr.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.mil.mar.bnic.sisvtr.model.PedidoViatura;

@Repository
public interface PedidoViaturaRepository extends JpaRepository<PedidoViatura, Long>{

    Page<PedidoViatura> findAll(Pageable pageable);

     Page<PedidoViatura> findByStatus(String status, Pageable pageable);
    
}
