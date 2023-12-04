package me.spohr.products.web;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.springframework.core.NestedExceptionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class HttpExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ResponseEntity<?> handleDataIntegrityViolation(ConstraintViolationException ex, HttpServletRequest req) {

        String causeMessage = NestedExceptionUtils.getMostSpecificCause(ex).getMessage(); // determine the root cause message

        String reqPath = req.getServletPath();
        HttpStatus status = HttpStatus.BAD_REQUEST;

        return new ResponseEntity<>(
                ex.getConstraintViolations()
                        .stream()
                        .map(violation ->
                                new ConstrainViolationMessage(
                                        violation.getPropertyPath().toString(),
                                        violation.getMessage()))
                , status);
    }

    // other handlers
}