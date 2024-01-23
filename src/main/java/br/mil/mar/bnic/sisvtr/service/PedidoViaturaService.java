package br.mil.mar.bnic.sisvtr.service;




import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import br.mil.mar.bnic.sisvtr.model.PedidoViatura;
import br.mil.mar.bnic.sisvtr.repository.PedidoViaturaRepository;

@Service
public class PedidoViaturaService {

    @Autowired
    public PedidoViaturaRepository repository; 
    
    public Page<PedidoViatura> findAll(Pageable pageable) {
       return repository.findAll(pageable);
    }
    public PedidoViatura save(PedidoViatura pedido) {
        return repository.save(pedido); 
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    // retorna om's em lista diaria
    public Page<PedidoViatura> searcByOm(String om, Pageable pageable) {
        LocalDate dataAtual = LocalDate.now();
       return repository.findByOmContainingIgnoreCaseAndSaidaDate(om,dataAtual, pageable);
    }
    public Page<PedidoViatura> searchByOm(String om, Pageable pageable) {
       return repository.findByOm(om, pageable);
    }

   
}

