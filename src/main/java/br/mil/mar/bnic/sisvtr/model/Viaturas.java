package br.mil.mar.bnic.sisvtr.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "form_viaturas_veiculos_nova", schema = "bnicsc")
public class Viaturas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id; 

    @Column(name = "modelo_viatura")
    private String modeloViatura; 

    @Column(name = "marca_viatura")
    private String marcaViatura; 

    @Column(name = "cor_viatura")
    private String corViatura; 

    @Column(name = "placa_viatura")
    private String placaViatura; 

    @Column(name = "lugares_viatura")
    private String lugaresViatura; 

    @Column(name = "transporta_material_viatura")
    private String transportaMaterialViatura; 

    @Column(name = "km_viatura")
    private String kmViatura; 

    @Column(name = "viatura_ident")
    private String viaturaIdent; 

    @Column(name = "tipo_id")
    private Long tipoId;
    
    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "tipo_id", referencedColumnName = "id", insertable = false, updatable = false)
    private TipoViatura tiposViaturas;

    
}
