package br.mil.mar.bnic.sisvtr.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "form_viaturas_motoristas", schema = "bnicsc")
public class Motoristas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id; 

    @Column(name = "nip")
    private Integer nip; 

    @Column(name = "nome_completo_motorista")
    private String nomeCompletoMotorista; 

    @Column(name = "nome_guerra_motorista")
    private String nomeGuerraMotorista; 

    @Column(name = "graduacao_motorista")
    private String graduacaoMotorista; 

    @Column(name = "cnh_classe")
    private String cnhClasse; 


}
