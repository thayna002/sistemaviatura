package br.mil.mar.bnic.sisvtr.model;

import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="form_viaturas_nova", schema = "bnicsc")
public class Pedidos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name = "post_graduacao")
    private String postGraduacao;  

    @Column(name= "nome_completo")
    private String nomeCompleto;

    @Column(name = "telefone")
    private String telefone; 

    @Column(name = "email")
    private String email ; 

    @Column(name = "destino")
    private String destino; 

    @Column(name = "observacoes")
    private String observacoes; 

    @Column(name = "passageiros_qnt")
    private String passageirosQnt; 

    @Column(name = "motorista_esperar")
    private String motoristaEsperar; 

    @Column(name = "saida_hora")
    private LocalTime saidaHora; 

    @Column(name = "nome_de_guerra")
    private String nomeGuerra; 

    @Column(name = "material_transportar")
    private String materialTransportar; 

    @Column(name = "status")
    private String status; 

    @Column(name = "orientacoes")
    private String orientacoes; 

    @Column(name = "autor")
    private String autor; 

    @Column(name = "motorista")
    private Integer motorista; 

    @Column(name = "modelo")
    private Integer modelo; 

    @Column(name = "placa")
    private String placa; 

    @Column(name = "centralizado")
    private String centralizado; 

    @Column(name = "retorno_hora")
    private LocalTime retornoHora; 

    @Column(name = "tipo_material")
    private String tipoMaterial; 

    @Column(name = "local_de_partida")
    private String localPartida; 

    @Column(name = "retorno_date")
    private LocalTime retornoDate; 

    @Column(name = "saida_date")
    private LocalTime saidaDate; 

    @Column(name = "hodometro_saida")
    private Integer hodometroSaida; 
    
    @Column(name = "hodometro_regresso")
    private Integer hodometroRegresso; 

    @Column(name = "data_inclusao")
    private LocalTime dataInclusao; 

    @Column(name = "om")
    private String om; 

    @Column(name = "tipo")
    private String tipo; 


    @ManyToOne
    @JoinColumn(name = "motorista", referencedColumnName = "id", insertable = false, updatable = false)
    private Motoristas motoristas;

    @OneToMany
    @JoinColumn(name = "modelo", referencedColumnName = "id", insertable = false, updatable = false)
    private Viaturas viaturas;



}
