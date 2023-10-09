package br.mil.mar.bnic.sisvtr.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PedidoViaturaResponse {

    private String id; 

    private String postGraduacao;  

    private Integer telefone; 

    private String email ; 

    private String destino; 

    private String observacoes; 

    private Integer passageirosQnt; 

    private String motoristaEsperar; 

    private LocalTime saidaHora; 

    private String nomeGuerra; 

    private String materialTransportar; 

    private LocalDate saidaDate;


  





    
}
