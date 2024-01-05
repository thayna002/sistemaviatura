package br.mil.mar.bnic.sisvtr.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.mil.mar.bnic.sisvtr.model.Viaturas;

@Repository
public interface ViaturaRepository extends JpaRepository<Viaturas, Long> {
    List<Viaturas> findAll(); 

    
    
}