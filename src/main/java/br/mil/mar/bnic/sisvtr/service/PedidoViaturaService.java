package br.mil.mar.bnic.sisvtr.service;

import java.util.ArrayList;
import java.util.List;



import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.mil.mar.bnic.sisvtr.dto.InfoPedidoViaturaDTO;
import br.mil.mar.bnic.sisvtr.dto.QtdPedidoViaturaDTO;

import br.mil.mar.bnic.sisvtr.model.PedidoViatura;
import br.mil.mar.bnic.sisvtr.repository.PedidoViaturaRepository;

@Service
public class PedidoViaturaService {

    @Autowired
    public PedidoViaturaRepository repository;

    public Page<PedidoViatura> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }
    
    // filtro search
     public Page<PedidoViatura> findByOm(String om, Pageable pageable) {
       return repository.findByOm(om, pageable);
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
          if (om==null || om.equals("")){
            return repository.findByOmContainingIgnoreCaseAndSaidaDate(om,dataAtual,pageable);
        }
       return repository.findByOmContainingIgnoreCaseAndSaidaDate(om,dataAtual, pageable);
    }

    //retorna om's em lista
    public Page<PedidoViatura> searchByOm(String om, Pageable pageable) {
        if (om==null || om.equals("")){
            return repository.findAll(pageable);
        }
        return repository.findByOm(om, pageable);
    }

   



    public List<InfoPedidoViaturaDTO> pedidosPorStatus() {

        List<InfoPedidoViaturaDTO> listaDTO = new ArrayList<>();
        listaDTO.add(new InfoPedidoViaturaDTO("Centralizada", repository.pedidosPorStatus("Centralizada")));
        listaDTO.add(new InfoPedidoViaturaDTO("Não Centralizada", repository.pedidosPorStatus("Não Centralizada")));
        return listaDTO;
    }
}
