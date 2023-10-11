package br.mil.mar.bnic.sisvtr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
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

import br.mil.mar.bnic.sisvtr.model.TipoViatura;
import br.mil.mar.bnic.sisvtr.service.TipoViaturaService;

@RestController
@RequestMapping(path="/tipoViatura")
public class TipoController {

    @Autowired
    private TipoViaturaService service; 

    @GetMapping
    public ResponseEntity<Page<TipoViatura>> findAll(Pageable pageable){
            return ResponseEntity.ok(service.findAll(pageable));
    }

    @PostMapping
    public ResponseEntity<TipoViatura> save(@RequestBody TipoViatura tipo){
        return ResponseEntity.ok(service.save(tipo)); 
    }

    @DeleteMapping(path = "{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<TipoViatura> put(@RequestBody TipoViatura tipo){
        return ResponseEntity.ok(service.save(tipo));
    }


    
}
