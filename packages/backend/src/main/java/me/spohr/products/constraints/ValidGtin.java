package me.spohr.products.constraints;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ FIELD })
@Retention(RUNTIME)
@Constraint(validatedBy = GtinValidator.class)
@Documented
public @interface ValidGtin {

    String message() default "Not a valid GTIN code";

    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
