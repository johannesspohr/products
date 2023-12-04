package me.spohr.products.repositories;

import me.spohr.products.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Validated
@RepositoryRestResource(collectionResourceRel = "products", path = "products")
public interface ProductsRepository extends JpaRepository<Product, String> {
    Product findByGtin(@Param("gtin") String gtin);
}