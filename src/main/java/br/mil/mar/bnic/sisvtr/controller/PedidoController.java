package br.mil.mar.bnic.sisvtr.controller;



import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import org.apache.tomcat.jni.Local;
import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.mil.mar.bnic.sisvtr.model.PedidoViatura;
import br.mil.mar.bnic.sisvtr.repository.PedidoViaturaRepository;
import br.mil.mar.bnic.sisvtr.service.PedidoViaturaService;

@RestController
@RequestMapping(path="/pedidoViatura")
public class PedidoController {

    @Autowired
    private PedidoViaturaService service; 

    @Autowired
    private PedidoViaturaRepository pedidoViaturaRepository;
    
    @GetMapping("todosPedidos")
    public ResponseEntity<Page<PedidoViatura>> findAll(Pageable pageable){
        return ResponseEntity.ok(service.findAll(pageable));
    }
    // filtro search
     @GetMapping(path = "search/{om}")
    public ResponseEntity<Page<PedidoViatura>> findAll(@PathVariable String om, Pageable pageable) {        Page<PedidoViatura> pedidos = service.searchByOm(om, pageable);
        return ResponseEntity.ok(pedidos);
    }

    @GetMapping("pedidoAberto")
    public Page<PedidoViatura> getPedidosEmAnalise(Pageable pageable) {
        return pedidoViaturaRepository.findByStatus("Em Análise", pageable);
    }


    @PostMapping
    public ResponseEntity<PedidoViatura> save(@RequestBody PedidoViatura pedido){
        return ResponseEntity.ok(service.save(pedido)); 
    }

    @PutMapping
    public ResponseEntity<PedidoViatura> put(@RequestBody PedidoViatura pedido){
        return ResponseEntity.ok(service.save(pedido));
    }

    @DeleteMapping(path = "{id}")
    public ResponseEntity<PedidoViatura> deleteById(@PathVariable Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



    // retorna viagens no dia atual
    @GetMapping(path = "pedidosdoDia")
    public ResponseEntity<Page<PedidoViatura>> listaPedidoDiaria(Pageable pageable) {
        LocalDate dataAtual = LocalDate.now();
        Page<PedidoViatura> pedidos = pedidoViaturaRepository.findBySaidaDate(dataAtual, pageable);
        return ResponseEntity.ok(pedidos);
    }
// filtro search para lista Pedido Diaria
    @GetMapping(path = "search/om/{om}")
    public ResponseEntity<Page<PedidoViatura>> listaPedidoDiaria(@PathVariable String om, Pageable pageable) {        Page<PedidoViatura> pedidos = service.searcByOm(om, pageable);
        return ResponseEntity.ok(pedidos);
    }
   


    

    // filtra por dia de viagem 
    // @GetMapping(path = "pedidoDtViagem")
    // public ResponseEntity<Page<PedidoViatura>> listaPedidoDiaria(@RequestParam("saidaDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate saidaDate,
    //         Pageable pageable) {
    //     Page<PedidoViatura> pedidos = pedidoViaturaRepository.findBySaidaDate(saidaDate, pageable);
    //     return ResponseEntity.ok(pedidos);
    // }


  
    

    //  @GetMapping("/clienteBnic")
    // public ClienteDTO cliente() {
    //     RestTemplate restTemplate = new RestTemplate();
        
    //     try {
    //         ResponseEntity<ClienteDTO> resp = restTemplate.getForEntity("http://viacep.com.br/ws/21020170/json", ClienteDTO.class);
    //         return resp.getBody();
    //     } catch (Exception e) {
    //         // Trate a exceção de forma apropriada (por exemplo, registre-a ou retorne uma mensagem de erro)
    //         e.printStackTrace();
    //         return null; // Ou retorne um ClienteDTO vazio ou com valores padrão, dependendo do seu caso.
    //     }
    // }

    
}
