package com.devsuperior.dsvendas.dto;

import java.io.Serializable;
import com.devsuperior.dsvendas.entities.Seller;


public class SellerDTO implements Serializable { //não tem conexão com o BD
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	
	public SellerDTO() {}

	public SellerDTO(Long id, String name) {
		this.id = id;
		this.name = name;
	}
	
	public SellerDTO(Seller entity) { //possa copiar facilmente os dados de uma entidade para um DTO
		id = entity.getId(); //não precisa do this pq tem nomes diferentes
		name = entity.getName();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}	
}