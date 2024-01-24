package br.mil.mar.bnic.sisvtr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.mil.mar.bnic.sisvtr.model.PedidoViatura;
import br.mil.mar.bnic.sisvtr.model.TipoViatura;
import br.mil.mar.bnic.sisvtr.repository.TipoViaturaRespository;

@Service
public class TipoViaturaService {
        @Autowired
    public TipoViaturaRespository repository; 
    
    public Page<TipoViatura> findAll(Pageable pageable) {
       return repository.findAll(pageable);
    }

    public TipoViatura save(TipoViatura tipo) {
        return repository.save(tipo);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Page<TipoViatura> searchByTipo(String tipo, Pageable pageable) {
        if (tipo==null || tipo.equals("")){
            return repository.findAll(pageable);
        }
       return repository.findByTipo(tipo, pageable);
    }
}
