package br.mil.mar.bnic.sisvtr.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.mil.mar.bnic.sisvtr.dto.QtdPedidoViaturaDTO;
import br.mil.mar.bnic.sisvtr.model.PedidoViatura;

@Repository
public interface PedidoViaturaRepository extends JpaRepository<PedidoViatura, Long> {

    Page<PedidoViatura> findAll(Pageable pageable);

    Page<PedidoViatura> findByStatus(String status, Pageable pageable);
   
    @Query(value = "SELECT new br.mil.mar.bnic.sisvtr.dto.QtdPedidoViaturaDTO(v.status, COUNT(v)) FROM PedidoViatura v where v.centralizado= :centralizado and (v.status='Aprovado' or v.status='Cancelado') GROUP BY v.status")
    List<QtdPedidoViaturaDTO> pedidosPorStatus(String centralizado);

}
