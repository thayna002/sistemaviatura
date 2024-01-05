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

    @RequestMapping("TFrmTipo")
    public String tipo() {
        return "pages/tipo";
    }

    @RequestMapping("TFrmPddEmAnalise")
    public String pedidoAberto() {
        return "pages/pedidoAberto";
    }

    @RequestMapping("TfrmMotorista")
    public String motorista() {
        return "pages/motorista";
    }

    @RequestMapping("TfrmPedidoDoDia")
    public String pedidododia() {
        return "pages/pedidoDodia";
    }


    
}
