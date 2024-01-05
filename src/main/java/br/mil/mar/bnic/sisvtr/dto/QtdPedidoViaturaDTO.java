package br.mil.mar.bnic.sisvtr.dto;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QtdPedidoViaturaDTO {
    
    private String status; 
    private long quantidade;
    
}
