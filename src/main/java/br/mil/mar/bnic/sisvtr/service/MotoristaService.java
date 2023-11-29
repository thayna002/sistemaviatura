package br.mil.mar.bnic.sisvtr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.mil.mar.bnic.sisvtr.model.Motoristas;
import br.mil.mar.bnic.sisvtr.repository.MotoristaRepository;

@Service
public class MotoristaService {
    @Autowired
    private MotoristaRepository repository;

    public List<Motoristas> findMotoristas(){
        return repository.findAll();
    }

    public Page<Motoristas> findAll(Pageable pageable) {
       return repository.findAll(pageable);
    }

    public void deleteById(Long id){
        repository.deleteById(id);
    }
}
