package br.mil.mar.bnic.sisvtr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.mil.mar.bnic.sisvtr.model.Viaturas;
import br.mil.mar.bnic.sisvtr.repository.ViaturaRepository;

@Service
public class ViaturaService {

   @Autowired 
    private ViaturaRepository repository; 

    public List<Viaturas> findViaturas() {
        return repository.findAll(); 
    }
    
}
