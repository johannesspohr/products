package me.spohr.products.repositories;

import me.spohr.products.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Validated
@RepositoryRestResource(collectionResourceRel = "products", path = "products")
@CrossOrigin(origins = {"https://products.spohr.me", "http://localhost:5173"}, maxAge = 3600)
public interface ProductsRepository extends JpaRepository<Product, String> {
    Product findFirstByGtin(@Param("gtin") String gtin);
}