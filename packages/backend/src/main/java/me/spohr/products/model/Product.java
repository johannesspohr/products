package me.spohr.products.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import me.spohr.products.constraints.ValidGtin;
import org.springframework.validation.annotation.Validated;

import java.util.UUID;

@Entity
@Data
@Validated
@Table(indexes = @Index(columnList = "gtin"))
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    @Size(min = 1, max = 20)
    String title;
    @Size(max = 100)
    String description;
    @ValidGtin
    String gtin;
}
