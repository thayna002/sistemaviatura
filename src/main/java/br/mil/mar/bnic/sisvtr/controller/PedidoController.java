package br.mil.mar.bnic.sisvtr.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;




import br.mil.mar.bnic.sisvtr.model.PedidoViatura;
import br.mil.mar.bnic.sisvtr.service.PedidoViaturaService;

@RestController
@RequestMapping(path="/pedidoViatura")
public class PedidoController {

    @Autowired
    private PedidoViaturaService service; 
    
    @GetMapping("todosPedidos")
    public ResponseEntity<Page<PedidoViatura>> findAll(Pageable pageable){
        return ResponseEntity.ok(service.findAll(pageable));
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
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    
}
