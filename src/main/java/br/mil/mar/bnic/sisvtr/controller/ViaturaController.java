package br.mil.mar.bnic.sisvtr.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.mil.mar.bnic.sisvtr.model.Viaturas;
import br.mil.mar.bnic.sisvtr.service.ViaturaService;


@RestController
@RequestMapping(path="/viatura")
public class ViaturaController {
    @Autowired
    private ViaturaService service; 


    @GetMapping(path="getViatura")
    public ResponseEntity<List<Viaturas>> findViaturas (){
        return ResponseEntity.ok(service.findViaturas()
        ); 

    }


    
}
