package me.spohr.products.constraints;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GtinValidatorTest {

    private GtinValidator validator = new GtinValidator();

    @Test
    void givenInvalidGtin_whenValidated_thenHasConstraintViolation() {
        assertFalse(validator.isValid("1234567890123", null));
    }

    @Test
    void givenValidGtin_whenValidated_thenHasNoConstraintViolation() {
        assertTrue(validator.isValid("1234567890128", null));
    }

}