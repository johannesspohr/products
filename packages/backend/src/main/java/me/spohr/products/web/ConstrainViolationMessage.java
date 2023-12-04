package me.spohr.products.web;

public record ConstrainViolationMessage(
        String field,
        String message
) {
}
