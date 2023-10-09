package br.mil.mar.bnic.sisvtr.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class IndexController {

    @RequestMapping("TFrmPedido")
    public String pedido() {
        return "pages/pedido";
    }

    
}
