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
@Table(name = "viaturas_tipos", schema = "bnicsc")
public class TipoViatura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "vl_desp_fixa_h")
    private Float vlDespFixaH; 

    @Column(name = "vl_desp_mon_km")
    private Float vlDespMonKm; 

    
    
}
