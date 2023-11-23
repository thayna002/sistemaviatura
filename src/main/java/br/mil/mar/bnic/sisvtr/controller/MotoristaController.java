package br.mil.mar.bnic.sisvtr.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.mil.mar.bnic.sisvtr.model.Motoristas;
import br.mil.mar.bnic.sisvtr.service.MotoristaService;

@RestController
@RequestMapping(path = "/motoristas")
public class MotoristaController {
    @Autowired
    private MotoristaService service; 

    @GetMapping(path = "getMotoristas")
    public ResponseEntity<List<Motoristas>> findMotoristas (){
        return ResponseEntity.ok(service.findMotoristas()
        );
    }

     @GetMapping("todosMotoristas")
    public ResponseEntity<Page<Motoristas>> findAll(Pageable pageable){
        return ResponseEntity.ok(service.findAll(pageable));
    }
}
